

export enum ServiceType  {
    VPC = "Vpc",
    SUBNET = 'Subnet',
    LB = 'LoadBalancer',
    VM = 'VirtualMachine',
    DATABASE = 'Database',
    OBJECT_STORAGE = 'ObjectStorage'
  }
  
export enum CloudProvider {    
    GCP = 'GCP',
    AZURE = 'AZURE',
    AWS = 'AWS',
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