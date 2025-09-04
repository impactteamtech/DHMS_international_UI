import axios from 'axios';

// Create a reusable instance
const api = axios.create({
  baseURL: 'https://dhms-backend.onrender.com',
  withCredentials: true, // this sends cookies back
});



// // Handle 401 errors 
// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('username')
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default api;


