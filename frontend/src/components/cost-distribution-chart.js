"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostDistributionChart = CostDistributionChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const recharts_1 = require("recharts");
const data = [
    { name: "AWS", value: 44, color: "#0070F3" },
    { name: "Azure", value: 33, color: "#7928CA" },
    { name: "GCP", value: 23, color: "#00C7B7" },
];
function CostDistributionChart() {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, { sx: {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    height: 4,
                    background: "linear-gradient(to right, #0070F3, #7928CA, #00C7B7)",
                } }), (0, jsx_runtime_1.jsx)(material_1.CardHeader, { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontWeight: 600, color: "primary", children: "Cloud Provider Cost Distribution" }), subheader: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "text.secondary", children: "Breakdown of costs by cloud provider" }) }), (0, jsx_runtime_1.jsx)(material_1.Divider, {}), (0, jsx_runtime_1.jsx)(material_1.CardContent, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { height: 260 }, children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: data, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 100, paddingAngle: 2, dataKey: "value", stroke: "#ffffff", strokeWidth: 2, children: data.map((entry, index) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: entry.color }, `cell-${index}`))) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, { formatter: (value) => [`${value}%`, "Percentage"], contentStyle: {
                                        backgroundColor: "rgba(255,255,255,0.95)",
                                        borderRadius: 8,
                                        border: `1px solid ${theme.palette.divider}`,
                                        boxShadow: theme.shadows[2],
                                    } }), (0, jsx_runtime_1.jsx)(recharts_1.Legend, { verticalAlign: "bottom", height: 36, formatter: (value, entry) => ((0, jsx_runtime_1.jsxs)("span", { style: { color: entry.color, fontSize: 13 }, children: [value, " ", entry.payload?.value ?? 0, "%"] })) })] }) }) }) })] }));
}
//# sourceMappingURL=cost-distribution-chart.js.map