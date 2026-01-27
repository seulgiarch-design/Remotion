import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY, NAVAN_DARK } from "./constants";

export const Feature: React.FC<{
  readonly icon: string;
  readonly title: string;
  readonly delay?: number;
}> = ({ icon, title, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 50,
      stiffness: 150,
    },
  });

  const translateY = (1 - progress) * 50;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: progress,
        transform: `translateY(${translateY}px)`,
        padding: "0 40px",
      }}
    >
      <div
        style={{
          fontSize: 60,
          marginBottom: 15,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 600,
          color: NAVAN_DARK,
          textAlign: "center",
          maxWidth: 200,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const FeatureRow: React.FC<{
  readonly features: Array<{ icon: string; title: string }>;
  readonly staggerDelay?: number;
}> = ({ features, staggerDelay = 8 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 80,
      }}
    >
      {features.map((feature, index) => (
        <Feature
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          delay={index * staggerDelay}
        />
      ))}
    </div>
  );
};
