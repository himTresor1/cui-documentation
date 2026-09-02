"use client";

import { useEffect, useState } from "react";

const WORDS = ["interface.", "component.", "workflow.", "product.", "screen."];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapping(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setSwapping(false);
      }, 600);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block text-cui-hero transition-[opacity,transform] duration-[600ms] ease-in-out ${
        swapping ? "-translate-y-1.5 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {WORDS[index]}
    </span>
  );
}
