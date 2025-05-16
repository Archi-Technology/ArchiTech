import {AxiosInstence} from './axios/AxiosInstance';
import {IProjectArtchitecture} from '../interfaces/canvas';
export const createVPC = async (name: string, cloud: string, cidr: string) => {
  const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
  const response = await AxiosInstence.post('/canvas/vpc', {
    name,
    data: {
      cloud,
      cidr,
      projectId 
    }
  });
  return response.data;
};

export const createSubnet = async (name: string, vpc: string, cloud: string, cidr: string) => {
  const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
  const response = await AxiosInstence.post('/canvas/subnet', {
    name,
    data: {
      vpc,
      cloud,
      cidr,
      projectId //
    }
  });
  return response.data;
};

export const fetchProjectData = async () => {
  const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
  const response:IProjectArtchitecture = await AxiosInstence.get('/canvas/project', {
    data: {
      projectId //
    }
  });
  return response.data;
};


