import { ServiceType } from '../components/service-popup';
import { CloudProvider } from '../interfaces/canvas';
import {AxiosInstence} from './axios/AxiosInstance';


const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
export interface IResource {
    projectId: string;
    name: string;
    type: ServiceType;
    parentId?: string;
    connectedTo: string[];
    cloudProvider: CloudProvider;
    extraData: any;
  }

export const createResource = async (data: IResource) => {
    try {
        const response = await AxiosInstence.post('/resource/create', {
            ...data
          });
          return response.data;
        
    } catch(e) {
        console.log('failed to create resource ', data)
        console.log('failed to save resource ', e)
    }
};

export const generateTerraform = async (resourceId: string) => {
    try {
        const response = await AxiosInstence.post('/terraform', {
            resourceId: resourceId
          });
          console.log('generated terraform', response)
          return response.data.answer;
    } catch(e) {
        console.log('failed to create resource ', resourceId)
        console.log('failed to save resource ', e)
        return 'failed to generate terraform for this resource'
    }
};
