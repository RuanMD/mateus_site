"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  count?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  speed?: number;
  length?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function LightRays({
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  opacity = 0.65,
  speed = 14,
  length = "70vh",
  className,
  style,
}: LightRaysProps) {
  const rays = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const baseDelay = (i / count) * speed;
      const randomOffset = Math.random() * 2 - 1;
      const delay = baseDelay + randomOffset;
      const width = 80 + Math.random() * 120;
      const left = (i / (count - 1)) * 100;
      const skew = -15 + Math.random() * 30;
      const duration = speed + Math.random() * 4 - 2;

      return {
        id: i,
        delay,
        width,
        left,
        skew,
        duration,
      };
    });
  }, [count, speed]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        filter: `blur(${blur}px)`,
        ...style,
      }}
    >
      {rays.map((ray) => (
        <div
          key={ray.id}
          className="absolute top-0 animate-light-ray"
          style={{
            left: `${ray.left}%`,
            width: `${ray.width}px`,
            height: typeof length === "number" ? `${length}px` : length,
            background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
            transform: `translateX(-50%) skewX(${ray.skew}deg)`,
            opacity: 0,
            animationDuration: `${ray.duration}s`,
            animationDelay: `${ray.delay}s`,
            ["--ray-opacity" as string]: opacity,
          }}
        />
      ))}
    </div>
  );
}
