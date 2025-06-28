import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Home, BarChart3, Database, Settings, Activity, Users, HelpCircle, LogOut, Cpu, Cloud, Terminal, Shield, } from 'lucide-react';
export function Sidebar() {
    return (_jsxs(Box, { sx: {
            width: 260,
            height: '100vh',
            bgcolor: 'white',
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            zIndex: 10,
        }, children: [_jsxs(Box, { sx: {
                    px: 3,
                    py: 2,
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }, children: [_jsx(Box, { sx: {
                            width: 32,
                            height: 32,
                            borderRadius: 2,
                            background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: _jsx(Terminal, { color: "white", size: 18 }) }), _jsx(Typography, { fontWeight: 600, color: "primary.dark", children: "ArchiTech" })] }), _jsxs(Box, { sx: { flex: 1, py: 3 }, children: [_jsxs(Box, { sx: { px: 2, mb: 2 }, children: [_jsx(Typography, { variant: "caption", fontWeight: 500, color: "text.secondary", mb: 1, children: "INFRASTRUCTURE" }), _jsxs(List, { disablePadding: true, children: [_jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Home, { size: 18 }) }), _jsx(ListItemText, { primary: "Overview" })] }), _jsxs(ListItemButton, { selected: true, children: [_jsx(ListItemIcon, { children: _jsx(BarChart3, { size: 18 }) }), _jsx(ListItemText, { primary: "Resources" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Cloud, { size: 18 }) }), _jsx(ListItemText, { primary: "Cloud Services" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Cpu, { size: 18 }) }), _jsx(ListItemText, { primary: "Compute" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Database, { size: 18 }) }), _jsx(ListItemText, { primary: "Storage" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Shield, { size: 18 }) }), _jsx(ListItemText, { primary: "Security" })] })] })] }), _jsxs(Box, { sx: { px: 2, mt: 4 }, children: [_jsx(Typography, { variant: "caption", fontWeight: 500, color: "text.secondary", mb: 1, children: "MANAGEMENT" }), _jsxs(List, { disablePadding: true, children: [_jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Activity, { size: 18 }) }), _jsx(ListItemText, { primary: "Activity" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Users, { size: 18 }) }), _jsx(ListItemText, { primary: "Teams" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(Settings, { size: 18 }) }), _jsx(ListItemText, { primary: "Settings" })] })] })] })] }), _jsxs(Box, { sx: { p: 2, borderTop: '1px solid #e5e7eb' }, children: [_jsx(Button, { fullWidth: true, startIcon: _jsx(HelpCircle, { size: 18 }), sx: { justifyContent: 'flex-start' }, children: "Support" }), _jsx(Button, { fullWidth: true, startIcon: _jsx(LogOut, { size: 18 }), sx: { justifyContent: 'flex-start' }, children: "Logout" })] })] }));
}
//# sourceMappingURL=sidebar.js.map