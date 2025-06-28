'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './index.scss';
export default function ResourceLoader({ isVisible, onComplete, duration = 3000, steps = [
    'Analyzing your answers',
    'Analyzing your preferences',
    'Selecting budget-friendly options',
], }) {
    const [progress, setProgress] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [hasCompleted, setHasCompleted] = useState(false);
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);
    const handleComplete = useCallback(() => {
        if (!hasCompleted && onComplete) {
            setHasCompleted(true);
            onComplete();
        }
    }, [hasCompleted, onComplete]);
    const updateProgress = useCallback(() => {
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
    useEffect(() => {
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
    return (_jsxs("div", { className: "loader-container", children: [_jsxs("div", { className: "progress-circle", children: [_jsxs("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 120 120", children: [_jsx("circle", { cx: "60", cy: "60", r: radius, stroke: "#e5e7eb", strokeWidth: "8", fill: "none" }), _jsx("circle", { cx: "60", cy: "60", r: radius, stroke: "#4c8bf5", strokeWidth: "8", fill: "none", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, className: "animated-stroke" })] }), _jsxs("div", { className: "progress-text", children: [Math.round(progress), "%"] })] }), _jsx("div", { className: "status-text", children: "Finalizing..." }), _jsx("div", { className: "steps-list", children: steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    return (_jsxs(motion.div, { className: "step-item", initial: { opacity: 0.5 }, animate: {
                            opacity: isCompleted ? 1 : 0.5,
                        }, transition: { duration: 0.3 }, children: [_jsx("div", { className: `step-icon ${isCompleted ? 'completed' : ''}`, children: isCompleted && _jsx(Check, { size: 12 }) }), _jsx("span", { className: `step-text ${isCompleted ? 'completed' : ''}`, children: step })] }, index));
                }) })] }));
}
//# sourceMappingURL=index.js.map