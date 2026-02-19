import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "./constants";

export const TaglineScene: React.FC<{
  readonly tagline: string;
  readonly subtitle: string;
  readonly accentColor: string;
}> = ({ tagline, subtitle, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = tagline.split(" ");

  // Scene fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subtitleProgress = spring({
    frame: frame - 20 - words.length * 6,
    fps,
    config: { damping: 100 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  // Accent bar
  const barProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 120, mass: 0.3 },
  });
  const barWidth = interpolate(barProgress, [0, 1], [0, 60]);

  // Scene fade out
  const fadeOut = interpolate(frame, [105, 120], [1, 0], {
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
      {/* Accent bar above tagline */}
      <div
        style={{
          height: 3,
          width: barWidth,
          backgroundColor: accentColor,
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      {/* Tagline with per-word animation */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 72,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          letterSpacing: -2,
          lineHeight: 1.1,
          maxWidth: 900,
        }}
      >
        {words.map((word, i) => {
          const delay = 8 + i * 6;
          const wordProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 80 },
          });
          const wordY = interpolate(wordProgress, [0, 1], [40, 0]);
          const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);

          return (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                marginRight: 18,
                transform: `translateY(${wordY}px)`,
                opacity: wordOpacity,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.textMuted,
          marginTop: 32,
          letterSpacing: 0.5,
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleProgress,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
