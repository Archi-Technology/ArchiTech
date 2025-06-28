import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, Typography, Box, Chip, useTheme, } from "@mui/material";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
const services = [
    { name: "API Gateway", status: "operational", lastUpdated: "2 min ago" },
    { name: "Database Cluster", status: "operational", lastUpdated: "5 min ago" },
    { name: "Authentication Service", status: "degraded", lastUpdated: "10 min ago" },
    { name: "Storage Service", status: "maintenance", lastUpdated: "1 hour ago" },
];
export function StatusCard() {
    const theme = useTheme();
    const getStatusIcon = (status) => {
        switch (status) {
            case "operational":
                return _jsx(CheckCircle, { size: 18, color: theme.palette.success.main });
            case "degraded":
                return _jsx(AlertCircle, { size: 18, color: theme.palette.warning.main });
            case "maintenance":
                return _jsx(Clock, { size: 18, color: theme.palette.info.main });
            default:
                return null;
        }
    };
    const getStatusChip = (status) => {
        switch (status) {
            case "operational":
                return _jsx(Chip, { label: "Operational", size: "small", color: "success" });
            case "degraded":
                return _jsx(Chip, { label: "Degraded", size: "small", color: "warning" });
            case "maintenance":
                return _jsx(Chip, { label: "Maintenance", size: "small", color: "info" });
            default:
                return null;
        }
    };
    return (_jsxs(Card, { sx: { backdropFilter: "blur(6px)", bgcolor: "rgba(255,255,255,0.85)" }, children: [_jsx(Box, { sx: { height: 4, background: "linear-gradient(to right, #4caf50, #ff9800, #2196f3)" } }), _jsx(CardHeader, { title: _jsx(Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Service Status" }), subheader: "Current status of critical services" }), _jsx(CardContent, { children: services.map((service, index) => (_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: theme.palette.grey[50], borderRadius: 2, border: `1px solid ${theme.palette.divider}`, mb: index < services.length - 1 ? 2 : 0, children: [_jsxs(Box, { display: "flex", alignItems: "center", gap: 1.5, children: [getStatusIcon(service.status), _jsx(Typography, { fontWeight: 500, children: service.name })] }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 1.5, children: [getStatusChip(service.status), _jsx(Typography, { variant: "caption", color: "text.secondary", children: service.lastUpdated })] })] }, service.name))) })] }));
}
//# sourceMappingURL=status-card.js.map