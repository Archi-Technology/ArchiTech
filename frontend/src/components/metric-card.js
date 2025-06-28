import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box, useTheme, } from "@mui/material";
import { ArrowUpRight, ArrowDownRight, ArrowRight, } from "lucide-react";
export function MetricCard({ title, value, change, changeType, icon: Icon, color, }) {
    const theme = useTheme();
    const changeColors = {
        positive: theme.palette.success.main,
        negative: theme.palette.error.main,
        neutral: theme.palette.text.secondary,
    };
    const ChangeIcon = {
        positive: ArrowUpRight,
        negative: ArrowDownRight,
        neutral: ArrowRight,
    }[changeType];
    return (_jsxs(Card, { elevation: 3, sx: {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
            transition: "box-shadow 0.2s",
            "&:hover": { boxShadow: 6 },
        }, children: [_jsx(Box, { sx: {
                    height: 4,
                    backgroundColor: color,
                } }), _jsxs(CardContent, { sx: { p: 3 }, children: [_jsx(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, children: _jsx(Box, { sx: {
                                p: 1.2,
                                borderRadius: 2,
                                backgroundColor: `${color}22`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }, children: _jsx(Icon, { size: 20, color: color }) }) }), _jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: title }), _jsx(Typography, { variant: "h5", fontWeight: 700, color: "primary", gutterBottom: true, children: value }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 1, children: [_jsx(ChangeIcon, { size: 16, color: changeColors[changeType] }), _jsx(Typography, { variant: "body2", color: changeColors[changeType], children: change })] })] })] }));
}
//# sourceMappingURL=metric-card.js.map