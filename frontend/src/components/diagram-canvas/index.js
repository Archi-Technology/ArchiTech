"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./index.scss");
const reactflow_1 = __importStar(require("reactflow"));
require("reactflow/dist/style.css");
const container_node_1 = __importDefault(require("../canvas/container/container-node"));
const circle_node_1 = __importDefault(require("../canvas/circle-node/circle-node"));
const earth_1 = __importDefault(require("../canvas/earth/earth"));
const azure_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/azure-svgrepo-com.svg"));
const gcp_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/gcp-svgrepo-com.svg"));
const aws_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/aws-svgrepo-com.svg"));
const planet_earth_svg_1 = __importDefault(require("../../assets/canvas/planet-earth.svg"));
const cloud_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/cloud-svgrepo-com.svg"));
const vm_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/vm-svgrepo-com.svg"));
const bucket_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/bucket-svgrepo-com.svg"));
const network_wired_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/network-wired-svgrepo-com.svg"));
const database_svgrepo_com_svg_1 = __importDefault(require("../../assets/canvas/database-svgrepo-com.svg"));
const canvasContext_1 = require("../../contexts/canvasContext"); // Import canvas context
const canvasService_1 = require("../../services/canvasService"); // Import fetchProjectData
const canvas_1 = require("../../interfaces/canvas"); // Import ServiceType
const nodeTypes = {
    circle: circle_node_1.default,
    earth: earth_1.default,
    bigSquare: container_node_1.default,
};
const defaultNodes = [
    {
        id: '4',
        type: 'earth',
        position: { x: 350, y: 50 },
        draggable: false,
        data: {
            label: 'Internet',
            color: 'rgb(246,133,0)',
            imageSrc: planet_earth_svg_1.default,
        },
    },
    {
        id: '1',
        type: 'circle',
        position: { x: 150, y: 250 },
        draggable: false,
        data: {
            label: 'Azure',
            color: 'rgb(67,196,237)',
            imageSrc: azure_svgrepo_com_svg_1.default,
        },
    },
    {
        id: '2',
        type: 'circle',
        position: { x: 350, y: 250 },
        draggable: false,
        data: {
            label: 'GCP',
            color: 'rgb(103,155,253)',
            imageSrc: gcp_svgrepo_com_svg_1.default,
        },
    },
    {
        id: '3',
        type: 'circle',
        position: { x: 550, y: 250 },
        draggable: false,
        data: {
            label: 'AWS',
            color: 'rgb(246,133,0)',
            imageSrc: aws_svgrepo_com_svg_1.default,
        },
    },
];
const initialEdges = [
    { id: 'e1-2', source: '4', target: '1', animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } },
    { id: 'e2-3', source: '4', target: '2', animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } },
    { id: 'e3-4', source: '4', target: '3', animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } },
];
const BasicFlow = (0, react_1.forwardRef)((_, ref) => {
    const [expandedNodeId, setExpandedNodeId] = (0, react_1.useState)(null);
    const [nodes, setNodes, onNodesChange] = (0, reactflow_1.useNodesState)(defaultNodes.map((node) => ({ ...node, draggable: false })) // Make all nodes undraggable
    );
    const [edges, setEdges, onEdgesChange] = (0, reactflow_1.useEdgesState)(initialEdges);
    const reactFlowWrapper = (0, react_1.useRef)(null);
    const reactFlowInstance = (0, react_1.useRef)(null);
    const { registerAddNodeFunction } = (0, canvasContext_1.useCanvas)(); // Access the function to register node addition
    const [openNodes, setOpenNodes] = (0, react_1.useState)([]); // State for clicked nodes
    const onConnect = (connection) => setEdges((eds) => (0, reactflow_1.addEdge)({
        ...connection,
        animated: true,
        type: 'smoothstep',
        style: { stroke: '#555', strokeWidth: 2 },
    }, eds));
    const containerLabelMap = {
        'AZURE': '1',
        'GCP': '2',
        'AWS': '3',
    };
    const containerLabelMapReverse = {
        '1': 'AZURE',
        '2': 'GCP',
        '3': 'AWS',
    };
    const iconMap = {
        '1': azure_svgrepo_com_svg_1.default,
        '2': gcp_svgrepo_com_svg_1.default,
        '3': aws_svgrepo_com_svg_1.default,
    };
    const getIconForType = (type) => {
        switch (type) {
            case canvas_1.ServiceType.VPC:
                return cloud_svgrepo_com_svg_1.default;
            case canvas_1.ServiceType.Subnet:
                return network_wired_svgrepo_com_svg_1.default;
            case canvas_1.ServiceType.VM:
                return vm_svgrepo_com_svg_1.default;
            case canvas_1.ServiceType.OBJECT_STORAGE:
                return bucket_svgrepo_com_svg_1.default;
            case canvas_1.ServiceType.Databases:
                return database_svgrepo_com_svg_1.default;
            default:
                return cloud_svgrepo_com_svg_1.default;
        }
    };
    const getColorForCloud = (cloudProvider) => {
        switch (cloudProvider) {
            case 'AWS':
                return 'rgb(246,133,0)';
            case 'AZURE':
                return 'rgb(67,196,237)';
            case 'GCP':
                return 'rgb(103,155,253)';
            default:
                return '#ccc';
        }
    };
    const onNodeClick = async (_, node) => {
        // Ensure the node remains undraggable
        setNodes((nds) => nds.map((n) => n.id === node.id ? { ...n, draggable: false } : n));
        const nodeId = node.id;
        const canvasWidth = reactFlowWrapper.current?.clientWidth || 0;
        const canvasCenterX = canvasWidth / 2;
        const cloudBoxWidth = canvasWidth * 0.8;
        const cloudBoxHeight = 700;
        const startOfBox = canvasCenterX - cloudBoxWidth / 2;
        if (!['1', '2', '3'].includes(nodeId))
            return;
        const projectId = sessionStorage.getItem('selectedProjectId');
        if (!projectId)
            return;
        const projectData = await (0, canvasService_1.fetchProjectData)();
        const hasChildren = projectData.some((item) => item.cloudProvider === containerLabelMapReverse[nodeId]);
        let newOpenNodes = [...openNodes];
        if (openNodes.includes(nodeId)) {
            // Close the node
            // newOpenNodes = newOpenNodes.filter((id) => id !== nodeId);
            // setExpandedNodeId(null);
        }
        else {
            // Open the node only if it has children
            if (hasChildren) {
                newOpenNodes = [...openNodes, nodeId];
                setExpandedNodeId(nodeId);
            }
            else {
                // alert('Please Add resoruce to ' + containerLabelMapReverse[nodeId]);
                return; // Don't expand if no children
            }
        }
        setOpenNodes(newOpenNodes);
        // Count VPCs per cloudProvider
        const vpcCounts = {};
        const bucketsCount = {};
        const subnetCounts = {};
        const childCounts = {};
        projectData.forEach((node) => {
            if (node.type === canvas_1.ServiceType.VPC) {
                vpcCounts[node.cloudProvider] = (vpcCounts[node.cloudProvider] || 0) + 1;
            }
            if (node.type === canvas_1.ServiceType.OBJECT_STORAGE) {
                bucketsCount[node.cloudProvider] = (bucketsCount[node.cloudProvider] || 0) + 1;
            }
            if (node.type === canvas_1.ServiceType.Subnet && node.parentId) {
                subnetCounts[node.parentId] = (subnetCounts[node.parentId] || 0) + 1;
            }
            if (node.parentId) {
                childCounts[node.parentId] = (childCounts[node.parentId] || 0) + 1;
            }
        });
        // Calculate positions for dynamic nodes
        // 1. Group nodes by parentId (or cloudProvider for VPCs)
        const vpcGroups = {};
        const bucketsGroups = {};
        const subnetGroups = {};
        const childGroups = {};
        projectData.forEach((node) => {
            if (node.type === canvas_1.ServiceType.VPC) {
                if (!vpcGroups[node.cloudProvider])
                    vpcGroups[node.cloudProvider] = [];
                vpcGroups[node.cloudProvider].push(node);
            }
            else if (node.type === canvas_1.ServiceType.Subnet) {
                if (!subnetGroups[node.parentId])
                    subnetGroups[node.parentId] = [];
                subnetGroups[node.parentId].push(node);
            }
            else if (node.type === canvas_1.ServiceType.OBJECT_STORAGE) {
                if (!bucketsGroups[node.cloudProvider])
                    bucketsGroups[node.cloudProvider] = [];
                bucketsGroups[node.cloudProvider].push(node);
            }
            else if (node.parentId) {
                if (!childGroups[node.parentId])
                    childGroups[node.parentId] = [];
                childGroups[node.parentId].push(node);
            }
        });
        // Helper to get base position for cloud nodes
        const cloudBasePositions = {
            '1': { x: startOfBox, y: 250 }, // Azure
            '2': { x: startOfBox, y: 250 }, // GCP
            '3': { x: startOfBox, y: 250 }, // AWS
        };
        // Helper to get VPC node id for parent lookup
        const vpcIdMap = {};
        projectData.forEach((node) => {
            if (node.type === canvas_1.ServiceType.VPC) {
                vpcIdMap[node._id] = node.cloudProvider;
            }
        });
        // first loop changes all IbaseService nodes to Node and places vpcs and buckets, second loop changes subnets, third changes children of subnets
        let dynamicNodes = [];
        projectData.forEach((node) => {
            if (newOpenNodes.includes(containerLabelMap[node.cloudProvider])) {
                let width = 0, height = 0;
                let position = { x: 0, y: 0 };
                if (node.type === canvas_1.ServiceType.VPC) {
                    const count = vpcCounts[node.cloudProvider] || 1;
                    if (bucketsCount[node.cloudProvider] >= 1) {
                        width = cloudBoxWidth / count - 10 - (150 / count);
                    }
                    else {
                        width = cloudBoxWidth / count - 10;
                    }
                    height = cloudBoxHeight - 45;
                    // Position VPCs horizontally under their cloud node
                    const group = vpcGroups[node.cloudProvider] || [];
                    const idx = group.findIndex((n) => n._id === node._id);
                    const base = cloudBasePositions[node.cloudProvider === 'AZURE' ? '1' :
                        node.cloudProvider === 'GCP' ? '2' :
                            node.cloudProvider === 'AWS' ? '3' : '1'];
                    position = {
                        x: idx * width + 10,
                        y: 35,
                    };
                    let parentNode = node.parentId;
                    if (node.type === canvas_1.ServiceType.VPC) {
                        if (node.cloudProvider === 'AZURE')
                            parentNode = '1';
                        else if (node.cloudProvider === 'GCP')
                            parentNode = '2';
                        else if (node.cloudProvider === 'AWS')
                            parentNode = '3';
                    }
                    dynamicNodes.push({
                        id: node._id,
                        type: node.type === canvas_1.ServiceType.VPC || node.type === canvas_1.ServiceType.Subnet ? 'bigSquare' : 'circle',
                        position,
                        draggable: false, // Ensure dynamic nodes are undraggable
                        data: {
                            label: node.name,
                            icon: getIconForType(node.type),
                            imageSrc: getIconForType(node.type),
                            color: getColorForCloud(node.cloudProvider),
                            width,
                            height,
                        },
                        parentNode,
                        extent: 'parent',
                    });
                }
                else if (node.type !== canvas_1.ServiceType.OBJECT_STORAGE) {
                    let parentNode = node.parentId;
                    dynamicNodes.push({
                        id: node._id,
                        type: node.type === canvas_1.ServiceType.Subnet ? 'bigSquare' : 'circle',
                        position,
                        data: {
                            label: node.name,
                            icon: getIconForType(node.type),
                            imageSrc: getIconForType(node.type),
                            color: getColorForCloud(node.cloudProvider),
                            width,
                            height,
                            price: node.price || 0,
                        },
                        parentNode,
                        extent: 'parent',
                    });
                }
                else {
                    // it is a bucket
                    let parentNode = node.parentId;
                    const group = bucketsGroups[node.cloudProvider] || [];
                    width = 100;
                    height = 100;
                    const idx = group.findIndex((n) => n._id === node._id);
                    if (vpcCounts[node.cloudProvider] >= 1) {
                        if (group.length >= 2) {
                            position = { x: cloudBoxWidth - 125, y: (cloudBoxHeight / 5) * (2 * idx + 2) - height };
                        }
                        else {
                            position = { x: cloudBoxWidth - 125, y: (cloudBoxHeight / 2) - height / 2 };
                        }
                    }
                    else {
                        if (group.length >= 2) {
                            position = { x: cloudBoxWidth / 2 - width / 2, y: (cloudBoxHeight / 5) * (2 * idx + 2) - height };
                        }
                        else {
                            position = { x: cloudBoxWidth / 2 - width / 2, y: (cloudBoxHeight / 2) - height / 2 };
                        }
                    }
                    dynamicNodes.push({
                        id: node._id,
                        type: 'circle',
                        position,
                        data: {
                            label: node.name,
                            icon: getIconForType(node.type),
                            imageSrc: getIconForType(node.type),
                            color: getColorForCloud(node.cloudProvider),
                            width,
                            height,
                            price: node.price || 0,
                        },
                        parentNode,
                        extent: 'parent',
                    });
                }
            }
        });
        dynamicNodes = dynamicNodes.map((node) => ({
            ...node,
            draggable: false, // Ensure all dynamic nodes are undraggable
        }));
        dynamicNodes = dynamicNodes.map((node) => {
            if (node.type === 'bigSquare' && node.position.x === 0) {
                let width = 0, height = 0;
                let position = { x: 0, y: 0 };
                // Find parent VPC node
                const parentVPCNode = projectData.find((n) => n._id === node.parentNode);
                const parentDynamicNode = parentVPCNode
                    ? dynamicNodes.find((n) => n.id === parentVPCNode._id)
                    : undefined;
                const parentWidth = parentDynamicNode?.data?.width || cloudBoxWidth;
                const parentHeight = parentDynamicNode?.data?.height || cloudBoxHeight;
                const count = node.parentNode ? subnetCounts[node.parentNode] || 1 : 1;
                width = parentWidth / count - 10;
                height = parentHeight - 45;
                // Position subnets horizontally under their VPC node
                const group = node.parentNode ? subnetGroups[node.parentNode] || [] : [];
                const idx = group.findIndex((n) => n._id === node.id);
                const parentPos = parentDynamicNode?.position || { x: 0, y: 0 };
                position = {
                    x: idx * width,
                    y: 35,
                };
                return {
                    ...node,
                    position,
                    data: {
                        label: node.data.label,
                        icon: node.data.icon,
                        color: node.data.color,
                        width,
                        height,
                    },
                };
            }
            else {
                return node;
            }
        });
        dynamicNodes = dynamicNodes.map((node) => {
            if (node.type !== 'bigSquare' && node.data.icon !== getIconForType(canvas_1.ServiceType.OBJECT_STORAGE)) {
                let width = 0, height = 0;
                let position = { x: 0, y: 0 };
                // Find parent VPC node
                const parentSubnetNode = projectData.find((n) => n._id === node.parentNode);
                const parentDynamicNode = parentSubnetNode
                    ? dynamicNodes.find((n) => n.id === parentSubnetNode._id)
                    : undefined;
                const parentWidth = parentDynamicNode?.data?.width;
                const parentHeight = parentDynamicNode?.data?.height || cloudBoxHeight;
                const count = node.parentNode ? subnetCounts[node.parentNode] || 1 : 1;
                width = 100;
                height = parentHeight / 4 - 10;
                // Position subnets horizontally under their VPC node
                const group = node.parentNode ? childGroups[node.parentNode] || [] : [];
                const idx = group.findIndex((n) => n._id === node.id);
                if (group.length >= 2) {
                    position = {
                        x: parentWidth / 2 - width / 2,
                        y: (parentHeight / 5) * (2 * idx + 2) - height,
                    };
                }
                else {
                    position = {
                        x: parentWidth / 2 - width / 2,
                        y: parentHeight / 2 - height / 2 - 10,
                    };
                }
                return {
                    ...node,
                    position,
                    data: {
                        ...node.data,
                        width,
                        height,
                    },
                };
            }
            else {
                return node;
            }
        });
        const dynamicEdges = [];
        projectData
            .filter((node) => node.connnectedTo)
            .forEach((node) => (node.connnectedTo.forEach((connectedNode) => {
            dynamicEdges.push({
                id: `${node._id}-${connectedNode}`,
                source: node._id,
                target: connectedNode,
                animated: true,
                type: 'smoothstep',
                style: { stroke: 'purple', strokeWidth: 2 },
            });
        })));
        setNodes((nds) => [...defaultNodes, ...dynamicNodes]);
        setEdges((eds) => [...initialEdges, ...dynamicEdges]);
        // cloud nodes placement and sizing
        setNodes((nds) => nds.map((n) => {
            if (['1', '2', '3'].includes(n.id)) {
                let position = { x: 0, y: 0 };
                let width = 100;
                let height = 100;
                let type = 'circle';
                if (newOpenNodes.includes(n.id)) {
                    type = 'bigSquare';
                    width = 0;
                    height = 0;
                }
                if (newOpenNodes.length === 1) {
                    // Center the open node
                    if (newOpenNodes.includes(n.id)) {
                        position = { x: canvasCenterX - cloudBoxWidth / 2, y: 100 };
                    }
                    else {
                        const closedNodes = ['1', '2', '3'].filter(id => !newOpenNodes.includes(id));
                        position = closedNodes[0] === n.id ? { x: canvasCenterX + cloudBoxWidth / 2 + 100, y: 250 } : { x: canvasCenterX - cloudBoxWidth / 2 - 200, y: 250 };
                    }
                }
                else if (newOpenNodes.length === 2) {
                    // Place the open nodes side by side
                    if (n.id === newOpenNodes[0]) {
                        position = { x: canvasCenterX / 2 - cloudBoxWidth / 2, y: 100 };
                    }
                    else if (n.id === newOpenNodes[1]) {
                        position = { x: canvasCenterX + cloudBoxWidth / 2, y: 100 };
                    }
                    else {
                        // Position the closed node below
                        position = { x: canvasCenterX + cloudBoxWidth / 4 + 50, y: 900 };
                    }
                }
                else if (newOpenNodes.length === 3) {
                    // Place the first two open nodes side by side at the top, and the third one below them
                    if (n.id === newOpenNodes[0]) {
                        position = { x: canvasCenterX / 2 - cloudBoxWidth / 2, y: 100 };
                    }
                    else if (n.id === newOpenNodes[1]) {
                        position = { x: canvasCenterX + cloudBoxWidth / 2, y: 100 };
                    }
                    else if (n.id === newOpenNodes[2]) {
                        position = { x: canvasCenterX - cloudBoxWidth / 8 - 24, y: 900 };
                    }
                }
                else {
                    position = { x: 150 + parseInt(n.id) * 100, y: 250 };
                }
                let icon, label, color;
                if (n.id === '1') {
                    icon = azure_svgrepo_com_svg_1.default;
                    label = 'Azure';
                    color = 'rgb(67,196,237)';
                }
                else if (n.id === '2') {
                    icon = gcp_svgrepo_com_svg_1.default;
                    label = 'GCP';
                    color = 'rgb(103,155,253)';
                }
                else {
                    icon = aws_svgrepo_com_svg_1.default;
                    label = 'AWS';
                    color = 'rgb(246,133,0)';
                }
                return {
                    ...n,
                    type,
                    position,
                    data: {
                        ...n.data,
                        label,
                        icon,
                        color,
                        width: width,
                        height: height,
                    },
                };
            }
            if (n.id === '4') {
                if (newOpenNodes.length === 1) {
                    return {
                        ...n,
                        position: { x: canvasCenterX - 50, y: -200 }, // 100 is the earh width
                    };
                }
                else {
                    return {
                        ...n,
                        position: { x: canvasCenterX + cloudBoxWidth / 4 + 50, y: -200 }, // 100 is the earh width
                    };
                }
            }
            // Ensure position is always defined
            return {
                ...n,
                position: n.position ?? { x: 0, y: 0 },
            };
        }));
        // Step 2: Expand size
        setTimeout(() => {
            setNodes((nds) => nds.map((n) => newOpenNodes.includes(n.id)
                ? {
                    ...n,
                    data: {
                        ...n.data,
                        width: cloudBoxWidth,
                        height: cloudBoxHeight,
                    },
                }
                : n));
            if (reactFlowInstance.current) {
                reactFlowInstance.current.fitView({ padding: 0.2 });
                // reactFlowInstance.current.zoomTo(0.35);
            }
        }, 10);
    };
    const nColor = (id) => {
        switch (id) {
            case '1':
                return 'rgb(67,196,237)';
            case '2':
                return 'rgb(103,155,253)';
            case '3':
                return 'rgb(246,133,0)';
            default:
                return '#ccc';
        }
    };
    (0, react_1.useEffect)(() => {
        if (reactFlowInstance.current) {
            reactFlowInstance.current.fitView({ padding: 0.2 });
            reactFlowInstance.current.zoomTo(0.50);
        }
    }, [nodes, edges]);
    const isNodeClicked = (nodeId) => {
        return openNodes.includes(nodeId); // Check if the node is already clicked
    };
    (0, react_1.useImperativeHandle)(ref, () => ({
        onNodeClick,
        isNodeClicked, // Expose the method
    }));
    return ((0, jsx_runtime_1.jsx)("div", { style: { width: '100%', height: '100%' }, ref: reactFlowWrapper, children: (0, jsx_runtime_1.jsxs)(reactflow_1.default, { nodes: nodes, edges: edges, nodeTypes: nodeTypes, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: onConnect, onNodeClick: onNodeClick, fitView: false, minZoom: 0.1, maxZoom: 1.5, onInit: (instance) => {
                reactFlowInstance.current = instance;
                instance.fitView({ padding: 0.1 });
                instance.zoomTo(0.55);
            }, children: [(0, jsx_runtime_1.jsx)(reactflow_1.MiniMap, {}), (0, jsx_runtime_1.jsx)(reactflow_1.Controls, {}), (0, jsx_runtime_1.jsx)(reactflow_1.Background, {})] }) }));
});
exports.default = BasicFlow;
//# sourceMappingURL=index.js.map