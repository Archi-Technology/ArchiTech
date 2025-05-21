import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

const ContainerNode = ({ data, title = "Azure", icon }: NodeProps & { title?: string; icon?: string }) => {
  const width = data?.width ?? 100;
  const height = data?.height ?? 100;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '3px solid #ccc',
        borderRadius: '24px',
        backgroundColor: 'transparent',
        position: 'relative',
        transition: 'width 0.5s ease, height 0.5s ease',
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      {/* Top handle for incoming edges */}
      <Handle type="target" position={Position.Top} style={{ left: '50%', transform: 'translateX(-50%)' }} />

      {/* Border mask (to hide top border segment) */}
      <div
        style={{
          position: 'absolute',
          top: -10,
          left: 25,
          width: 100,
          height: 24,
          backgroundColor: 'rgb(241,245,249)',
          zIndex: 1,
        }}
      />

      {/* Logo + Label */}
      <div
        style={{
          position: 'absolute',
          top: -16,
          left: 45,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            backgroundColor: data.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={data.icon}
            alt={title}
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'contain',
            }}
          />
        </div>
        <span style={{ fontWeight: 600, fontSize: 13, color: '#444' }}>
          {data.label}
        </span>
      </div>

      {/* Inner label */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: 30,
          fontWeight: 'bold',
        }}
      >
      
      </div>
    </div>
  );
};

export default ContainerNode;
