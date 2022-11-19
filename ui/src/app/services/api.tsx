import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030/',
});

const token = localStorage.getItem('token')

if (token) {
  api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
}

export default api;