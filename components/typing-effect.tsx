"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
  cursorCharacter?: string;
  startDelay?: number;
}

export function TypingEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 35,
  pauseDuration = 3000,
  className = "",
  cursorClassName = "",
  cursorCharacter = "|",
  startDelay = 800,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentText = texts[textIndex] ?? "";

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        const randomSpeed =
          typingSpeed + Math.random() * (typingSpeed * 0.5);
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, randomSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [
    displayText,
    isDeleting,
    currentText,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    tick();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started, tick]);

  if (!texts.length) return null;

  return (
    <span className={className}>
      {displayText}
      <span
        className={`inline-block w-[2px] h-[0.8em] bg-cyan-400 align-text-bottom rounded-sm animate-pulse ${cursorClassName}`}
      >
        {cursorCharacter !== "|" ? cursorCharacter : ""}
      </span>
    </span>
  );
}
