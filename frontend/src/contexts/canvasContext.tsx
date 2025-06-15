import React, { createContext, useContext, useRef } from "react";

interface Service {
    name: string;
    icon: JSX.Element;
    vpc: string;
    subnet: string;
    cloud: string;
    addressRange: string
}

interface CanvasContextProps {
    addNodeToCanvas: (service: Service) => void;
    registerAddNodeFunction: (fn: (service: Service) => void) => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const addNodeFunctionRef = useRef<(service: Service) => void>();

    const addNodeToCanvas = (service: Service) => {
        if (addNodeFunctionRef.current) {
            addNodeFunctionRef.current(service);
        }
    };

    const registerAddNodeFunction = (fn: (service: Service) => void) => {
        addNodeFunctionRef.current = fn;
    };

    return (
        <CanvasContext.Provider value={{ addNodeToCanvas, registerAddNodeFunction }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvas must be used within a CanvasProvider");
    }
    return context;
};
