// BigSquareNode.tsx
import React from 'react';
import { NodeProps } from 'reactflow';

const ContainerNode = ({ data }: NodeProps) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      border: '2px solid #00aaff',
      borderRadius: '8px',
      backgroundColor: '#daf4ff',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 10,
      fontWeight: 'bold',
    }}>
      {data.label}
    </div>
  );
};

export default ContainerNode;