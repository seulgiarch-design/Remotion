import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "./constants";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "\u26A1",
    title: "Lightning Fast",
    description: "Built for speed from the ground up",
  },
  {
    icon: "\uD83D\uDD12",
    title: "Secure by Default",
    description: "Enterprise-grade security built in",
  },
  {
    icon: "\uD83C\uDF10",
    title: "Scale Anywhere",
    description: "Deploy globally with zero config",
  },
];

const FeatureCard: React.FC<{
  readonly feature: Feature;
  readonly index: number;
  readonly accentColor: string;
}> = ({ feature, index, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 10 + index * 15;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 80, mass: 0.6 },
  });

  const cardY = interpolate(entrance, [0, 1], [60, 0]);
  const cardOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Subtle glow on the icon
  const glowProgress = spring({
    frame: frame - delay - 5,
    fps,
    config: { damping: 100, mass: 0.8 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 320,
        padding: "48px 32px",
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        transform: `translateY(${cardY}px)`,
        opacity: cardOpacity,
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: 40,
          marginBottom: 20,
          filter: `drop-shadow(0 0 ${interpolate(glowProgress, [0, 1], [0, 20])}px ${accentColor}60)`,
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 10,
          letterSpacing: -0.3,
        }}
      >
        {feature.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 400,
          color: COLORS.textMuted,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {feature.description}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC<{
  readonly accentColor: string;
}> = ({ accentColor }) => {
  const frame = useCurrentFrame();

  // Scene fade in/out
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
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
      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {DEFAULT_FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            accentColor={accentColor}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
