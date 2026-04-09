import { SOCKET_URL } from '../env';
import axios from 'axios';

const api = axios.create({
  baseURL: SOCKET_URL, // NestJS backend URL
  withCredentials: false,  // Include cookies (if required)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;