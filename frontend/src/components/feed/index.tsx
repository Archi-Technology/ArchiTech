import React, { useCallback, useState } from "react";
import { CloudAssistantPopup } from "../cloud-assistant";
import CodePanel from "../code-panel";
import DiagramCanvas from "../diagram-canvas";
import NeededAssistantCheck from "../neededAssistantCheck";
import ServiceSidebar from "../service-sidebar";
import './index.scss';


export const Feed: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <ServiceSidebar />

        {/* Main diagram canvas */}
        <div className="canvasContainer">
          <DiagramCanvas />
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
