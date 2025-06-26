"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCard = StatusCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const lucide_react_1 = require("lucide-react");
const services = [
    { name: "API Gateway", status: "operational", lastUpdated: "2 min ago" },
    { name: "Database Cluster", status: "operational", lastUpdated: "5 min ago" },
    { name: "Authentication Service", status: "degraded", lastUpdated: "10 min ago" },
    { name: "Storage Service", status: "maintenance", lastUpdated: "1 hour ago" },
];
function StatusCard() {
    const theme = (0, material_1.useTheme)();
    const getStatusIcon = (status) => {
        switch (status) {
            case "operational":
                return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { size: 18, color: theme.palette.success.main });
            case "degraded":
                return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { size: 18, color: theme.palette.warning.main });
            case "maintenance":
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 18, color: theme.palette.info.main });
            default:
                return null;
        }
    };
    const getStatusChip = (status) => {
        switch (status) {
            case "operational":
                return (0, jsx_runtime_1.jsx)(material_1.Chip, { label: "Operational", size: "small", color: "success" });
            case "degraded":
                return (0, jsx_runtime_1.jsx)(material_1.Chip, { label: "Degraded", size: "small", color: "warning" });
            case "maintenance":
                return (0, jsx_runtime_1.jsx)(material_1.Chip, { label: "Maintenance", size: "small", color: "info" });
            default:
                return null;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, { sx: { backdropFilter: "blur(6px)", bgcolor: "rgba(255,255,255,0.85)" }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: { height: 4, background: "linear-gradient(to right, #4caf50, #ff9800, #2196f3)" } }), (0, jsx_runtime_1.jsx)(material_1.CardHeader, { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Service Status" }), subheader: "Current status of critical services" }), (0, jsx_runtime_1.jsx)(material_1.CardContent, { children: services.map((service, index) => ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: theme.palette.grey[50], borderRadius: 2, border: `1px solid ${theme.palette.divider}`, mb: index < services.length - 1 ? 2 : 0, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 1.5, children: [getStatusIcon(service.status), (0, jsx_runtime_1.jsx)(material_1.Typography, { fontWeight: 500, children: service.name })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 1.5, children: [getStatusChip(service.status), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "text.secondary", children: service.lastUpdated })] })] }, service.name))) })] }));
}
//# sourceMappingURL=status-card.js.map