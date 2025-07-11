import apiService from './axios/AxiosInstance';
import { IProjectArtchitecture } from '../interfaces/canvas';
import useSWR from 'swr';
const projectVpcKey = 'projectVpcs'; // Key for caching project VPCs
const projectSubnetsKey = 'projectSubnets'; // Key for caching project subnets

export const getAllProjects = async () => {
  const response = await apiService.apiClient.get('/projects');
  return response.data;
};

export const getProjectResources = async (projectId: string) => { // Fetch project ID from session storage
    const response:IProjectArtchitecture = await apiService.apiClient.get(`/projects/artchitecture/${projectId}`,);
  return response.data;
};

export const createProject = async (name: string) => {
  const response = await apiService.apiClient.post('/projects', {
    name,
    data: {}
  });
  return response.data;
};

export const updateProject = async (id: string, name: string, data: any) => {
  const response = await apiService.apiClient.put(`/projects/${id}`, {
    name,
    data
  });
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await apiService.apiClient.delete(`/projects/${id}`);
  return response.data;
};
