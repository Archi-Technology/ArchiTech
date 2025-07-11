// CircleNode.tsx
import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import "./index.css"

const CircleNode = ({ data }: NodeProps) => {
    const { imageSrc, label, color, price } = data;
  
    return (
      <div className="circle-node-wrapper">
        <Handle type="target" position={Position.Top} />
        <div className="circle-node" style={{ backgroundColor: color || '#ccc' }}>
          {imageSrc && <img src={imageSrc} alt="node" className="circle-image" />}
        </div>
        <div className="circle-label">{label}</div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  };
  
  export default CircleNode;