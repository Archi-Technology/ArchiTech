import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, Typography, useTheme, Box, Divider, } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, } from "recharts";
const data = [
    { name: "AWS", value: 44, color: "#0070F3" },
    { name: "Azure", value: 33, color: "#7928CA" },
    { name: "GCP", value: 23, color: "#00C7B7" },
];
export function CostDistributionChart() {
    const theme = useTheme();
    return (_jsxs(Card, { sx: {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
        }, children: [_jsx(Box, { sx: {
                    height: 4,
                    background: "linear-gradient(to right, #0070F3, #7928CA, #00C7B7)",
                } }), _jsx(CardHeader, { title: _jsx(Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Cloud Provider Cost Distribution" }), subheader: _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Breakdown of costs by cloud provider" }) }), _jsx(Divider, {}), _jsx(CardContent, { children: _jsx(Box, { sx: { height: 260 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 100, paddingAngle: 2, dataKey: "value", stroke: "#ffffff", strokeWidth: 2, children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => [`${value}%`, "Percentage"], contentStyle: {
                                        backgroundColor: "rgba(255,255,255,0.95)",
                                        borderRadius: 8,
                                        border: `1px solid ${theme.palette.divider}`,
                                        boxShadow: theme.shadows[2],
                                    } }), _jsx(Legend, { verticalAlign: "bottom", height: 36, formatter: (value, entry) => (_jsxs("span", { style: { color: entry.color, fontSize: 13 }, children: [value, " ", entry.payload?.value ?? 0, "%"] })) })] }) }) }) })] }));
}
//# sourceMappingURL=cost-distribution-chart.js.map