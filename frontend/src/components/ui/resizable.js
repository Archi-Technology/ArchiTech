"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "../../lib/utils";
// Lazy load the ESM module
const ResizablePrimitivePromise = import("react-resizable-panels");
const ResizablePanelGroup = (props) => {
    const LazyPanelGroup = lazy(async () => {
        const mod = await ResizablePrimitivePromise;
        return {
            default: ({ className, ...rest }) => (_jsx(mod.PanelGroup, { className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className), ...rest })),
        };
    });
    return (_jsx(Suspense, { fallback: _jsx("div", { children: "Loading PanelGroup..." }), children: _jsx(LazyPanelGroup, { ...props }) }));
};
const ResizablePanel = lazy(async () => {
    const mod = await ResizablePrimitivePromise;
    return { default: mod.Panel };
});
const ResizableHandle = ({ withHandle, className, ...props }) => {
    const LazyHandle = lazy(async () => {
        const mod = await ResizablePrimitivePromise;
        return {
            default: (innerProps) => (_jsx(mod.PanelResizeHandle, { className: cn("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className), ...innerProps, children: withHandle && (_jsx("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: _jsx(GripVertical, { className: "h-2.5 w-2.5" }) })) })),
        };
    });
    return (_jsx(Suspense, { fallback: _jsx("div", { children: "Loading Handle..." }), children: _jsx(LazyHandle, { ...props }) }));
};
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
//# sourceMappingURL=resizable.js.map