import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY, NAVAN_DARK } from "./constants";

export const Tagline: React.FC<{
  readonly text: string;
  readonly color?: string;
}> = ({ text, color = NAVAN_DARK }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 48,
        fontWeight: 500,
        textAlign: "center",
        color: color,
      }}
    >
      {words.map((word, i) => {
        const delay = i * 4;
        const progress = spring({
          fps,
          frame: frame - delay,
          config: {
            damping: 80,
            stiffness: 200,
          },
        });

        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              marginRight: 12,
              opacity: progress,
              transform: `translateY(${(1 - progress) * 20}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
