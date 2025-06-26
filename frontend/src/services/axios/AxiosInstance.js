"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosInstence = exports.baseURL = void 0;
exports.useData = useData;
const axios_1 = __importDefault(require("axios"));
const swr_1 = __importDefault(require("swr"));
const localstorage_1 = require("../../utils/functions/localstorage");
exports.baseURL = 'http://localhost:5000';
// Create an Axios instance
exports.AxiosInstence = axios_1.default.create({
    baseURL: `${exports.baseURL}/api`, // Replace with your API base URL
});
// Attach tokens to requests
exports.AxiosInstence.interceptors.request.use((request) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
        console.log('add token', token);
    }
    return request;
});
// Handle token refresh
exports.AxiosInstence.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem(localstorage_1.refreshTokenName);
        try {
            const { data } = await axios_1.default.post("http://localhost:5000/api/auth/refresh", {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            // Update tokens
            (0, localstorage_1.updateTokens)(data);
            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            return (0, exports.AxiosInstence)(originalRequest);
        }
        catch (refreshError) {
            // Handle refresh token failure (e.g., log out user)
            (0, localstorage_1.removeAuthTokens)();
            // redirect('/login');
            throw refreshError;
        }
    }
    throw error;
});
const redirect = (url) => {
    window.location.replace(url);
    window.location.reload();
};
// SWR fetcher using Axios
const fetcher = (url) => exports.AxiosInstence.get(url).then((res) => res.data);
// Example: Using SWR with the custom fetcher
function useData(endpoint) {
    const { data, error, isLoading } = (0, swr_1.default)(endpoint, fetcher, {
        revalidateOnFocus: false, // Optional: Adjust based on your needs
    });
    return { data, error, isLoading };
}
//# sourceMappingURL=AxiosInstance.js.map