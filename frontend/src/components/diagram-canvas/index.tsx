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
import { ContactlessOutlined } from '@mui/icons-material';
import { useCanvas } from "../../contexts/canvasContext"; // Import canvas context

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
    '1': 'Azure Group',
    '2': 'GCP Group',
    '3': 'AWS Group',
  };

  const iconMap: Record<string, string> = {
    '1': azureIcon,
    '2': gcpIcon,
    '3': awsIcon,
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

    // Step 3: Add VPC and Subnet nodes
    setTimeout(() => {
      setNodes((nds: Node[]) => [
        ...nds,
        {
          id: `${node.id}-vpc`,
          type: 'bigSquare',
          position: { x: 100, y: 100 },
          data: {
        label: 'VPC',
        width: 800,
        height: 400,
          },
          parentNode: node.id, // VPC is a child of the clicked node
          extent: 'parent',
        } as Node,
        {
          id: `${node.id}-subnet`,
          type: 'bigSquare',
          position: { x: 50, y: 50 },
          data: {
        label: 'Subnet',
        width: 600,
        height: 300,
          },
          parentNode: `${node.id}-vpc`, // Subnet is a child of the VPC
          extent: 'parent',
        } as Node,
        {
          id: `${node.id}-service-a`,
          type: 'circle',
          position: { x: 50, y: 60 },
          data: {
        label: 'Service A',
        color: nColor(node.id),
        imageSrc: iconMap[node.id],
          },
          parentNode: `${node.id}-subnet`, // Service A is a child of the Subnet
          extent: 'parent',
        } as Node,
        {
          id: `${node.id}-service-b`,
          type: 'circle',
          position: { x: 160, y: 160 },
          data: {
        label: 'Service B',
        color: nColor(node.id),
        imageSrc: iconMap[node.id],
          },
          parentNode: `${node.id}-subnet`, // Service B is a child of the Subnet
          extent: 'parent',
        } as Node,
      ]);
    }, 600);

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
