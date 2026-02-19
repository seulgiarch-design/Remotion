import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "./constants";

export const IntroScene: React.FC<{
  readonly productName: string;
  readonly accentColor: string;
}> = ({ productName, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo mark scale-in with spring
  const markScale = spring({
    frame,
    fps,
    config: { damping: 80, mass: 0.6 },
  });

  // Logo mark rotation
  const markRotation = interpolate(markScale, [0, 1], [-90, 0]);

  // Product name fade and slide
  const nameProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 100 },
  });
  const nameY = interpolate(nameProgress, [0, 1], [30, 0]);
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1]);

  // Divider line width
  const lineProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 120, mass: 0.4 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 120]);

  // Fade out at end of scene
  const fadeOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Logo mark - abstract geometric shape */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${accentColor}, ${COLORS.accentLight})`,
          transform: `scale(${markScale}) rotate(${markRotation}deg)`,
          marginBottom: 32,
          boxShadow: `0 20px 60px ${accentColor}40`,
        }}
      />

      {/* Product name */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 56,
          fontWeight: 600,
          color: COLORS.text,
          letterSpacing: -1,
          transform: `translateY(${nameY}px)`,
          opacity: nameOpacity,
        }}
      >
        {productName}
      </div>

      {/* Accent divider line */}
      <div
        style={{
          height: 2,
          width: lineWidth,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          marginTop: 20,
          borderRadius: 1,
        }}
      />
    </AbsoluteFill>
  );
};
