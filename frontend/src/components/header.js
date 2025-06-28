import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, TextField, InputAdornment, IconButton, Badge, Avatar, Paper, useTheme } from "@mui/material";
import { Search, Notifications, AccountCircle } from "@mui/icons-material";
export function Header() {
    const theme = useTheme();
    return (_jsxs(Paper, { elevation: 1, sx: {
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderBottom: `1px solid ${theme.palette.divider}`,
        }, children: [_jsxs(Box, { display: "flex", alignItems: "center", gap: 2, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Resource Status" }), _jsx(Badge, { color: "primary", variant: "standard", sx: {
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: "0.75rem",
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.dark,
                        }, children: "Production" })] }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 2, children: [_jsx(TextField, { placeholder: "Search resources...", size: "small", variant: "outlined", sx: { width: 280 }, InputProps: {
                            startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(Search, { fontSize: "small" }) })),
                        } }), _jsx(IconButton, { color: "default", children: _jsx(Badge, { variant: "dot", color: "primary", children: _jsx(Notifications, {}) }) }), _jsx(IconButton, { children: _jsx(Avatar, { sx: { width: 32, height: 32 }, children: _jsx(AccountCircle, {}) }) })] })] }));
}
//# sourceMappingURL=header.js.map