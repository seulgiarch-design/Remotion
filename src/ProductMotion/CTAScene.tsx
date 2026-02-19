import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "./constants";

export const CTAScene: React.FC<{
  readonly ctaText: string;
  readonly ctaUrl: string;
  readonly accentColor: string;
}> = ({ ctaText, ctaUrl, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA text entrance
  const textProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 80 },
  });
  const textY = interpolate(textProgress, [0, 1], [30, 0]);

  // Button entrance
  const buttonProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 60, mass: 0.5 },
  });
  const buttonY = interpolate(buttonProgress, [0, 1], [20, 0]);
  const buttonScale = interpolate(buttonProgress, [0, 1], [0.9, 1]);

  // URL text fade
  const urlProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 100 },
  });

  // Final fade out
  const fadeOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Heading */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: -1.5,
          transform: `translateY(${textY}px)`,
          opacity: textProgress,
          marginBottom: 40,
        }}
      >
        {ctaText}
      </div>

      {/* CTA Button */}
      <div
        style={{
          padding: "18px 48px",
          borderRadius: 12,
          background: `linear-gradient(135deg, ${accentColor}, ${COLORS.accentLight})`,
          fontFamily: FONT,
          fontSize: 20,
          fontWeight: 600,
          color: COLORS.text,
          letterSpacing: 0.5,
          transform: `translateY(${buttonY}px) scale(${buttonScale})`,
          opacity: buttonProgress,
          boxShadow: `0 12px 40px ${accentColor}50`,
        }}
      >
        Get Started
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 18,
          fontWeight: 400,
          color: COLORS.textMuted,
          marginTop: 24,
          opacity: urlProgress,
          letterSpacing: 1,
        }}
      >
        {ctaUrl}
      </div>
    </AbsoluteFill>
  );
};
