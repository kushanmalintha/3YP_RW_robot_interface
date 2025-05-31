class WebSocketManager {
  constructor() {
    this.ws = null;
    this.messageQueue = [];
    this.isConnected = false;
  }

  connect(url, robotId, onMessageCallback) {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      console.log(`Connecting to WebSocket: ${url}`);
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        
        // Register the robot ID
        const registerMessage = {
          type: 'register',
          robotId,
        };
        
        this.ws.send(JSON.stringify(registerMessage));
        console.log(`Registered robot: ${robotId}`);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocket message received:', data);
          
          // Store the data locally for Selenium to access
          this.storeDataLocally(data);
          
          // Add to message queue for processing
          this.messageQueue.push({
            timestamp: Date.now(),
            data: data
          });
          
          // Handle specific message types
          if (data.type === 'auth') {
            console.log('Authentication message received from MQTT');
            localStorage.setItem('robotAuthToken', data.idToken);
            
            // Create a flag for Selenium to detect MQTT message
            localStorage.setItem('mqttMessageReceived', 'true');
            localStorage.setItem('mqttMessageTimestamp', Date.now().toString());
            
            // Dispatch custom event for any listeners
            window.dispatchEvent(new CustomEvent('mqttAuthReceived', { 
              detail: data 
            }));
          }
          
          // Call the provided callback
          if (onMessageCallback) {
            onMessageCallback(data);
          }
          
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected', event.code, event.reason);
        this.isConnected = false;
        
        // Attempt to reconnect after a delay
        setTimeout(() => {
          console.log('Attempting to reconnect...');
          this.connect(url, robotId, onMessageCallback);
        }, 5000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };
    }
  }

  storeDataLocally(data) {
    try {
      // Store latest WebSocket data
      localStorage.setItem('webSocketData', JSON.stringify(data));
      
      // Store all messages in a history array
      const history = this.getMessageHistory();
      history.push({
        timestamp: Date.now(),
        data: data
      });
      
      // Keep only last 50 messages
      if (history.length > 50) {
        history.shift();
      }
      
      localStorage.setItem('webSocketHistory', JSON.stringify(history));
      console.log('WebSocket data stored locally');
    } catch (error) {
      console.error('Error storing WebSocket data locally:', error);
    }
  }

  getDataLocally() {
    try {
      const data = localStorage.getItem('webSocketData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving WebSocket data locally:', error);
      return null;
    }
  }

  getMessageHistory() {
    try {
      const history = localStorage.getItem('webSocketHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error retrieving WebSocket history:', error);
      return [];
    }
  }

  // Method to check if MQTT message was received
  hasMqttMessage() {
    return localStorage.getItem('mqttMessageReceived') === 'true';
  }

  // Method to get the latest MQTT message
  getLatestMqttMessage() {
    const history = this.getMessageHistory();
    return history
      .filter(msg => msg.data.type === 'auth')
      .sort((a, b) => b.timestamp - a.timestamp)[0] || null;
  }

  // Clear MQTT message flag
  clearMqttFlag() {
    localStorage.removeItem('mqttMessageReceived');
    localStorage.removeItem('mqttMessageTimestamp');
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not connected. Current state:', 
                   this.ws ? this.ws.readyState : 'No WebSocket');
    }
  }

  getConnectionStatus() {
    if (!this.ws) return 'No WebSocket';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'Connecting';
      case WebSocket.OPEN: return 'Open';
      case WebSocket.CLOSING: return 'Closing';
      case WebSocket.CLOSED: return 'Closed';
      default: return 'Unknown';
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
      console.log('WebSocket disconnected manually');
    }
  }

  // Method to wait for MQTT message (for debugging)
  waitForMqttMessage(timeout = 30000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const checkForMessage = () => {
        if (this.hasMqttMessage()) {
          resolve(this.getLatestMqttMessage());
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for MQTT message'));
          return;
        }
        
        setTimeout(checkForMessage, 1000);
      };
      
      checkForMessage();
    });
  }
}

// Make WebSocketManager globally accessible for Selenium
const webSocketManager = new WebSocketManager();
window.webSocketManager = webSocketManager;

export default webSocketManager;