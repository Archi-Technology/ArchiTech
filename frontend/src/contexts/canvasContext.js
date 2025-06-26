"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCanvas = exports.CanvasProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CanvasContext = (0, react_1.createContext)(undefined);
const CanvasProvider = ({ children }) => {
    const addNodeFunctionRef = (0, react_1.useRef)();
    const addNodeToCanvas = (service) => {
        if (addNodeFunctionRef.current) {
            addNodeFunctionRef.current(service);
        }
    };
    const registerAddNodeFunction = (fn) => {
        addNodeFunctionRef.current = fn;
    };
    return ((0, jsx_runtime_1.jsx)(CanvasContext.Provider, { value: { addNodeToCanvas, registerAddNodeFunction }, children: children }));
};
exports.CanvasProvider = CanvasProvider;
const useCanvas = () => {
    const context = (0, react_1.useContext)(CanvasContext);
    if (!context) {
        throw new Error("useCanvas must be used within a CanvasProvider");
    }
    return context;
};
exports.useCanvas = useCanvas;
//# sourceMappingURL=canvasContext.js.map