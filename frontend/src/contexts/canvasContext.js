import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useRef } from "react";
const CanvasContext = createContext(undefined);
export const CanvasProvider = ({ children }) => {
    const addNodeFunctionRef = useRef();
    const addNodeToCanvas = (service) => {
        if (addNodeFunctionRef.current) {
            addNodeFunctionRef.current(service);
        }
    };
    const registerAddNodeFunction = (fn) => {
        addNodeFunctionRef.current = fn;
    };
    return (_jsx(CanvasContext.Provider, { value: { addNodeToCanvas, registerAddNodeFunction }, children: children }));
};
export const useCanvas = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvas must be used within a CanvasProvider");
    }
    return context;
};
//# sourceMappingURL=canvasContext.js.map