import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { CloudAssistantPopup } from "../cloud-assistant";
import CodePanel from "../code-panel";
import DiagramCanvas from "../diagram-canvas";
import NeededAssistantCheck from "../neededAssistantCheck";
import ServiceSidebar from "../service-sidebar";
import Chat from "../Chat";
import "./index.scss";
export const Feed = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const openPopup = useCallback(() => {
        setIsPopupOpen(true);
    }, []);
    const closePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, []);
    return (_jsxs("div", { className: "container", children: [_jsx(Box, { p: 2, children: _jsx(Button, { variant: "contained", color: "primary", onClick: () => navigate("/dashboard"), children: "Go to Dashboard" }) }), _jsxs("div", { className: "mainContent", children: [_jsx(ServiceSidebar, { canvasRef: canvasRef }), _jsx("div", { className: "canvasContainer", children: _jsx(DiagramCanvas, { ref: canvasRef }) }), _jsx("div", { className: "codePanel", children: _jsx(CodePanel, {}) }), _jsx("div", { className: "aiChatPanel", children: _jsx(Chat, {}) })] }), _jsx(NeededAssistantCheck, { openPopup: openPopup }), isPopupOpen && _jsx(CloudAssistantPopup, { onClose: closePopup })] }));
};
//# sourceMappingURL=index.js.map