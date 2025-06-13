import React, { useCallback, useState, useRef } from "react";
import { CloudAssistantPopup } from "../cloud-assistant";
import CodePanel from "../code-panel";
import DiagramCanvas from "../diagram-canvas";
import NeededAssistantCheck from "../neededAssistantCheck";
import ServiceSidebar from "../service-sidebar";
import './index.scss';
import Chat from "../Chat";

// Define a type for the ref that matches BasicFlowRef
type DiagramCanvasRef = {
  onNodeClick: (event: any, node: any) => void;
  isNodeClicked: (nodeId: string) => boolean;
};

export const Feed: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const canvasRef = useRef<DiagramCanvasRef | null>(null); // Reference to DiagramCanvas

  const openPopup = useCallback(() => {
    setIsPopupOpen(true); 
   } ,[setIsPopupOpen])

   const closePopup = useCallback(() => {
    setIsPopupOpen(false); 
   } ,[setIsPopupOpen])
  
    return (
        <div className="container" >

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

        <div className="aiChatPanel">
          <Chat />
          </div>
      </div>
      {<NeededAssistantCheck openPopup={openPopup}/>}
      {isPopupOpen && <CloudAssistantPopup onClose={closePopup} />}
    </div>
    )
}
