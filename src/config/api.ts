import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure to set this in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors can be added here for request/response handling
apiClient.interceptors.request.use(
  (config) => {
    // Add any custom logic before sending the request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response.data;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default apiClient;