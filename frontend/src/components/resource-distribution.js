import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, Typography, Box, useTheme, LinearProgress, } from "@mui/material";
import { Database, Server, Zap, Shield } from "lucide-react";
const resources = [
    { name: "Storage", value: 45, icon: Database, color: "#0070F3" },
    { name: "Compute", value: 30, icon: Server, color: "#7928CA" },
    { name: "Network", value: 15, icon: Zap, color: "#00C7B7" },
    { name: "Security", value: 10, icon: Shield, color: "#009688" },
];
export function ResourceDistribution() {
    const theme = useTheme();
    return (_jsxs(Card, { sx: {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
        }, children: [_jsx(Box, { sx: {
                    height: 4,
                    background: "linear-gradient(to right, #7928CA, #00C7B7, #009688)",
                } }), _jsx(CardHeader, { title: _jsx(Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Resource Distribution" }), subheader: _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Active resources by service type" }) }), _jsx(CardContent, { children: resources.map((resource) => {
                    const Icon = resource.icon;
                    return (_jsxs(Box, { mb: 3, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, children: [_jsxs(Box, { display: "flex", alignItems: "center", gap: 1.5, children: [_jsx(Box, { sx: {
                                                    p: 1,
                                                    borderRadius: 1,
                                                    bgcolor: `${resource.color}22`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }, children: _jsx(Icon, { size: 16, color: resource.color }) }), _jsx(Typography, { fontSize: 14, fontWeight: 500, children: resource.name })] }), _jsxs(Typography, { fontSize: 14, fontWeight: 600, color: "text.primary", children: [resource.value, "%"] })] }), _jsx(LinearProgress, { variant: "determinate", value: resource.value, sx: {
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor: theme.palette.grey[200],
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: resource.color,
                                    },
                                } })] }, resource.name));
                }) })] }));
}
//# sourceMappingURL=resource-distribution.js.map