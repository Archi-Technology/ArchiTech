import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ContainerNode from '../canvas/container/container-node';
import CircleNode from '../canvas/circle-node/circle-node';
import EarthNode from '../canvas/earth/earth';
import azureIcon from '../../assets/canvas/azure-svgrepo-com.svg';
import gcpIcon from '../../assets/canvas/gcp-svgrepo-com.svg';
import awsIcon from '../../assets/canvas/aws-svgrepo-com.svg';
import earth from '../../assets/canvas/planet-earth.svg';
import vpcIcon from '../../assets/canvas/cloud-svgrepo-com.svg';
import subnetIcon from '../../assets/canvas/network-wired-svgrepo-com.svg';
import { ContactlessOutlined } from '@mui/icons-material';
import { useCanvas } from "../../contexts/canvasContext"; // Import canvas context
import { fetchProjectData } from '../../services/canvasService'; // Import fetchProjectData
import { ServiceType } from '../../interfaces/canvas'; // Import ServiceType

const nodeTypes = {
  circle: CircleNode,
  earth: EarthNode,
  bigSquare: ContainerNode,
};

const defaultNodes: Node[] = [
  {
    id: '4',
    type: 'earth',
    position: { x: 350, y: 50 },
    draggable: false,
    data: {
      label: 'Internet',
      color: 'rgb(246,133,0)',
      imageSrc: earth,
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
      imageSrc: azureIcon,
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
      imageSrc: gcpIcon,
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
      imageSrc: awsIcon,
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '4', target: '1', animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } },
  { id: 'e2-3', source: '4', target: '2', animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } },
  { id: 'e3-4', source: '4', target: '3', animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } },
];

