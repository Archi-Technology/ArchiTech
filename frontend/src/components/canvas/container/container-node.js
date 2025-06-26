"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const reactflow_1 = require("reactflow");
const ContainerNode = ({ data, title = "Azure", icon }) => {
    const width = data?.width ?? 100;
    const height = data?.height ?? 100;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: `${width}px`,
            height: `${height}px`,
            border: '3px solid #ccc',
            borderRadius: '24px',
            backgroundColor: 'transparent',
            position: 'relative',
            transition: 'width 0.5s ease, height 0.5s ease',
            boxSizing: 'border-box',
            overflow: 'visible',
        }, children: [(0, jsx_runtime_1.jsx)(reactflow_1.Handle, { type: "target", position: reactflow_1.Position.Top, style: { left: '50%', transform: 'translateX(-50%)' } }), (0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'absolute',
                    top: -10,
                    left: 25,
                    width: 100,
                    height: 24,
                    backgroundColor: 'rgb(241,245,249)',
                    zIndex: 1,
                } }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    position: 'absolute',
                    top: -16,
                    left: 45,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    zIndex: 2,
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: data.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)("img", { src: data.icon, alt: title, style: {
                                width: '16px',
                                height: '16px',
                                objectFit: 'contain',
                            } }) }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, fontSize: 13, color: '#444' }, children: data.label })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    textAlign: 'center',
                    paddingTop: 30,
                    fontWeight: 'bold',
                } })] }));
};
exports.default = ContainerNode;
//# sourceMappingURL=container-node.js.map