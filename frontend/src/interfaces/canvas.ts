export enum ServiceType  {
    VPC = "VPC",
    Subnet = 'Subnet',
    LB = 'LoadBalancer',
    VM = 'VirtualMachine',
    DATABASE='database',
    OBJECT_STORAGE = 'ObjectStorage'
}

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
    connnectedTo: string[];
    extraData: JSON | null;
    price?: number | null;
}