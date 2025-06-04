import {AxiosInstence} from './axios/AxiosInstance';


const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
export const getAllProjects = async () => {
  const response = await AxiosInstence.get('/projects');
  return response.data;
};

export const getProjectSubnets = async () => {
  const response = await AxiosInstence.get(`/projects/${projectId}/subnets`);
  return response.data;
};

export const getProjectVpcs = async () => {
  const response = await AxiosInstence.get(`/projects/${projectId}/vpcs/`);
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
