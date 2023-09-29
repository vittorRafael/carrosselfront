import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: JSON.parse(localStorage.getItem('token'))
      ? 'Bearer ' + JSON.parse(localStorage.getItem('token')).replace('"', '')
      : '',
  },
});

export default api;
