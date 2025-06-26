"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
function Header() {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 1, sx: {
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderBottom: `1px solid ${theme.palette.divider}`,
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Resource Status" }), (0, jsx_runtime_1.jsx)(material_1.Badge, { color: "primary", variant: "standard", sx: {
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: "0.75rem",
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.dark,
                        }, children: "Production" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 2, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { placeholder: "Search resources...", size: "small", variant: "outlined", sx: { width: 280 }, InputProps: {
                            startAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "start", children: (0, jsx_runtime_1.jsx)(icons_material_1.Search, { fontSize: "small" }) })),
                        } }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { color: "default", children: (0, jsx_runtime_1.jsx)(material_1.Badge, { variant: "dot", color: "primary", children: (0, jsx_runtime_1.jsx)(icons_material_1.Notifications, {}) }) }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { children: (0, jsx_runtime_1.jsx)(material_1.Avatar, { sx: { width: 32, height: 32 }, children: (0, jsx_runtime_1.jsx)(icons_material_1.AccountCircle, {}) }) })] })] }));
}
//# sourceMappingURL=header.js.map