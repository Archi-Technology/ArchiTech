"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const lucide_react_1 = require("lucide-react");
function Sidebar() {
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            width: 260,
            height: '100vh',
            bgcolor: 'white',
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            zIndex: 10,
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    px: 3,
                    py: 2,
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                            width: 32,
                            height: 32,
                            borderRadius: 2,
                            background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Terminal, { color: "white", size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { fontWeight: 600, color: "primary.dark", children: "ArchiTech" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { flex: 1, py: 3 }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { px: 2, mb: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", fontWeight: 500, color: "text.secondary", mb: 1, children: "INFRASTRUCTURE" }), (0, jsx_runtime_1.jsxs)(material_1.List, { disablePadding: true, children: [(0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Home, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Overview" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { selected: true, children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Resources" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Cloud, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Cloud Services" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Compute" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Database, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Storage" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Security" })] })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { px: 2, mt: 4 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", fontWeight: 500, color: "text.secondary", mb: 1, children: "MANAGEMENT" }), (0, jsx_runtime_1.jsxs)(material_1.List, { disablePadding: true, children: [(0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Activity" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Teams" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemButton, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { size: 18 }) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: "Settings" })] })] })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { p: 2, borderTop: '1px solid #e5e7eb' }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { fullWidth: true, startIcon: (0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircle, { size: 18 }), sx: { justifyContent: 'flex-start' }, children: "Support" }), (0, jsx_runtime_1.jsx)(material_1.Button, { fullWidth: true, startIcon: (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { size: 18 }), sx: { justifyContent: 'flex-start' }, children: "Logout" })] })] }));
}
//# sourceMappingURL=sidebar.js.map