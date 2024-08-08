// src/services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deploying-14hj.onrender.com', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
    // Add authorization headers if needed
  },
});

export default instance;














