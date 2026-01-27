# CLAUDE.md - AI Assistant Guide for Remotion Project

## Project Overview

This is a **Remotion** project - a React framework for programmatically creating videos. It uses React components to define animations and video content that can be rendered as MP4 files. This specific project is based on the "hello-world" template demonstrating Remotion's core features.

**Key concept:** Videos are defined as React components with frame-based animations, enabling precise control over every frame using code.

## Tech Stack

- **Framework:** Remotion v4.0.0
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.9.3 (strict mode)
- **Schema Validation:** Zod 3.22.3 with @remotion/zod-types
- **Linting:** ESLint 9.19.0 (flat config format)
- **Formatting:** Prettier 3.6.0

## Directory Structure

```
/
├── src/
│   ├── index.ts              # Entry point - registers root with Remotion
│   ├── Root.tsx              # Root component - defines all compositions
│   ├── HelloWorld.tsx        # Main composition with animations
│   └── HelloWorld/           # Reusable component library
│       ├── constants.ts      # Shared constants (colors, fonts)
│       ├── Arc.tsx           # SVG arc animation component
│       ├── Atom.tsx          # SVG atom circle component
│       ├── Logo.tsx          # Logo composition (Arc + Atom)
│       ├── Subtitle.tsx      # Subtitle text component
│       └── Title.tsx         # Title text animation component
├── remotion.config.ts        # Remotion framework configuration
├── tsconfig.json             # TypeScript config (strict mode)
├── eslint.config.mjs         # ESLint flat config
├── .prettierrc               # Prettier config (2 spaces, no tabs)
└── package.json
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server (Remotion Studio - interactive preview)
npm run dev

# Bundle for production
npm run build

# Render a video (outputs to out/ directory)
npx remotion render HelloWorld

# Render with custom props
npx remotion render HelloWorld --props='{"titleText":"Custom Title"}'

# Lint and type check
npm run lint

# Upgrade Remotion CLI
npm run upgrade
```

## Code Architecture

### Entry Point Flow
1. `src/index.ts` - Calls `registerRoot(RemotionRoot)`
2. `src/Root.tsx` - Defines `<Composition>` entries (each appears in Studio sidebar)
3. Individual composition components render the video content

### Composition Registration Pattern
```tsx
// Root.tsx - Each Composition is a renderable video
<Composition
  id="HelloWorld"           // Used in: npx remotion render HelloWorld
  component={HelloWorld}    // React component to render
  durationInFrames={150}    // Total frames (150 frames @ 30fps = 5 seconds)
  fps={30}                  // Frames per second
  width={1920}              // Video width in pixels
  height={1080}             // Video height in pixels
  schema={myCompSchema}     // Zod schema for props validation
  defaultProps={{...}}      // Default prop values
/>
```

### Animation Primitives

**Hooks:**
- `useCurrentFrame()` - Returns current frame number (0-based)
- `useVideoConfig()` - Returns `{ fps, width, height, durationInFrames }`

**Animation functions:**
- `spring({ frame, fps, config })` - Physics-based animation (0 to 1)
- `interpolate(value, inputRange, outputRange, options)` - Map values between ranges

**Layout components:**
- `<AbsoluteFill>` - Full-screen absolutely positioned container
- `<Sequence from={frameNumber}>` - Time-offset wrapper for children

## Code Conventions

### Component Pattern
```tsx
// Always use React.FC with typed props
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return <AbsoluteFill>...</AbsoluteFill>;
};
```

### Props with Zod Schemas
```tsx
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

// Define schema alongside component
export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),  // Remotion color type
});

// Use z.infer for type safety
export const MyComp: React.FC<z.infer<typeof myCompSchema>> = (props) => {...};
```

### Styling
- Use inline styles with `React.CSSProperties` type
- Define style objects as constants for reuse
- No CSS files - all styles are in TypeScript

```tsx
const containerStyle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: 100,
  position: "absolute",
};
```

### Constants
- Store shared values in `constants.ts` files
- Use SCREAMING_SNAKE_CASE for constants
- Export constants for use across components

### SVG Components
- Use `useState` with `random()` for unique gradient IDs to prevent conflicts
- Keep SVG inline in components for animation access

## TypeScript Configuration

Key settings in `tsconfig.json`:
- `strict: true` - Full strict type checking
- `noUnusedLocals: true` - Error on unused variables
- `jsx: "react-jsx"` - Modern JSX transform (no React import needed)
- `noEmit: true` - Type checking only, Remotion handles bundling

## Important Notes for AI Assistants

### When Adding New Compositions
1. Create component in `src/` or `src/HelloWorld/`
2. Define Zod schema for props
3. Register in `Root.tsx` with `<Composition>`
4. Export schema if needed for parametrized rendering

### When Creating Animations
1. Use `useCurrentFrame()` to get current frame
2. Use `spring()` for physics-based motion
3. Use `interpolate()` to map frame ranges to values
4. Use `<Sequence from={n}>` for time-delayed elements

### Frame Math
- Frame numbers are 0-indexed
- Duration calculation: `frames / fps = seconds`
- Example: 150 frames at 30fps = 5 seconds

### Common Gotchas
- Remotion re-renders for every frame - keep components pure
- Use `useMemo`/`useCallback` for expensive calculations
- Avoid side effects in render - videos must be deterministic
- Test animations in Remotion Studio before rendering

## Resources

- [Remotion Fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [Parametrized Rendering](https://www.remotion.dev/docs/parametrized-rendering)
- [Discord Community](https://discord.gg/6VzzNDwUwV)
- [GitHub Issues](https://github.com/remotion-dev/remotion/issues)
