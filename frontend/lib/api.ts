import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// Create Axios Instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches backend port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor to add JWT Token
api.interceptors.request.use(
    (config) => {
        // We need to access the store state directly (getState) because hooks (useAuthStore) work in components
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (Optional: Handle 401 globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Optional: Redirect to login or clear store
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default api;
