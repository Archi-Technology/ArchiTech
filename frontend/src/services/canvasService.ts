import { AxiosInstence } from './axios/AxiosInstance';
import { IProjectArtchitecture } from '../interfaces/canvas';
import { ServiceType, CloudProvider } from '../interfaces/canvas';
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
  // const response:IProjectArtchitecture = await AxiosInstence.get('/canvas/project', {
  //   data: {
  //     projectId //
  //   }
  // });
  let response: IProjectArtchitecture;
  response = {
    data: [
      {
        projectId: '1',
        _id: '7',
        name: 'vpc1',
        type: ServiceType.VPC,
        parentId: null,
        cloudProvider: CloudProvider.AZURE,
        connnectedTo: [],
        extraData: null
      },
      {
        projectId: '1',
        _id: '8',
        name: 'vpc2',
        type: ServiceType.VPC,
        parentId: null,
        cloudProvider: CloudProvider.AZURE,
        connnectedTo: [],
        extraData: null
      },
      {
        projectId: '1',
        _id: '9',
        name: 'subnet1',
        type: ServiceType.Subnet,
        parentId: '7',
        cloudProvider: CloudProvider.AZURE,
        connnectedTo: [],
        extraData: null
      }
    ]

  }
  return response.data;
};


