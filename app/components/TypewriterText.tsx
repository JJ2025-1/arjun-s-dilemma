"use client";
import React, { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speedMs?: number;
  onComplete?: () => void;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({
  text,
  speedMs = 20,
  onComplete,
  className = "",
  cursorClassName = "text-amber-400 animate-pulse font-mono",
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Reset typewriter when text changes
  useEffect(() => {
    setDisplayedLength(0);
  }, [text]);

  useEffect(() => {
    if (displayedLength < text.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, speedMs);
      return () => clearTimeout(timer);
    } else if (displayedLength === text.length && text.length > 0) {
      onCompleteRef.current?.();
    }
  }, [displayedLength, text, speedMs]);

  const handleSkip = () => {
    if (displayedLength < text.length) {
      setDisplayedLength(text.length);
      onCompleteRef.current?.();
    }
  };

  const isComplete = displayedLength >= text.length;

  return (
    <span
      onClick={handleSkip}
      className={`cursor-pointer select-text transition-opacity ${className}`}
      title={!isComplete ? "Click to reveal complete dialogue immediately" : undefined}
    >
      {text.slice(0, displayedLength)}
      {!isComplete && (
        <span className={`inline-block ml-1 font-bold ${cursorClassName}`}>
          ▎
        </span>
      )}
    </span>
  );
}
