import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://3.27.157.127:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
