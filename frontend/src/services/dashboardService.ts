import apiService from './axios/AxiosInstance';

// Get resource distribution by cloud provider (percentage)
export const getProviderDistribution = async (projectId: string) => {
  const response = await apiService.apiClient.get(`/dashboard/provider-distribution/${projectId}`);
  return response.data;
};

// Get resource distribution by type (percentage)
export const getTypeDistribution = async (projectId: string) => {
  const response = await apiService.apiClient.get(`/dashboard/type-distribution/${projectId}`);
  return response.data;
};

// Get total price (excluding object storage)
export const getTotalPrice = async (projectId: string) => {
  const response = await apiService.apiClient.get(`/dashboard/total-price/${projectId}`);
  return response.data.totalPrice;
};

// Get resource distribution by region (percentage)
export const getRegionDistribution = async (projectId: string) => {
  const response = await apiService.apiClient.get(`/dashboard/region-distribution/${projectId}`);
  return response.data;
};