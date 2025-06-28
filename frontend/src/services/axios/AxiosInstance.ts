import axios, { AxiosInstance, AxiosResponse } from "axios";
import useSWR from "swr";
import { refreshTokenName, removeAuthTokens, updateTokens } from "../../utils/functions/localstorage";

const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
console.log(import.meta.env.VITE_BACKEND_URL0)
class ApiService {
    private static instance: ApiService;
    public apiClient: AxiosInstance;

    private constructor() {
        this.apiClient = axios.create({
            baseURL: `${backend_url}/api`,
        });
        this.initializeInterceptors();
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private initializeInterceptors() {
        this.apiClient.interceptors.request.use((request) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        });

        this.apiClient.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshToken = localStorage.getItem(refreshTokenName);
                    try {
                        const { data } = await axios.post(`${backend_url}/api/auth/refresh`, {}, {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        });

                        updateTokens(data);
                        originalRequest.headers.Authorization = `Bearer ${data.token}`;
                        return this.apiClient(originalRequest);
                    } catch (refreshError) {
                        removeAuthTokens();
                        throw refreshError;
                    }
                }
                throw error;
            }
        );
    }
}

const apiService = ApiService.getInstance();

const fetcher = (url: string) => apiService.apiClient.get(url).then((res) => res.data);

export function useData(endpoint: string) {
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        revalidateOnFocus: false, // Optional: Adjust based on your needs
    });

    return { data, error, isLoading };
}

export default apiService;
