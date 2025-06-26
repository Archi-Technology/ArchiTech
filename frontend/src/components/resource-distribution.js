"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceDistribution = ResourceDistribution;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const lucide_react_1 = require("lucide-react");
const resources = [
    { name: "Storage", value: 45, icon: lucide_react_1.Database, color: "#0070F3" },
    { name: "Compute", value: 30, icon: lucide_react_1.Server, color: "#7928CA" },
    { name: "Network", value: 15, icon: lucide_react_1.Zap, color: "#00C7B7" },
    { name: "Security", value: 10, icon: lucide_react_1.Shield, color: "#009688" },
];
function ResourceDistribution() {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, { sx: {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    height: 4,
                    background: "linear-gradient(to right, #7928CA, #00C7B7, #009688)",
                } }), (0, jsx_runtime_1.jsx)(material_1.CardHeader, { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Resource Distribution" }), subheader: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "text.secondary", children: "Active resources by service type" }) }), (0, jsx_runtime_1.jsx)(material_1.CardContent, { children: resources.map((resource) => {
                    const Icon = resource.icon;
                    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { mb: 3, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 1.5, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                                    p: 1,
                                                    borderRadius: 1,
                                                    bgcolor: `${resource.color}22`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }, children: (0, jsx_runtime_1.jsx)(Icon, { size: 16, color: resource.color }) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 14, fontWeight: 500, children: resource.name })] }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { fontSize: 14, fontWeight: 600, color: "text.primary", children: [resource.value, "%"] })] }), (0, jsx_runtime_1.jsx)(material_1.LinearProgress, { variant: "determinate", value: resource.value, sx: {
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