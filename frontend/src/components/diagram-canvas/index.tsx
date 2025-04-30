
import ContainerNode from '../canvas/container/container-node';
import React, { useState } from 'react';
import './index.scss';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CircleNode from '../canvas/circle-node/circle-node';
import azureIcon from '../../assets/canvas/azure-svgrepo-com.svg';
import gcpIcon from '../../assets/canvas/gcp-svgrepo-com.svg';
import awsIcon from '../../assets/canvas/aws-svgrepo-com.svg';
import earth from '../../assets/canvas/planet-earth.svg';
import EarthNode from '../canvas/earth/earth';

const nodeTypes = {
  circle: CircleNode,
  earth: EarthNode,
  bigSquare: ContainerNode,
};

// Default nodes before expansion
const defaultNodes: Node[] = [
  {
    id: '1',
    type: 'circle',
    position: { x: 100, y: 100 },
    data: {
      label: 'Azure',
      color: 'rgb(67,196,237)',
      imageSrc: azureIcon,
    },
  },
  {
    id: '2',
    type: 'circle',
    position: { x: 300, y: 100 },
    data: {
      label: 'GCP',
      color: 'rgb(103,155,253)',
      imageSrc: gcpIcon,
    },
  },
  {
    id: '3',
    type: 'circle',
    position: { x: 200, y: 300 },
    data: {
      label: 'AWS',
      color: 'rgb(246,133,0)',
      imageSrc: awsIcon,
    },
  },
  {
    id: '4',
    type: 'earth',
    position: { x: 400, y: 500 },
    data: {
      label: 'Internet',
      color: 'rgb(246,133,0)',
      imageSrc: earth,
    },
  },
];

// Expanded Azure node with internal children
const expandedAzureNodes: Node[] = [
  {
    id: '1',
    type: 'bigSquare',
    position: { x: 100, y: 100 },
    data: { label: 'Azure Group' },
    style: {
      width: 300,
      height: 300,
    },
  },
  {
    id: '1-1',
    type: 'circle',
    position: { x: 50, y: 60 },
    data: {
      label: 'Service A',
      color: 'rgb(67,196,237)',
      imageSrc: azureIcon,
    },
    parentNode: '1',
    extent: 'parent',
  },
  {
    id: '1-2',
    type: 'circle',
    position: { x: 160, y: 160 },
    data: {
      label: 'Service B',
      color: 'rgb(67,196,237)',
      imageSrc: azureIcon,
    },
    parentNode: '1',
    extent: 'parent',
  },
  {
    id: '2',
    type: 'circle',
    position: { x: 450, y: 100 },
    data: {
      label: 'GCP',
      color: 'rgb(103,155,253)',
      imageSrc: gcpIcon,
    },
  },
  {
    id: '3',
    type: 'circle',
    position: { x: 350, y: 300 },
    data: {
      label: 'AWS',
      color: 'rgb(246,133,0)',
      imageSrc: awsIcon,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '4',
    target: '1',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#555', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '4',
    target: '2',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#555', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '4',
    target: '3',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#555', strokeWidth: 2 },
  },
];

export default function BasicFlow() {
  const [expanded, setExpanded] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (connection: Connection) =>
    setEdges((eds) =>
      addEdge({ ...connection, animated: true, type: 'smoothstep', style: { stroke: '#555', strokeWidth: 2 } }, eds)
    );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.id === '1' && !expanded) {
      setExpanded(true);
      setNodes(expandedAzureNodes);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        defaultViewport={{ x: 0, y: 0, zoom: 0.3 }}
        fitView={false}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}


