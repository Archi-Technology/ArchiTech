import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
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
import vmIcon from '../../assets/canvas/vm-svgrepo-com.svg';
import bucketIcon from '../../assets/canvas/bucket-svgrepo-com.svg';
import subnetIcon from '../../assets/canvas/network-wired-svgrepo-com.svg';
import databaseIcon from '../../assets/canvas/database-svgrepo-com.svg';
import { ContactlessOutlined } from '@mui/icons-material';
import { useCanvas } from "../../contexts/canvasContext"; // Import canvas context
import { fetchProjectData } from '../../services/canvasService'; // Import fetchProjectData
import { IBaseService } from '../../interfaces/canvas'; // Import ServiceType
import { useTerraform } from '../../contexts/terraformContext';
import { generateTerraform } from '../../services/resourceService';
import { ServiceType } from '../service-popup';

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

const BasicFlow = forwardRef((_, ref) => {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    defaultNodes.map((node) => ({ ...node, draggable: false })) // Make all nodes undraggable
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const {updateTerraformCode, setLoading} = useTerraform(); // Access the Terraform context to update code
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const { registerAddNodeFunction } = useCanvas(); // Access the function to register node addition
  const [openNodes, setOpenNodes] = useState<string[]>([]); // State for clicked nodes

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
    'AZURE': '1',
    'GCP': '2',
    'AWS': '3',
  };

  const containerLabelMapReverse: Record<string, string> = {
    '1': 'AZURE',
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
      case ServiceType.SUBNET:
        return subnetIcon;
      case ServiceType.VM:
        return vmIcon;
      case ServiceType.OBJECT_STORAGE:
        return bucketIcon;
      case ServiceType.DATABASE:
        return databaseIcon;

      default:
        return vpcIcon;
    }
  };

  const getColorForCloud = (cloudProvider: string) => {
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



  const onNodeClick = async (_: React.MouseEvent, node: Node) => {
    // Ensure the node remains undraggable
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, draggable: false } : n
      )
    );

    const nodeId = node.id;
    console.log('Node clicked:', nodeId);
    const canvasWidth = reactFlowWrapper.current?.clientWidth || 0;
    const canvasCenterX = canvasWidth / 2;
    const cloudBoxWidth = canvasWidth * 0.8;
    const cloudBoxHeight = 700;
    const startOfBox = canvasCenterX - cloudBoxWidth / 2;

    if (!['1', '2', '3'].includes(nodeId)) {
      if(node.id === '4') return
      setLoading(true);
      const terraformCode = await generateTerraform(nodeId);
      updateTerraformCode(terraformCode);
      setLoading(false);
    } else {

    const projectId = sessionStorage.getItem('selectedProjectId');
    console.log('canvas diagram Project ID:', projectId);
    if (!projectId) return;

    const projectData = await fetchProjectData();

    const hasChildren = projectData.some((item: any) => item.cloudProvider === containerLabelMapReverse[nodeId]);

    let newOpenNodes = [...openNodes];

    if (openNodes.includes(nodeId)) {
      // Close the node
      // newOpenNodes = newOpenNodes.filter((id) => id !== nodeId);
      // setExpandedNodeId(null);
    } else {
      // Open the node only if it has children
      if (hasChildren) {
        newOpenNodes = [...openNodes, nodeId];
        setExpandedNodeId(nodeId);
      } else {
        // alert('Please Add resoruce to ' + containerLabelMapReverse[nodeId]);
        return; // Don't expand if no children
      }
    }

    setOpenNodes(newOpenNodes);

    // Count VPCs per cloudProvider
    const vpcCounts: Record<string, number> = {};
    const bucketsCount: Record<string, number> = {};
    const subnetCounts: Record<string, number> = {};
    const childCounts: Record<string, number> = {};

    projectData.forEach((node: any) => {
      if (node.type === ServiceType.VPC) {
        vpcCounts[node.cloudProvider] = (vpcCounts[node.cloudProvider] || 0) + 1;
      }
      if (node.type === ServiceType.OBJECT_STORAGE) {
        bucketsCount[node.cloudProvider] = (bucketsCount[node.cloudProvider] || 0) + 1;
      }

      if (node.type === ServiceType.SUBNET && node.parentId) {
        subnetCounts[node.parentId] = (subnetCounts[node.parentId] || 0) + 1;
      }

      if (node.parentId) {
        childCounts[node.parentId] = (childCounts[node.parentId] || 0) + 1;
      }
    });


    // Calculate positions for dynamic nodes
    // 1. Group nodes by parentId (or cloudProvider for VPCs)
    const vpcGroups: Record<string, any[]> = {};
    const bucketsGroups: Record<string, any[]> = {};
    const subnetGroups: Record<string, any[]> = {};
    const childGroups: Record<string, any[]> = {};

    projectData.forEach((node: any) => {
      if (node.type === ServiceType.VPC) {
        if (!vpcGroups[node.cloudProvider]) vpcGroups[node.cloudProvider] = [];
        vpcGroups[node.cloudProvider].push(node);
      } else if (node.type === ServiceType.SUBNET) {
        if (!subnetGroups[node.parentId]) subnetGroups[node.parentId] = [];
        subnetGroups[node.parentId].push(node);
      } else if (node.type === ServiceType.OBJECT_STORAGE) {
        if (!bucketsGroups[node.cloudProvider]) bucketsGroups[node.cloudProvider] = [];
        bucketsGroups[node.cloudProvider].push(node);
      } else if (node.parentId) {
        if (!childGroups[node.parentId]) childGroups[node.parentId] = [];
        childGroups[node.parentId].push(node);
      }
    });



    // Helper to get base position for cloud nodes
    const cloudBasePositions: Record<string, { x: number, y: number }> = {
      '1': { x: startOfBox, y: 250 }, // Azure
      '2': { x: startOfBox, y: 250 }, // GCP
      '3': { x: startOfBox, y: 250 }, // AWS
    };

    // Helper to get VPC node id for parent lookup
    const vpcIdMap: Record<string, string> = {};
    projectData.forEach((node: any) => {
      if (node.type === ServiceType.VPC) {
        vpcIdMap[node._id] = node.cloudProvider;
      }
    });

    // first loop changes all IbaseService nodes to Node and places vpcs and buckets, second loop changes subnets, third changes children of subnets
    let dynamicNodes: Node[] = [];
    projectData.forEach((node: IBaseService) => {

      if (newOpenNodes.includes(containerLabelMap[node.cloudProvider])) {
        let width = 0, height = 0;
        let position = { x: 0, y: 0 };

        if (node.type === ServiceType.VPC) {
          const count = vpcCounts[node.cloudProvider] || 1;
          if (bucketsCount[node.cloudProvider] >= 1) {
            width = cloudBoxWidth / count - 10 - (150 / count);

          } else {
            width = cloudBoxWidth / count - 10;
          }

          height = cloudBoxHeight - 45;

          // Position VPCs horizontally under their cloud node
          const group = vpcGroups[node.cloudProvider] || [];
          const idx = group.findIndex((n) => n._id === node._id);
          const base = cloudBasePositions[
            node.cloudProvider === 'AZURE' ? '1' :
              node.cloudProvider === 'GCP' ? '2' :
                node.cloudProvider === 'AWS' ? '3' : '1'
          ];

          position = {
            x: idx * width + 10,
            y: 35,
          };

          let parentNode = node.parentId;
          if (node.type === ServiceType.VPC as unknown as string) {
            if (node.cloudProvider === 'AZURE') parentNode = '1';
            else if (node.cloudProvider === 'GCP') parentNode = '2';
            else if (node.cloudProvider === 'AWS') parentNode = '3';
          }

          dynamicNodes.push(
            {
              id: node._id,
              type: node.type === ServiceType.VPC || node.type === ServiceType.SUBNET ? 'bigSquare' : 'circle',
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
            } as Node);

        } else if (node.type !== ServiceType.OBJECT_STORAGE) {

          let parentNode = node.parentId;

          dynamicNodes.push({
            id: node._id,
            type: node.type === ServiceType.SUBNET ? 'bigSquare' : 'circle',
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
          } as Node);
        } else {
          // it is a bucket
          let parentNode = node.parentId;
          const group = bucketsGroups[node.cloudProvider] || [];
          width = 100;
          height = 100;
          const idx = group.findIndex((n) => n._id === node._id);
          if (vpcCounts[node.cloudProvider] >= 1) {
            if (group.length >= 2) {
              position = { x: cloudBoxWidth - 125, y: (cloudBoxHeight / 5) * (2 * idx + 2) - height };
            } else {
              position = { x: cloudBoxWidth - 125, y: (cloudBoxHeight / 2) - height / 2 };
            }
          } else {
            if (group.length >= 2) {
              position = { x: cloudBoxWidth / 2 - width / 2, y: (cloudBoxHeight / 5) * (2 * idx + 2) - height };
            } else {
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
          } as Node);



        }
      }
    });



    dynamicNodes = dynamicNodes.map((node: Node) => ({
      ...node,
      draggable: false, // Ensure all dynamic nodes are undraggable
    }));


    dynamicNodes = dynamicNodes.map((node: Node) => {

      if (node.type === 'bigSquare' && node.position.x === 0) {

        let width = 0, height = 0;
        let position = { x: 0, y: 0 };

        // Find parent VPC node
        const parentVPCNode = projectData.find((n: any) => n._id === node.parentNode);
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

        } as Node;
      } else {
        return node;
      }
    })


    dynamicNodes = dynamicNodes.map((node: Node) => {
      if (node.type !== 'bigSquare' && node.data.icon !== getIconForType(ServiceType.OBJECT_STORAGE)) {
        let width = 0, height = 0;
        let position = { x: 0, y: 0 };

        // Find parent VPC node
        const parentSubnetNode = projectData.find((n: any) => n._id === node.parentNode);
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
        } else {
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
        }
      }
      else {
        return node;
      }


    })

    const dynamicEdges: Edge[] = [];
    projectData
      .filter((node: any) => node.connectedTo)
      .forEach((node: any) => (
        node.connectedTo.forEach((connectedNode: string) => {
          dynamicEdges.push({
            id: `${node._id}-${connectedNode}`,
            source: node._id,
            target: connectedNode,
            animated: true,
            type: 'smoothstep',
            style: { stroke: 'purple', strokeWidth: 2 },
          })
        })
      ));


    setNodes((nds) => [...defaultNodes, ...dynamicNodes]);
    setEdges((eds) => [...initialEdges, ...dynamicEdges]);


    // cloud nodes placement and sizing
    setNodes((nds: Node[]) =>
      nds.map((n: Node) => {
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
            } else {
              const closedNodes = ['1', '2', '3'].filter(id => !newOpenNodes.includes(id));
              position = closedNodes[0] === n.id ? { x: canvasCenterX + cloudBoxWidth / 2 + 100, y: 250 } : { x: canvasCenterX - cloudBoxWidth / 2 - 200, y: 250 };
            }

          } else if (newOpenNodes.length === 2) {
            // Place the open nodes side by side
            if (n.id === newOpenNodes[0]) {
              position = { x: canvasCenterX / 2 - cloudBoxWidth / 2, y: 100 };
            } else if (n.id === newOpenNodes[1]) {
              position = { x: canvasCenterX + cloudBoxWidth / 2, y: 100 };
            } else {
              // Position the closed node below
              position = { x: canvasCenterX + cloudBoxWidth / 4 + 50, y: 900 };

            }
          } else if (newOpenNodes.length === 3) {
            // Place the first two open nodes side by side at the top, and the third one below them
            if (n.id === newOpenNodes[0]) {
              position = { x: canvasCenterX / 2 - cloudBoxWidth / 2, y: 100 };
            } else if (n.id === newOpenNodes[1]) {
              position = { x: canvasCenterX + cloudBoxWidth / 2, y: 100 };
            } else if (n.id === newOpenNodes[2]) {
              position = { x: canvasCenterX - cloudBoxWidth / 8 - 24, y: 900 };
            }
          } else {
            position = { x: 150 + parseInt(n.id) * 100, y: 250 };
          }

          let icon: string | undefined, label: string | undefined, color: string | undefined;
          if (n.id === '1') {
            icon = azureIcon;
            label = 'Azure';
            color = 'rgb(67,196,237)';
          } else if (n.id === '2') {
            icon = gcpIcon;
            label = 'GCP';
            color = 'rgb(103,155,253)';
          } else {
            icon = awsIcon;
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
          } else {
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
      })
    );

    // Step 2: Expand size
    setTimeout(() => {
      setNodes((nds: Node[]) =>
        nds.map((n: Node) =>
          newOpenNodes.includes(n.id)
            ? {
              ...n,
              data: {
                ...n.data,
                width: cloudBoxWidth,
                height: cloudBoxHeight,
              },
            }
            : n
        )
      );

      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView({ padding: 0.2 });
        // reactFlowInstance.current.zoomTo(0.35);
      }
    }, 10);

  }
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
      reactFlowInstance.current.fitView({ padding: 0.2 });
      reactFlowInstance.current.zoomTo(0.50);
    }
  }, [nodes, edges]);


  const isNodeClicked = (nodeId: string) => {
    return openNodes.includes(nodeId); // Check if the node is already clicked
  };

  useImperativeHandle(ref, () => ({
    onNodeClick,
    isNodeClicked, // Expose the method
  }));

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
});

export default BasicFlow;


