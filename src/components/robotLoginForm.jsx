import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import webSocketManager from '../utils/webSocketManager';
import { WS_BASE_URL } from '../config';

const RobotLoginForm = () => {
  const [robotId, setRobotId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [websocketStatus, setWebsocketStatus] = useState('Disconnected');
  const [mqttMessageReceived, setMqttMessageReceived] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for MQTT auth messages
    const handleMqttAuth = (event) => {
      console.log('MQTT Auth event received:', event.detail);
      setMqttMessageReceived(true);
      
      // You can add additional handling here
      // For example, automatically navigate or show success message
    };

    window.addEventListener('mqttAuthReceived', handleMqttAuth);

    // Cleanup listener
    return () => {
      window.removeEventListener('mqttAuthReceived', handleMqttAuth);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post('/api/robot/login', { robotId, password });
      const data = res.data;
      console.log('Login response data:', data);
      
      if (res.status === 200) {
        localStorage.setItem('restaurantId', data.restaurantId);
        localStorage.setItem('robotId', data.robotId); // Store robot ID for reference
        
        // Clear any previous MQTT flags
        webSocketManager.clearMqttFlag();
        
        // Setup WebSocket connection after successful login
        webSocketManager.connect(WS_BASE_URL, data.robotId, (message) => {
          console.log('WebSocket message in login form:', message);
          
          // Update WebSocket status
          setWebsocketStatus(webSocketManager.getConnectionStatus());
          
          if (message.type === 'auth') {
            console.log('MQTT auth message received in login form');
            localStorage.setItem('robotAuthToken', message.idToken);
            setMqttMessageReceived(true);
            
            // Optional: Auto-navigate after receiving MQTT message
            // setTimeout(() => navigate('/restaurant-menu'), 2000);
          }
        });

        // Update WebSocket status periodically
        const statusInterval = setInterval(() => {
          setWebsocketStatus(webSocketManager.getConnectionStatus());
          
          // Check if MQTT message was received
          if (webSocketManager.hasMqttMessage() && !mqttMessageReceived) {
            setMqttMessageReceived(true);
          }
        }, 1000);

        // Navigate to menu (you might want to do this after MQTT message)
        navigate('/restaurant-menu');
        
        // Clear interval after navigation
        setTimeout(() => clearInterval(statusInterval), 10000);
        
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get WebSocket data for debugging
  const getWebSocketData = () => {
    const data = webSocketManager.getDataLocally();
    const history = webSocketManager.getMessageHistory();
    console.log('Current WebSocket data:', data);
    console.log('WebSocket message history:', history);
    return { current: data, history };
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Robot Login</h2>
        <input
          type="text"
          placeholder="Robot ID"
          value={robotId}
          onChange={(e) => setRobotId(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        {/* Status indicators for debugging */}
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div>WebSocket Status: <span style={{ fontWeight: 'bold' }}>{websocketStatus}</span></div>
          {mqttMessageReceived && (
            <div style={{ color: 'green' }}>
              ✓ MQTT Authentication Message Received
            </div>
          )}
        </div>
        
        {/* Debug button - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <button 
            type="button" 
            onClick={getWebSocketData}
            style={{ marginTop: '10px', fontSize: '10px' }}
          >
            Debug: Log WebSocket Data
          </button>
        )}
      </form>
    </div>
  );
};

export default RobotLoginForm;