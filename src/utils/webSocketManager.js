class WebSocketManager {
  constructor() {
    this.ws = null;
  }

  connect(url, robotId, onMessageCallback) {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        // Register the robot ID
        this.ws.send(
          JSON.stringify({
            type: 'register',
            robotId,
          })
        );
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        if (onMessageCallback) {
          onMessageCallback(data);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;
