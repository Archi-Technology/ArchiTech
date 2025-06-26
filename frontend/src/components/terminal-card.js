"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalCard = TerminalCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const lucide_react_1 = require("lucide-react");
function TerminalCard() {
    const theme = (0, material_1.useTheme)();
    const logs = [
        { type: "info", text: "System initialized" },
        { type: "load", text: "Loading resources from AWS region us-east-1" },
        { type: "load", text: "Loading resources from Azure West US" },
        { type: "warn", text: "High CPU usage detected on instance i-0123456789" },
        { type: "info", text: "Auto-scaling group triggered" },
        { type: "load", text: "Loading resources from GCP us-central1" },
        { type: "info", text: "All resources loaded successfully" },
    ];
    const getColor = (type) => {
        switch (type) {
            case "info":
                return "#4caf50";
            case "load":
                return "#2196f3";
            case "warn":
                return "#ff9800";
            default:
                return "#e0e0e0";
        }
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, { sx: {
            backgroundColor: "#1e1e2f",
            color: "#ffffff",
            fontFamily: "monospace",
            overflow: "hidden",
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderBottom: "1px solid #333",
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "subtitle2", sx: { display: "flex", alignItems: "center", gap: 1, color: "#9ca3af" }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Terminal, { size: 16 }), " System Logs"] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", gap: 1, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: 10, height: 10, bgcolor: "#f87171", borderRadius: "50%" } }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: 10, height: 10, bgcolor: "#facc15", borderRadius: "50%" } }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: 10, height: 10, bgcolor: "#4ade80", borderRadius: "50%" } })] })] }), (0, jsx_runtime_1.jsxs)(material_1.CardContent, { sx: { fontSize: "0.8rem", p: 2 }, children: [logs.map((log, index) => ((0, jsx_runtime_1.jsxs)(material_1.Typography, { sx: { color: getColor(log.type), mb: 0.5 }, children: ["[", log.type.toUpperCase(), "]", ' ', (0, jsx_runtime_1.jsx)("span", { style: { color: "#cbd5e1" }, children: log.text })] }, index))), (0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { color: "#6b7280", mt: 1 }, children: "$ _" })] })] }));
}
//# sourceMappingURL=terminal-card.js.map