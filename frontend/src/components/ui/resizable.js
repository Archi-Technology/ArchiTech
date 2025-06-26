"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizableHandle = exports.ResizablePanel = exports.ResizablePanelGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../../lib/utils");
// Lazy load the ESM module
const ResizablePrimitivePromise = import("react-resizable-panels");
const ResizablePanelGroup = (props) => {
    const LazyPanelGroup = (0, react_1.lazy)(async () => {
        const mod = await ResizablePrimitivePromise;
        return {
            default: ({ className, ...rest }) => ((0, jsx_runtime_1.jsx)(mod.PanelGroup, { className: (0, utils_1.cn)("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className), ...rest })),
        };
    });
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading PanelGroup..." }), children: (0, jsx_runtime_1.jsx)(LazyPanelGroup, { ...props }) }));
};
exports.ResizablePanelGroup = ResizablePanelGroup;
const ResizablePanel = (0, react_1.lazy)(async () => {
    const mod = await ResizablePrimitivePromise;
    return { default: mod.Panel };
});
exports.ResizablePanel = ResizablePanel;
const ResizableHandle = ({ withHandle, className, ...props }) => {
    const LazyHandle = (0, react_1.lazy)(async () => {
        const mod = await ResizablePrimitivePromise;
        return {
            default: (innerProps) => ((0, jsx_runtime_1.jsx)(mod.PanelResizeHandle, { className: (0, utils_1.cn)("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className), ...innerProps, children: withHandle && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: (0, jsx_runtime_1.jsx)(lucide_react_1.GripVertical, { className: "h-2.5 w-2.5" }) })) })),
        };
    });
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading Handle..." }), children: (0, jsx_runtime_1.jsx)(LazyHandle, { ...props }) }));
};
exports.ResizableHandle = ResizableHandle;
//# sourceMappingURL=resizable.js.map