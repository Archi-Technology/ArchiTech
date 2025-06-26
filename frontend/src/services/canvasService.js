"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProjectData = exports.createSubnet = exports.createVPC = void 0;
const AxiosInstance_1 = require("./axios/AxiosInstance");
const canvas_1 = require("../interfaces/canvas");
const createVPC = async (name, cloud, cidr) => {
    const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
    const response = await AxiosInstance_1.AxiosInstence.post('/canvas/vpc', {
        name,
        data: {
            cloud,
            cidr,
            projectId
        }
    });
    return response.data;
};
exports.createVPC = createVPC;
const createSubnet = async (name, vpc, cloud, cidr) => {
    // Simulate a delay of 1 second
    const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
    const response = await AxiosInstance_1.AxiosInstence.post('/canvas/subnet', {
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
exports.createSubnet = createSubnet;
const fetchProjectData = async () => {
    const projectId = sessionStorage.getItem('selectedProjectId'); // Fetch project ID from session storage
    // const response:IProjectArtchitecture = await AxiosInstence.get('/canvas/project', {
    //   data: {
    //     projectId //
    //   }
    // });
    let response;
    response = {
        data: [
            {
                projectId: '1',
                _id: '7',
                name: 'vpc1',
                type: canvas_1.ServiceType.VPC,
                parentId: null,
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: [],
                extraData: null
            },
            {
                projectId: '1',
                _id: '8',
                name: 'vpc2',
                type: canvas_1.ServiceType.VPC,
                parentId: null,
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: [],
                extraData: null
            },
            {
                projectId: '1',
                _id: '20',
                name: 'subnet1',
                type: canvas_1.ServiceType.Subnet,
                parentId: '8',
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: [],
                extraData: null
            },
            {
                projectId: '1',
                _id: '22',
                name: 'VM1',
                type: canvas_1.ServiceType.VM,
                parentId: '20',
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: ['14'],
                extraData: null,
                price: 200
            },
            {
                projectId: '1',
                _id: '9',
                name: 'subnet1',
                type: canvas_1.ServiceType.Subnet,
                parentId: '7',
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: [],
                extraData: null,
                price: 50
            },
            {
                projectId: '1',
                _id: '10',
                name: 'VM1',
                type: canvas_1.ServiceType.VM,
                parentId: '9',
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: ['18'],
                extraData: null,
                price: 200
            },
            {
                projectId: '1',
                _id: '11',
                name: 'VM2',
                type: canvas_1.ServiceType.VM,
                parentId: '9',
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: [],
                extraData: null,
                price: 210
            },
            {
                projectId: '1',
                _id: '12',
                name: 'VPC1',
                type: canvas_1.ServiceType.VPC,
                parentId: '2',
                cloudProvider: canvas_1.CloudProvider.GCP,
                connnectedTo: [],
                extraData: null,
                price: 160
            },
            {
                projectId: '1',
                _id: '13',
                name: 'SUBNET1',
                type: canvas_1.ServiceType.Subnet,
                parentId: '12',
                cloudProvider: canvas_1.CloudProvider.GCP,
                connnectedTo: [],
                extraData: null,
                price: 60
            },
            {
                projectId: '1',
                _id: '14',
                name: 'database1',
                type: canvas_1.ServiceType.Databases,
                parentId: '13',
                cloudProvider: canvas_1.CloudProvider.GCP,
                connnectedTo: [],
                extraData: null,
                price: 220
            },
            {
                projectId: '1',
                _id: '15',
                name: 'bucket 1',
                type: canvas_1.ServiceType.OBJECT_STORAGE,
                parentId: '2',
                cloudProvider: canvas_1.CloudProvider.GCP,
                connnectedTo: [],
                extraData: null,
                price: 70
            },
            {
                projectId: '1',
                _id: '16',
                name: 'bucket1',
                type: canvas_1.ServiceType.OBJECT_STORAGE,
                parentId: '1',
                cloudProvider: canvas_1.CloudProvider.AZURE,
                connnectedTo: [],
                extraData: null,
                price: 80
            },
            {
                projectId: '1',
                _id: '17',
                name: 'bucket1',
                type: canvas_1.ServiceType.OBJECT_STORAGE,
                parentId: '3',
                cloudProvider: canvas_1.CloudProvider.AWS,
                connnectedTo: [],
                extraData: null,
                price: 90
            },
            {
                projectId: '1',
                _id: '18',
                name: 'bucket2',
                type: canvas_1.ServiceType.OBJECT_STORAGE,
                parentId: '3',
                cloudProvider: canvas_1.CloudProvider.AWS,
                connnectedTo: [],
                extraData: null,
                price: 100
            },
        ]
    };
    return response.data;
};
exports.fetchProjectData = fetchProjectData;
//# sourceMappingURL=canvasService.js.map