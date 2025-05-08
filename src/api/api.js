import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // adjust based on backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
