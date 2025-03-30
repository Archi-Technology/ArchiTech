import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import { refreshTokenName, removeAuthTokens, updateTokens } from "../../utils/functions/localstorage";

export const baseURL = 'http://localhost:5000'
// Create an Axios instance
export const AxiosInstence = axios.create({
    baseURL: `${baseURL}/api`, // Replace with your API base URL
});
// Attach tokens to requests
AxiosInstence.interceptors.request.use((request) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
        console.log('add token', token)
    }
    return request;
});

// Handle token refresh
AxiosInstence.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem(refreshTokenName);
            try {
                const { data } = await axios.post("http://localhost:5000/api/auth/refresh", {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                });

                // Update tokens
                updateTokens(data);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return AxiosInstence(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., log out user)
                removeAuthTokens()
                // redirect('/login');
                throw refreshError;
            }
        }

        throw error;
    }
);


const redirect = (url: string) => {
    window.location.replace(url);
    window.location.reload();
}
// SWR fetcher using Axios
const fetcher = (url: string) => AxiosInstence.get(url).then((res) => res.data);

// Example: Using SWR with the custom fetcher
export function useData(endpoint: string) {
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        revalidateOnFocus: false, // Optional: Adjust based on your needs
    });

    return { data, error, isLoading };
}
