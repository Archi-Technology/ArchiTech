export enum ServiceType  {
    VPC = "VPC",
    Subnet = 'Subnet',
    LB = 'LoadBalancer',
    VM = 'VirtualMachine',
    Databases = 'databases',
    OBJECT_STORAGE = 'ObjectStorage'
}

export enum CloudProvider {    
    GCP = 'GCP',
    AZURE = 'AZURE',
    IWS = 'AWS',
}

export interface IProjectArtchitecture {
    data: IBaseService[]
}

interface IBaseService {    
    projectId: string;
    _id: string;
    name: string;
    type: ServiceType;
    parentId: string;
    cloudProvider: CloudProvider;
    connnectedTo: string[];
    extraData: JSON;
}