export default function BasicFlow() {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const { registerAddNodeFunction } = useCanvas(); // Access the function to register node addition

  interface CustomConnection extends Connection {
    animated: boolean;
    type: string;
    style: {
      stroke: string;
      strokeWidth: number;
    };
  }

  const onConnect = (connection: Connection) =>
    setEdges((eds: Edge[]) =>
      addEdge(
        {
          ...connection,
          animated: true,
          type: 'smoothstep',
          style: { stroke: '#555', strokeWidth: 2 },
        } as CustomConnection,
        eds
      )
    );

  const containerLabelMap: Record<string, string> = {
    '1': 'Azure',
    '2': 'GCP',
    '3': 'AWS',
  };

  const iconMap: Record<string, string> = {
    '1': azureIcon,
    '2': gcpIcon,
    '3': awsIcon,
  };

  const getIconForType = (type: ServiceType) => {
    switch (type) {
      case ServiceType.VPC:
        return vpcIcon;
      case ServiceType.Subnet:
        return subnetIcon;
        return earth;
      // Add more cases as needed for other service types
      default:
        return undefined;
    }
  };

  const getColorForCloud = (cloudProvider: string) => {
    switch (cloudProvider) {
      case 'AWS':
        return 'rgb(246,133,0)';
      case 'Azure':
        return 'rgb(67,196,237)';
      case 'GCP':
        return 'rgb(103,155,253)';
      default:
        return '#ccc';
    }
  };

  const handleOtherNodes = (activeId: string, canvasCenterX: number, containerWidth: number) => {
    const horizontalSpacing = 100; // Reduce spacing to bring nodes closer
    const verticalOffset = 150; // Slight vertical adjustment for better positioning
    let leftNodePlaced = false; // Track if the left node has been placed
    console.log(`right ${canvasCenterX + (containerWidth / 2) + horizontalSpacing}`)
    console.log(`left ${canvasCenterX - (containerWidth / 2) - horizontalSpacing}`)



    setNodes((nds: Node[]) =>
      nds.map((n: Node) => {
        if (['1', '2', '3'].includes(n.id) && n.id !== activeId) {
          const newX: number = leftNodePlaced
            ? canvasCenterX + (containerWidth / 2) + horizontalSpacing // Place on the right
            : canvasCenterX - (containerWidth / 2) - horizontalSpacing; // Place on the left
          leftNodePlaced = true; // Mark the left node as placed
          return {
            ...n,
            position: {
              x: newX,
              y: n.position.y + verticalOffset, // Adjust vertically to avoid overlap
            },
          };
        }
        return n;
      })
    );
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (!['1', '2', '3'].includes(node.id) || expandedNodeId === node.id) return;
    setExpandedNodeId(node.id);

    const canvasWidth = reactFlowWrapper.current?.clientWidth || 0; // Dynamically get canvas width
    const containerWidth = canvasWidth * 1.2; // Use 80% of the canvas width for the box

    // Center the expansion box horizontally in the canvas
    const canvasCenterX = canvasWidth / 2;
    const startOfBox = canvasCenterX - containerWidth / 2;

    // Step 1: Replace node with container node
    setNodes((nds: Node[]) =>
      nds.map((n: Node) =>
        n.id === node.id
          ? {
            ...n,
            type: 'bigSquare',
            position: { x: startOfBox, y: n.position.y }, // Only update x value
            data: {
              ...n.data,
              label: containerLabelMap[node.id],
              icon: node.id === '1' ? azureIcon : node.id === '3' ? awsIcon : node.id === '2' ? gcpIcon : n.data.icon,
              color: node.id === '1' ? 'rgb(67,196,237)' : node.id === '2' ? 'rgb(103,155,253)' : n.data.color,
              width: 0,
              height: 0,
            },
          }
          : n.id === '4'
            ? {
              ...n,
              position: { x: canvasCenterX, y: n.position.y - 130 }, // Move Earth node to the middle of the screen in x-axis
            }
            : n
      )
    );

    // Step 2: Expand size
    setTimeout(() => {
      setNodes((nds: Node[]) =>
        nds.map((n: Node) =>
          n.id === node.id
            ? {
              ...n,
              data: {
                ...n.data,
                width: containerWidth,
                height: 1000,
              },
            }
            : n
        )
      );
    }, 10);

    // // Step 3: Add VPC and Subnet nodes
    // setTimeout(() => {
    //   setNodes((nds: Node[]) => [
    //     ...nds,
    //     {
    //       id: `${node.id}-vpc`,
    //       type: 'bigSquare',
    //       position: { x: 100, y: 100 },
    //       data: {
    //         label: node.id === '1' ? 'VNet' : 'VPC', // Use "VNet" for Azure
    //         icon: vpcIcon,
    //         color: node.data.color,
    //         width: 800,
    //         height: 400,
    //       },
    //       parentNode: node.id, // VPC/VNet is a child of the clicked node
    //       extent: 'parent',
    //     } as Node,
    //     {
    //       id: `${node.id}-subnet`,
    //       type: 'bigSquare',
    //       position: { x: 50, y: 50 },
    //       data: {
    //         label: 'Subnet',
    //         icon: subnetIcon,
    //         color: node.data.color,
    //         width: 600,
    //         height: 300,
    //       },
    //       parentNode: `${node.id}-vpc`, // Subnet is a child of the VPC/VNet
    //       extent: 'parent',
    //     } as Node,
    //     {
    //       id: `${node.id}-service-a`,
    //       type: 'circle',
    //       position: { x: 50, y: 60 },
    //       data: {
    //         label: 'Service A',
    //         color: nColor(node.id),
    //         imageSrc: iconMap[node.id],
    //       },
    //       parentNode: `${node.id}-subnet`, // Service A is a child of the Subnet
    //       extent: 'parent',
    //     } as Node,
    //     {
    //       id: `${node.id}-service-b`,
    //       type: 'circle',
    //       position: { x: 160, y: 160 },
    //       data: {
    //         label: 'Service B',
    //         color: nColor(node.id),
    //         imageSrc: iconMap[node.id],
    //       },
    //       parentNode: `${node.id}-subnet`, // Service B is a child of the Subnet
    //       extent: 'parent',
    //     } as Node,
    //   ]);
    // }, 600);

    // Step 4: Move other SCP nodes
    handleOtherNodes(node.id, canvasCenterX, containerWidth);
  };

  const nColor = (id: string) => {
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

  useEffect(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView({ padding: 0.3 });
      reactFlowInstance.current.zoomTo(0.55);
    }
  }, [nodes, edges]);

  useEffect(() => {
    registerAddNodeFunction((service) => {
      setNodes((nds: Node[]) => [
        ...nds,
        {
          id: `${service.name}-${Date.now()}`,
          type: "circle",
          position: { x: 400, y: 300 }, // Adjust position as needed
          data: {
            label: `${service.name} (${service.vpc}, ${service.subnet})`, // Include VPC and subnet in the label
            color: "rgb(246,133,0)", // Example color
            imageSrc: (service.icon.props as { src: string }).src, // Use the service icon
          },
        } as Node,
      ]);
    });
  }, [registerAddNodeFunction, setNodes]);

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const projectId = sessionStorage.getItem('selectedProjectId');
        if (!projectId) return;

        const projectData = await fetchProjectData();

        // Helper functions for sizing
        const VPC_BASE_WIDTH = 800, VPC_BASE_HEIGHT = 400;
        const SUBNET_BASE_WIDTH = 600, SUBNET_BASE_HEIGHT = 300;
        const NODE_BASE_WIDTH = 120, NODE_BASE_HEIGHT = 120;

        // Count VPCs per cloudProvider
        const vpcCounts: Record<string, number> = {};
        projectData.forEach((node: any) => {
          if (node.type === ServiceType.VPC) {
            vpcCounts[node.cloudProvider] = (vpcCounts[node.cloudProvider] || 0) + 1;
          }
        });

        // Count subnets per VPC
        const subnetCounts: Record<string, number> = {};
        projectData.forEach((node: any) => {
          if (node.type === ServiceType.Subnet && node.parentId) {
            subnetCounts[node.parentId] = (subnetCounts[node.parentId] || 0) + 1;
          }
        });

        // Count children per parentId (for other nodes)
        const childCounts: Record<string, number> = {};
        projectData.forEach((node: any) => {
          if (node.parentId) {
            childCounts[node.parentId] = (childCounts[node.parentId] || 0) + 1;
          }
        });

        // Calculate positions for dynamic nodes
        // 1. Group nodes by parentId (or cloudProvider for VPCs)
        const vpcGroups: Record<string, any[]> = {};
        const subnetGroups: Record<string, any[]> = {};
        const childGroups: Record<string, any[]> = {};

        projectData.forEach((node: any) => {
          if (node.type === ServiceType.VPC) {
            if (!vpcGroups[node.cloudProvider]) vpcGroups[node.cloudProvider] = [];
            vpcGroups[node.cloudProvider].push(node);
          } else if (node.type === ServiceType.Subnet) {
            if (!subnetGroups[node.parentId]) subnetGroups[node.parentId] = [];
            subnetGroups[node.parentId].push(node);
          } else if (node.parentId) {
            if (!childGroups[node.parentId]) childGroups[node.parentId] = [];
            childGroups[node.parentId].push(node);
          }
        });

        // Helper to get base position for cloud nodes
        const cloudBasePositions: Record<string, { x: number, y: number }> = {
          '1': { x: 150, y: 250 }, // Azure
          '2': { x: 350, y: 250 }, // GCP
          '3': { x: 550, y: 250 }, // AWS
        };

        // Helper to get VPC node id for parent lookup
        const vpcIdMap: Record<string, string> = {};
        projectData.forEach((node: any) => {
          if (node.type === ServiceType.VPC) {
            vpcIdMap[node._id] = node.cloudProvider;
          }
        });

        const dynamicNodes: Node[] = projectData.map((node: any) => {
          let width = NODE_BASE_WIDTH, height = NODE_BASE_HEIGHT;
          let position = { x: 0, y: 0 };

          if (node.type === ServiceType.VPC) {
            const count = vpcCounts[node.cloudProvider] || 1;
            width = VPC_BASE_WIDTH / count;
            height = VPC_BASE_HEIGHT / count;
            // Position VPCs horizontally under their cloud node
            const group = vpcGroups[node.cloudProvider] || [];
            const idx = group.findIndex((n) => n._id === node._id);
            const base = cloudBasePositions[
              node.cloudProvider === 'Azure' ? '1' :
              node.cloudProvider === 'GCP' ? '2' :
              node.cloudProvider === 'AWS' ? '3' : '1'
            ];
            position = {
              x: base.x + idx * width - ((group.length - 1) * width) / 2,
              y: base.y + 120,
            };
          } else if (node.type === ServiceType.Subnet) {
            const count = subnetCounts[node.parentId] || 1;
            width = SUBNET_BASE_WIDTH / count;
            height = SUBNET_BASE_HEIGHT / count;
            // Position subnets horizontally under their VPC node
            const group = subnetGroups[node.parentId] || [];
            const idx = group.findIndex((n) => n._id === node._id);
            // Find parent VPC node position
            const parentVPCNode = dynamicNodes.find((n) => n.id === node.parentId);
            const parentPos = parentVPCNode?.position || { x: 0, y: 0 };
            position = {
              x: parentPos.x + idx * width - ((group.length - 1) * width) / 2,
              y: parentPos.y + 100,
            };
          } else {
            const count = childCounts[node.parentId] || 1;
            width = NODE_BASE_WIDTH / count;
            height = NODE_BASE_HEIGHT / count;
            // Position other nodes horizontally under their parent
            const group = childGroups[node.parentId] || [];
            const idx = group.findIndex((n) => n._id === node._id);
            // Find parent node position
            const parentNode = dynamicNodes.find((n) => n.id === node.parentId);
            const parentPos = parentNode?.position || { x: 0, y: 0 };
            position = {
              x: parentPos.x + idx * width - ((group.length - 1) * width) / 2,
              y: parentPos.y + 80,
            };
          }

          // Determine parentNode for VPC nodes
          let parentNode = node.parentId;
          if (node.type === ServiceType.VPC) {
            if (node.cloudProvider === 'Azure') parentNode = '1';
            else if (node.cloudProvider === 'GCP') parentNode = '2';
            else if (node.cloudProvider === 'AWS') parentNode = '3';
          }

          return {
            id: node._id,
            type: node.type === ServiceType.VPC || node.type === ServiceType.Subnet ? 'bigSquare' : 'circle',
            position,
            data: {
              label: node.name,
              icon: getIconForType(node.type),
              color: getColorForCloud(node.cloudProvider),
              width,
              height,
            },
            parentNode,
            extent: 'parent', 
          } as Node;
        });

        const dynamicEdges: Edge[] = [];
        projectData
          .filter((node: any) => node.connnectedTo)
          .forEach((node: any) => (
            node.connnectedTo.forEach((connectedNode: string) => {
              dynamicEdges.push({
                id: `${node._id}-${connectedNode}`,
                source: node._id,
                target: connectedNode,
                animated: true,
                type: 'smoothstep',
                style: { stroke: '#555', strokeWidth: 2 },
              })
            })
          ));

        setNodes((nds) => [...defaultNodes, ...dynamicNodes]);
        setEdges((eds) => [...initialEdges, ...dynamicEdges]);
      } catch (error) {
        console.error('Error loading project data:', error);
      }
    };

    loadProjectData();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView={false}
        minZoom={0.1}
        maxZoom={1.5}
        onInit={(instance: ReactFlowInstance) => {
          reactFlowInstance.current = instance;
          instance.fitView({ padding: 0.1 });
          instance.zoomTo(0.55);
        }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
