import {AxiosInstence} from './axios/AxiosInstance';
import { IProjectArtchitecture } from '../interfaces/canvas';
import useSWR from 'swr';
const projectVpcKey = 'projectVpcs'; // Key for caching project VPCs
const projectSubnetsKey = 'projectSubnets'; // Key for caching project subnets

const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
export const getAllProjects = async () => {
  const response = await AxiosInstence.get('/projects');
  return response.data;
};

export const getProjectSubnets = async () => {
  const response = await AxiosInstence.get(`/projects/${projectId}/subnets`);
  return response.data;
};

export const useGetProjectSubnets = (userid: string | null) =>
  useSWR<any>(
    projectSubnetsKey,
    () => getProjectSubnets(),
  );

  export const useGetProjectVpcs = (userid: string | null) =>
  useSWR<any>(
    projectVpcKey,
    () => getProjectVpcs(),
  );
export const getProjectVpcs = async () => {
  const response = await AxiosInstence.get(`/projects/${projectId}/vpcs/`);
  return response.data;
};

export const getProjectResources = async () => { // Fetch project ID from session storage
    const response:IProjectArtchitecture = await AxiosInstence.get(`/projects/artchitecture/${projectId}`,);
  return response.data;
};

export const createProject = async (name: string) => {
  const response = await AxiosInstence.post('/projects', {
    name,
    data: {}
  });
  return response.data;
};

export const updateProject = async (id: string, name: string, data: any) => {
  const response = await AxiosInstence.put(`/projects/${id}`, {
    name,
    data
  });
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await AxiosInstence.delete(`/projects/${id}`);
  return response.data;
};
