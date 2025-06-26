"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricCard = MetricCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const lucide_react_1 = require("lucide-react");
function MetricCard({ title, value, change, changeType, icon: Icon, color, }) {
    const theme = (0, material_1.useTheme)();
    const changeColors = {
        positive: theme.palette.success.main,
        negative: theme.palette.error.main,
        neutral: theme.palette.text.secondary,
    };
    const ChangeIcon = {
        positive: lucide_react_1.ArrowUpRight,
        negative: lucide_react_1.ArrowDownRight,
        neutral: lucide_react_1.ArrowRight,
    }[changeType];
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, { elevation: 3, sx: {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
            transition: "box-shadow 0.2s",
            "&:hover": { boxShadow: 6 },
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    height: 4,
                    backgroundColor: color,
                } }), (0, jsx_runtime_1.jsxs)(material_1.CardContent, { sx: { p: 3 }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                p: 1.2,
                                borderRadius: 2,
                                backgroundColor: `${color}22`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }, children: (0, jsx_runtime_1.jsx)(Icon, { size: 20, color: color }) }) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle2", color: "text.secondary", children: title }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", fontWeight: 700, color: "primary", gutterBottom: true, children: value }), (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 1, children: [(0, jsx_runtime_1.jsx)(ChangeIcon, { size: 16, color: changeColors[changeType] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: changeColors[changeType], children: change })] })] })] }));
}
//# sourceMappingURL=metric-card.js.map