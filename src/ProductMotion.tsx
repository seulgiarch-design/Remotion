import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { IntroScene } from "./ProductMotion/IntroScene";
import { TaglineScene } from "./ProductMotion/TaglineScene";
import { FeaturesScene } from "./ProductMotion/FeaturesScene";
import { CTAScene } from "./ProductMotion/CTAScene";
import { COLORS } from "./ProductMotion/constants";

export const productMotionSchema = z.object({
  productName: z.string(),
  tagline: z.string(),
  subtitle: z.string(),
  ctaText: z.string(),
  ctaUrl: z.string(),
  accentColor: zColor(),
});

export const ProductMotion: React.FC<
  z.infer<typeof productMotionSchema>
> = ({ productName, tagline, subtitle, ctaText, ctaUrl, accentColor }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Logo/Brand Intro (frames 0-90) */}
      <Sequence durationInFrames={90}>
        <IntroScene productName={productName} accentColor={accentColor} />
      </Sequence>

      {/* Scene 2: Tagline (frames 60-180) */}
      <Sequence from={60} durationInFrames={120}>
        <TaglineScene
          tagline={tagline}
          subtitle={subtitle}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 3: Features (frames 150-270) */}
      <Sequence from={150} durationInFrames={120}>
        <FeaturesScene accentColor={accentColor} />
      </Sequence>

      {/* Scene 4: CTA (frames 240-330) */}
      <Sequence from={240} durationInFrames={90}>
        <CTAScene
          ctaText={ctaText}
          ctaUrl={ctaUrl}
          accentColor={accentColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
