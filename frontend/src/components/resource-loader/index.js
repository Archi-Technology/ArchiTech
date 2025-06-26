'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResourceLoader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
require("./index.scss");
function ResourceLoader({ isVisible, onComplete, duration = 3000, steps = [
    'Analyzing your answers',
    'Analyzing your preferences',
    'Selecting budget-friendly options',
], }) {
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [completedSteps, setCompletedSteps] = (0, react_1.useState)([]);
    const [hasCompleted, setHasCompleted] = (0, react_1.useState)(false);
    const startTimeRef = (0, react_1.useRef)(null);
    const animationFrameRef = (0, react_1.useRef)(null);
    const handleComplete = (0, react_1.useCallback)(() => {
        if (!hasCompleted && onComplete) {
            setHasCompleted(true);
            onComplete();
        }
    }, [hasCompleted, onComplete]);
    const updateProgress = (0, react_1.useCallback)(() => {
        if (!startTimeRef.current || !isVisible)
            return;
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        // Update completed steps based on progress - more generous timing
        const stepProgress = newProgress / 100;
        const newCompletedSteps = [];
        for (let i = 0; i < steps.length; i++) {
            // Make steps complete earlier for better UX
            if (stepProgress > (i + 0.5) / steps.length) {
                newCompletedSteps.push(i);
            }
        }
        setCompletedSteps(newCompletedSteps);
        if (newProgress >= 100) {
            // Mark all steps as completed
            setCompletedSteps(steps.map((_, index) => index));
            setTimeout(handleComplete, 500);
        }
        else {
            animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
    }, [duration, isVisible, handleComplete, steps]);
    (0, react_1.useEffect)(() => {
        if (!isVisible) {
            setProgress(0);
            setCompletedSteps([]);
            setHasCompleted(false);
            startTimeRef.current = null;
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            return;
        }
        startTimeRef.current = Date.now();
        setProgress(0);
        setCompletedSteps([]);
        setHasCompleted(false);
        animationFrameRef.current = requestAnimationFrame(updateProgress);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isVisible, updateProgress]);
    if (!isVisible)
        return null;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "loader-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "progress-circle", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 120 120", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "60", cy: "60", r: radius, stroke: "#e5e7eb", strokeWidth: "8", fill: "none" }), (0, jsx_runtime_1.jsx)("circle", { cx: "60", cy: "60", r: radius, stroke: "#4c8bf5", strokeWidth: "8", fill: "none", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, className: "animated-stroke" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "progress-text", children: [Math.round(progress), "%"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "status-text", children: "Finalizing..." }), (0, jsx_runtime_1.jsx)("div", { className: "steps-list", children: steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "step-item", initial: { opacity: 0.5 }, animate: {
                            opacity: isCompleted ? 1 : 0.5,
                        }, transition: { duration: 0.3 }, children: [(0, jsx_runtime_1.jsx)("div", { className: `step-icon ${isCompleted ? 'completed' : ''}`, children: isCompleted && (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 12 }) }), (0, jsx_runtime_1.jsx)("span", { className: `step-text ${isCompleted ? 'completed' : ''}`, children: step })] }, index));
                }) })] }));
}
//# sourceMappingURL=index.js.map