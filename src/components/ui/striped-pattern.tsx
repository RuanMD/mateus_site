import { cn } from "@/lib/utils";

interface StripedPatternProps {
  className?: string;
}

export function StripedPattern({ className }: StripedPatternProps) {
  return (
    <svg
      className={cn(
        "absolute inset-0 h-full w-full stroke-primary/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
        className
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="striped-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
        >
          <line x1="0" y1="0" x2="0" y2="40" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#striped-pattern)" />
    </svg>
  );
}
