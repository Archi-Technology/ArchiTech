import { ServiceType } from "../components/service-popup";

export enum CloudProvider {    
    GCP = 'GCP',
    AZURE = 'AZURE',
    AWS = 'AWS',
}

export interface IProjectArtchitecture {
    data: IBaseService[]
}

export interface IBaseService {    
    projectId: string;
    _id: string;
    name: string;
    type: ServiceType;
    parentId: string | null;
    cloudProvider: CloudProvider;
    connectedTo: string[];
    extraData: JSON | null;
    price?: number | null;
}