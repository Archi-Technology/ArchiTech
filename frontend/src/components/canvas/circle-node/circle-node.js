"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const reactflow_1 = require("reactflow");
require("./index.css");
const CircleNode = ({ data }) => {
    const { imageSrc, label, color, price } = data;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "circle-node-wrapper", children: [(0, jsx_runtime_1.jsx)(reactflow_1.Handle, { type: "target", position: reactflow_1.Position.Top }), (0, jsx_runtime_1.jsx)("div", { className: "circle-node", style: { backgroundColor: color || '#ccc' }, children: imageSrc && (0, jsx_runtime_1.jsx)("img", { src: imageSrc, alt: "node", className: "circle-image" }) }), (0, jsx_runtime_1.jsx)("div", { className: "circle-label", children: label }), price && (0, jsx_runtime_1.jsxs)("div", { className: "circle-price", style: { color: 'green' }, children: ["$", price] }), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { type: "source", position: reactflow_1.Position.Bottom })] }));
};
exports.default = CircleNode;
//# sourceMappingURL=circle-node.js.map