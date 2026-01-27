import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { NavanLogo } from "./NavanIntro/NavanLogo";
import { Tagline } from "./NavanIntro/Tagline";
import { FeatureRow } from "./NavanIntro/Feature";
import { NAVAN_LIGHT, NAVAN_ACCENT } from "./NavanIntro/constants";

export const navanIntroSchema = z.object({
  primaryColor: zColor(),
  tagline: z.string(),
});

const FEATURES = [
  { icon: "✈️", title: "Corporate Travel" },
  { icon: "💳", title: "Expense Management" },
  { icon: "📊", title: "Real-time Analytics" },
];

export const NavanIntro: React.FC<z.infer<typeof navanIntroSchema>> = ({
  primaryColor,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Logo moves up after initial animation
  const logoTranslation = spring({
    fps,
    frame: frame - 40,
    config: {
      damping: 100,
    },
  });

  const logoY = interpolate(logoTranslation, [0, 1], [0, -180]);

  // Fade out at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 5],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${NAVAN_LIGHT} 0%, white ${
          50 + gradientProgress * 20
        }%, ${NAVAN_LIGHT} 100%)`,
      }}
    >
      <AbsoluteFill style={{ opacity }}>
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${NAVAN_ACCENT}15 0%, transparent 70%)`,
            opacity: gradientProgress,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -200,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${primaryColor}10 0%, transparent 70%)`,
            opacity: gradientProgress,
          }}
        />

        {/* Logo */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            transform: `translateY(${logoY}px)`,
          }}
        >
          <NavanLogo color={primaryColor} />
        </AbsoluteFill>

        {/* Tagline */}
        <Sequence from={50}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 250,
            }}
          >
            <Tagline text={tagline} />
          </AbsoluteFill>
        </Sequence>

        {/* Features */}
        <Sequence from={90}>
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 120,
            }}
          >
            <FeatureRow features={FEATURES} />
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
