'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.scss';

interface ResourceLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
  comments?: string[];
}

export default function ResourceLoader({
  isVisible,
  onComplete,
  duration = 3000,
  comments = [
    'Finding the best price for you...',
    'Comparing cloud providers...',
    'Analyzing cost optimization...',
    'Searching for deals and discounts...',
    'Calculating savings opportunities...',
    'Reviewing performance metrics...',
  ],
}: ResourceLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const commentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    if (newProgress >= 100) {
      setTimeout(handleComplete, 300);
    } else {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [duration, isVisible, handleComplete]);

  const cycleComments = useCallback(() => {
    if (!isVisible) return;

    const commentDuration = duration / comments.length; // Reduce duration per comment
    commentTimeoutRef.current = setTimeout(() => {
      setCurrentCommentIndex((prev) => (prev + 1) % comments.length);
      cycleComments();
    }, commentDuration);
  }, [isVisible, duration, comments.length]);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentCommentIndex(0);
      setHasCompleted(false);
      startTimeRef.current = null;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (commentTimeoutRef.current) {
        clearTimeout(commentTimeoutRef.current);
        commentTimeoutRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(0);
    setCurrentCommentIndex(0);
    setHasCompleted(false);

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    setTimeout(
      () => {
        cycleComments();
      },
      duration / comments.length - 600,
    );

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (commentTimeoutRef.current) {
        clearTimeout(commentTimeoutRef.current);
      }
    };
  }, [isVisible, duration, comments.length, updateProgress, cycleComments]);

  if (!isVisible) return null;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full mx-4 text-center space-y-5">
        <div className="relative w-28 h-28 mx-auto">
          <svg
            className="absolute w-28 h-28 transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="animated-stroke"
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold text-gray-900 tabular-nums animate-pulse"
            >
              {Math.round(progress)}%
            </text>
          </svg>
        </div>

        <div>
          <span className="text-base font-semibold text-gray-800">
            Loading Resources
          </span>
        </div>

        <div className="min-h-[2rem] flex items-center justify-center px-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentCommentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm text-gray-900 text-center leading-relaxed font-medium"
            >
              {comments[currentCommentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
