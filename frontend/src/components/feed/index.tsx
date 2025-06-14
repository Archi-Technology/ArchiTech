import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

import { CloudAssistantPopup } from "../cloud-assistant";
import CodePanel from "../code-panel";
import DiagramCanvas from "../diagram-canvas";
import NeededAssistantCheck from "../neededAssistantCheck";
import ServiceSidebar from "../service-sidebar";
import Chat from "../Chat";
import "./index.scss";

export const Feed: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
        <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </Box>

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

      <NeededAssistantCheck openPopup={openPopup} />
      {isPopupOpen && <CloudAssistantPopup onClose={closePopup} />}
    </div>
  );
};
