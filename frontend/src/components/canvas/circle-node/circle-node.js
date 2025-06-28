import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from 'reactflow';
import "./index.css";
const CircleNode = ({ data }) => {
    const { imageSrc, label, color, price } = data;
    return (_jsxs("div", { className: "circle-node-wrapper", children: [_jsx(Handle, { type: "target", position: Position.Top }), _jsx("div", { className: "circle-node", style: { backgroundColor: color || '#ccc' }, children: imageSrc && _jsx("img", { src: imageSrc, alt: "node", className: "circle-image" }) }), _jsx("div", { className: "circle-label", children: label }), price && _jsxs("div", { className: "circle-price", style: { color: 'green' }, children: ["$", price] }), _jsx(Handle, { type: "source", position: Position.Bottom })] }));
};
export default CircleNode;
//# sourceMappingURL=circle-node.js.map