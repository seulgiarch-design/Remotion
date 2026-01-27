import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { FONT_FAMILY, NAVAN_BLUE, NAVAN_ACCENT } from "./constants";

export const NavanLogo: React.FC<{
  readonly color?: string;
}> = ({ color = NAVAN_BLUE }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale animation
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 50,
      stiffness: 200,
    },
  });

  // Rotation animation for the icon
  const rotation = interpolate(frame, [0, 30], [180, 0], {
    extrapolateRight: "clamp",
  });

  // Icon dash animation
  const dashOffset = interpolate(frame, [0, 40], [100, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      {/* Navan Icon - Abstract travel/arrow shape */}
      <svg
        width="180"
        height="180"
        viewBox="0 0 100 100"
        style={{
          transform: `rotate(${rotation}deg)`,
          marginBottom: 30,
        }}
      >
        <defs>
          <linearGradient id="navanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={NAVAN_ACCENT} />
          </linearGradient>
        </defs>
        {/* Abstract plane/arrow shape */}
        <path
          d="M50 10 L85 50 L50 40 L15 50 Z"
          fill="url(#navanGradient)"
          strokeDasharray="200"
          strokeDashoffset={dashOffset}
        />
        <path
          d="M50 40 L50 90 L35 65 M50 90 L65 65"
          stroke="url(#navanGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="200"
          strokeDashoffset={dashOffset}
        />
      </svg>

      {/* Navan Text */}
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 120,
          fontWeight: 700,
          color: color,
          letterSpacing: "-2px",
        }}
      >
        navan
      </div>
    </div>
  );
};
