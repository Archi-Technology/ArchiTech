'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './index.scss';

interface ResourceLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
  steps?: string[];
}

export default function ResourceLoader({
  isVisible,
  onComplete,
  duration = 3000,
  steps = [
    'Analyzing your answers',
    'Analyzing your preferences',
    'Selecting budget-friendly options',
  ],
}: ResourceLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleComplete = useCallback(() => {
    if (!hasCompleted && onComplete) {
      setHasCompleted(true);
      onComplete();
    }
  }, [hasCompleted, onComplete]);

  const updateProgress = useCallback(() => {
    if (!startTimeRef.current || !isVisible) return;

    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = Math.min((elapsed / duration) * 100, 100);

    setProgress(newProgress);

    // Update completed steps based on progress - more generous timing
    const stepProgress = newProgress / 100;
    const newCompletedSteps: number[] = [];

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
    } else {
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

  if (!isVisible) return null;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
      <div className="loader-container">
        <div className="progress-circle">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#4c8bf5"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="animated-stroke"
            />
          </svg>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>

        <div className="status-text">Finalizing...</div>

        <div className="steps-list">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            return (
              <motion.div
                key={index}
                className="step-item"
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: isCompleted ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`step-icon ${isCompleted ? 'completed' : ''}`}>
                  {isCompleted && <Check size={12} />}
                </div>
                <span className={`step-text ${isCompleted ? 'completed' : ''}`}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
  );
}
