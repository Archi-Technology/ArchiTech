'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

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
  const [commentVisible, setCommentVisible] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const commentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized completion handler to prevent multiple calls
  const handleComplete = useCallback(() => {
    if (!hasCompleted && onComplete) {
      setHasCompleted(true);
      onComplete();
    }
  }, [hasCompleted, onComplete]);

  // Smooth progress animation using requestAnimationFrame
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

  // Handle comment cycling with fade in/out
  const cycleComments = useCallback(() => {
    if (!isVisible) return;

    const commentDuration = duration / comments.length;
    const fadeOutDuration = 300;
    const fadeInDuration = 300;
    const displayDuration = commentDuration - fadeOutDuration - fadeInDuration;

    // Fade out current comment
    setCommentVisible(false);

    commentTimeoutRef.current = setTimeout(() => {
      // Change to next comment
      setCurrentCommentIndex((prev) => (prev + 1) % comments.length);

      // Fade in new comment
      setTimeout(() => {
        setCommentVisible(true);
      }, 50);

      // Schedule next cycle
      setTimeout(() => {
        cycleComments();
      }, displayDuration);
    }, fadeOutDuration);
  }, [isVisible, duration, comments.length]);

  useEffect(() => {
    if (!isVisible) {
      // Reset everything when not visible
      setProgress(0);
      setCurrentCommentIndex(0);
      setCommentVisible(true);
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

    // Start fresh when becoming visible
    startTimeRef.current = Date.now();
    setProgress(0);
    setCurrentCommentIndex(0);
    setCommentVisible(true);
    setHasCompleted(false);

    // Start progress animation
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    // Start comment cycling after initial display
    setTimeout(
      () => {
        cycleComments();
      },
      duration / comments.length - 600,
    ); // Start cycling before first comment ends

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

  const circumference = 2 * Math.PI * 35; // Reduced radius from 45 to 35
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full mx-4 text-center">
        {/* Circular Progress - Made smaller */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <svg
            className="w-20 h-20 transform -rotate-90"
            viewBox="0 0 80 80"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          >
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#f3f4f6"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="url(#progressGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 0.1s ease-out',
              }}
            />
            {/* Gradient definition */}
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
          </svg>
        </div>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800 tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        {/* Loading title */}
        <div className="mb-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-base font-semibold text-gray-800">
              Loading Resources
            </span>
          </div>
        </div>

        {/* Single comment with fade animation */}
        <div className="h-10 flex items-center justify-center">
          <p
            className={`text-sm text-gray-600 text-center leading-relaxed px-2 transition-opacity duration-5000 ${
              commentVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {comments[currentCommentIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
