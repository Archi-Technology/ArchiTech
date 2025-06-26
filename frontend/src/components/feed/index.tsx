'use client';

import type React from 'react';
import { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { CloudAssistantPopup } from '../cloud-assistant';
import CodePanel from '../code-panel';
import DiagramCanvas from '../diagram-canvas';
import NeededAssistantCheck from '../neededAssistantCheck';
import ServiceSidebar from '../service-sidebar';
import Chat from '../Chat';
import './index.scss';

// Define a type for the ref that matches BasicFlowRef
type DiagramCanvasRef = {
  onNodeClick: (event: any, node: any) => void;
  isNodeClicked: (nodeId: string) => boolean;
};

export const Feed: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const canvasRef = useRef<DiagramCanvasRef | null>(null);
  const navigate = useNavigate();

  const openPopup = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  return (
    <div className="container">
      {/* כפתור מעבר לדשבורד */}
      <Box p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Box>

      {/* Main content area */}
      <div className="mainContent">
        {/* Left sidebar with services */}
        <ServiceSidebar canvasRef={canvasRef} />

        {/* Main diagram canvas */}
        <div className="canvasContainer">
          <DiagramCanvas ref={canvasRef} />
        </div>

        {/* Right code panel */}
        <div className="codePanel">
          <CodePanel />
        </div>
      </div>
      {/* Chat positioned at bottom right */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1300
      }}>
        <Chat />
      </div>


      <NeededAssistantCheck openPopup={openPopup} />
      {isPopupOpen && <CloudAssistantPopup onClose={closePopup} />}
    </div>
  );
};
