import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Typography, useTheme, } from "@mui/material";
import { Terminal } from "lucide-react";
export function TerminalCard() {
    const theme = useTheme();
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
    return (_jsxs(Card, { sx: {
            backgroundColor: "#1e1e2f",
            color: "#ffffff",
            fontFamily: "monospace",
            overflow: "hidden",
        }, children: [_jsxs(Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderBottom: "1px solid #333",
                }, children: [_jsxs(Typography, { variant: "subtitle2", sx: { display: "flex", alignItems: "center", gap: 1, color: "#9ca3af" }, children: [_jsx(Terminal, { size: 16 }), " System Logs"] }), _jsxs(Box, { display: "flex", gap: 1, children: [_jsx(Box, { sx: { width: 10, height: 10, bgcolor: "#f87171", borderRadius: "50%" } }), _jsx(Box, { sx: { width: 10, height: 10, bgcolor: "#facc15", borderRadius: "50%" } }), _jsx(Box, { sx: { width: 10, height: 10, bgcolor: "#4ade80", borderRadius: "50%" } })] })] }), _jsxs(CardContent, { sx: { fontSize: "0.8rem", p: 2 }, children: [logs.map((log, index) => (_jsxs(Typography, { sx: { color: getColor(log.type), mb: 0.5 }, children: ["[", log.type.toUpperCase(), "]", ' ', _jsx("span", { style: { color: "#cbd5e1" }, children: log.text })] }, index))), _jsx(Typography, { sx: { color: "#6b7280", mt: 1 }, children: "$ _" })] })] }));
}
//# sourceMappingURL=terminal-card.js.map