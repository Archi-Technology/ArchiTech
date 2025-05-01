import React from 'react';
import { NodeProps } from 'reactflow';
import azureIcon from '../../../assets/canvas/azure-svgrepo-com.svg'; // Adjust path as needed

const ContainerNode = ({ data }: NodeProps) => {
  const width = data?.width ?? 100;
  const height = data?.height ?? 100;

  return (
    <div
      style={{
        width,
        height,
        border: '3px solid #ccc',
        borderRadius: '24px',
        backgroundColor: 'transparent',
        position: 'relative',
        transition: 'width 0.5s ease, height 0.5s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* Border mask (hides part of the top border) */}
      <div
        style={{
          position: 'absolute',
          top: -10, // overlaps border
          left: 25,
          width: 100,
          height: 24,
          backgroundColor: 'rgb(241,245,249)', // match canvas background
          zIndex: 1,
        }}
      />

      {/* Logo and label on top of the border */}
      <div
        style={{
          position: 'absolute',
          top: -16,
          left: 45,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 2, // above mask
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            backgroundColor: 'rgb(67,196,237)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden', // Ensure the image fits within the circle
          }}
        >
          <img
            src={azureIcon}
            alt="Azure"
            style={{
              width: '16px', 
              height: '16px', 
              objectFit: 'contain',  
            }}
          />
        </div>
        <span style={{ fontWeight: 600, fontSize: 13, color: '#444' }}>Azure</span>
      </div>

      {/* Optional inner label */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: 30,
          fontWeight: 'bold',
        }}
      >
        {data.label}
      </div>
    </div>
  );
};

export default ContainerNode;
