import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const myVideoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  backgroundColor: zColor(),
  accentColor: zColor(),
});

// Animated circle component
const AnimatedCircle: React.FC<{
  delay: number;
  size: number;
  x: number;
  y: number;
  color: string;
}> = ({ delay, size, x, y, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const rotation = interpolate(frame, [0, 150], [0, 360], {
    extrapolateRight: "extend",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}40, ${color}10)`,
        border: `2px solid ${color}30`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    />
  );
};

// Animated line component
const AnimatedLine: React.FC<{
  delay: number;
  width: number;
  x: number;
  y: number;
  angle: number;
  color: string;
}> = ({ delay, width, x, y, angle, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 50,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width * progress,
        height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "left center",
      }}
    />
  );
};

// Text reveal component
const TextReveal: React.FC<{
  text: string;
  delay: number;
  fontSize: number;
  color: string;
  fontWeight?: string;
}> = ({ text, delay, fontSize, color, fontWeight = "bold" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chars = text.split("");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {chars.map((char, i) => {
        const charDelay = delay + i * 2;

        const opacity = spring({
          fps,
          frame: frame - charDelay,
          config: {
            damping: 200,
          },
        });

        const y = interpolate(
          spring({
            fps,
            frame: frame - charDelay,
            config: {
              damping: 100,
            },
          }),
          [0, 1],
          [30, 0]
        );

        return (
          <span
            key={i}
            style={{
              fontFamily: "SF Pro Display, Helvetica, Arial, sans-serif",
              fontSize,
              fontWeight,
              color,
              opacity,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              whiteSpace: "pre",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

// Main video component
export const MyVideo: React.FC<z.infer<typeof myVideoSchema>> = ({
  title,
  subtitle,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Background gradient animation
  const gradientAngle = interpolate(frame, [0, 150], [0, 45], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${backgroundColor}, ${backgroundColor}ee)`,
      }}
    >
      <AbsoluteFill style={{ opacity: fadeOut }}>
        {/* Animated background elements */}
        <AnimatedCircle delay={0} size={400} x={-100} y={-100} color={accentColor} />
        <AnimatedCircle delay={5} size={200} x={1600} y={100} color={accentColor} />
        <AnimatedCircle delay={10} size={300} x={1500} y={700} color={accentColor} />
        <AnimatedCircle delay={15} size={150} x={100} y={800} color={accentColor} />

        <AnimatedLine delay={20} width={400} x={200} y={300} angle={-15} color={accentColor} />
        <AnimatedLine delay={25} width={300} x={1400} y={600} angle={20} color={accentColor} />
        <AnimatedLine delay={30} width={500} x={600} y={900} angle={-5} color={accentColor} />

        {/* Center content */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {/* Animated accent bar */}
          <Sequence from={15}>
            <AccentBar color={accentColor} />
          </Sequence>

          {/* Main title */}
          <Sequence from={25}>
            <TextReveal
              text={title}
              delay={0}
              fontSize={120}
              color="#ffffff"
              fontWeight="800"
            />
          </Sequence>

          {/* Subtitle */}
          <Sequence from={50}>
            <TextReveal
              text={subtitle}
              delay={0}
              fontSize={40}
              color="#ffffffcc"
              fontWeight="400"
            />
          </Sequence>

          {/* Bottom accent bar */}
          <Sequence from={70}>
            <AccentBar color={accentColor} />
          </Sequence>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Accent bar component
const AccentBar: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = spring({
    fps,
    frame,
    config: {
      damping: 100,
    },
  });

  return (
    <div
      style={{
        width: 200 * width,
        height: 4,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
  );
};
