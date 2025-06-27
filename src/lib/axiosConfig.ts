import axios, { AxiosError } from 'axios'
import { authUtils } from './authUtils'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api"
})

// Function to handle logout - will be set by the auth context
let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
    logoutHandler = handler;
};

//CREATE A REQUEST INTERCEPTOR
api.interceptors.request.use(async config => {
    const token = authUtils.getToken()
    
    // Check if token is expired and try to refresh
    if (token && authUtils.isTokenExpired()) {
        const refreshed = await authUtils.refreshToken();
        if (!refreshed) {
            // If refresh failed, trigger logout
            if (logoutHandler) {
                logoutHandler();
            }
            return Promise.reject(new Error('Token refresh failed'));
        }
    }
    
    const currentToken = authUtils.getToken();
    if(currentToken){
        config.headers.Authorization = `Bearer ${currentToken}`
    }
    return config;
}, (error)=> {
    return Promise.reject(error)
})

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        // Check if the error response matches the specific format
        const errorData = error.response?.data as any;

        if (
            errorData?.detail?.error?.status === 401 &&
            errorData?.detail?.error?.message === "The access token expired"
        ) {
            // Try to refresh token first
            const refreshed = await authUtils.refreshToken();
            
            if (!refreshed) {
                // If refresh failed, perform logout
                if (logoutHandler) {
                    logoutHandler();
                } else {
                    // Fallback logout if no handler is set
                    authUtils.clearAuth();
                    window.location.href = '/login';
                }
            } else {
                // If refresh succeeded, retry the original request
                const originalRequest = error.config;
                if (originalRequest) {
                    const token = authUtils.getToken();
                    if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                }
            }
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api