import { AxiosInstence } from './axios/AxiosInstance';
import { IProjectArtchitecture } from '../interfaces/canvas';
import {  CloudProvider } from '../interfaces/canvas';
import { ServiceType } from '../components/service-popup';
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
  // Simulate a delay of 1 second
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
  const response:IProjectArtchitecture = await AxiosInstence.get(`/projects/artchitecture/${projectId}`,);
  // let response: IProjectArtchitecture;
  // response = {
  //   data: [
  //     {
  //       projectId: '1',
  //       _id: '7',
  //       name: 'vpc1',
  //       type: ServiceType.VPC,
  //       parentId: null,
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: [],
  //       extraData: null
  //     },
  //     {
  //       projectId: '1',
  //       _id: '8',
  //       name: 'vpc2',
  //       type: ServiceType.VPC,
  //       parentId: null,
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: [],
  //       extraData: null
  //     },
  //     {
  //       projectId: '1',
  //       _id: '20',
  //       name: 'subnet1',
  //       type: ServiceType.Subnet,
  //       parentId: '8',
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: [],
  //       extraData: null
  //     },
  //     {
  //       projectId: '1',
  //       _id: '22',
  //       name: 'VM1',
  //       type: ServiceType.VM,
  //       parentId: '20',
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: ['14'],
  //       extraData: null,
  //       price: 200
  //     },
  //     {
  //       projectId: '1',
  //       _id: '9',
  //       name: 'subnet1',
  //       type: ServiceType.Subnet,
  //       parentId: '7',
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 50
  //     },
  //     {
  //       projectId: '1',
  //       _id: '10',
  //       name: 'VM1',
  //       type: ServiceType.VM,
  //       parentId: '9',
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: ['18'],
  //       extraData: null,
  //       price: 200
  //     },
  //     {
  //       projectId: '1',
  //       _id: '11',
  //       name: 'VM2',
  //       type: ServiceType.VM,
  //       parentId: '9',
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 210
  //     },
  //     {
  //       projectId: '1',
  //       _id: '12',
  //       name: 'VPC1',
  //       type: ServiceType.VPC,
  //       parentId: '2',
  //       cloudProvider: CloudProvider.GCP,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 160
  //     },
  //     {
  //       projectId: '1',
  //       _id: '13',
  //       name: 'SUBNET1',
  //       type: ServiceType.Subnet,
  //       parentId: '12',
  //       cloudProvider: CloudProvider.GCP,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 60
  //     },
  //     {
  //       projectId: '1',
  //       _id: '14',
  //       name: 'database1',
  //       type: ServiceType.DATABASE,
  //       parentId: '13',
  //       cloudProvider: CloudProvider.GCP,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 220
  //     },
  //     {
  //       projectId: '1',
  //       _id: '15',
  //       name: 'bucket 1',
  //       type: ServiceType.OBJECT_STORAGE,
  //       parentId: '2',
  //       cloudProvider: CloudProvider.GCP,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 70
  //     },
  //     {
  //       projectId: '1',
  //       _id: '16',
  //       name: 'bucket1',
  //       type: ServiceType.OBJECT_STORAGE,
  //       parentId: '1',
  //       cloudProvider: CloudProvider.AZURE,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 80
  //     },
  //     {
  //       projectId: '1',
  //       _id: '17',
  //       name: 'bucket1',
  //       type: ServiceType.OBJECT_STORAGE,
  //       parentId: '3',
  //       cloudProvider: CloudProvider.AWS,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 90
  //     },
  //     {
  //       projectId: '1',
  //       _id: '18',
  //       name: 'bucket2',
  //       type: ServiceType.OBJECT_STORAGE,
  //       parentId: null,
  //       cloudProvider: CloudProvider.AWS,
  //       connnectedTo: [],
  //       extraData: null,
  //       price: 100
  //     },
  //   ]

  // }
  const data = response.data.map((item) => {
    if(item.type === ServiceType.OBJECT_STORAGE) {
      item.parentId = CloudProviderClientIdsRecord[item.cloudProvider]; // Ensure the type is in uppercase
    }
    return item
  })
  console.log('fetched project data', data)
  return data;
}



const CloudProviderClientIdsRecord: Record<CloudProvider, string> = {
  [CloudProvider.AWS]: '3', 
  [CloudProvider.AZURE]: '1',
  [CloudProvider.GCP]: '2',
}