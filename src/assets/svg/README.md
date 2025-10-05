# SVG Logos

This folder contains the logo components for fitness integrations.

## Available Logos

- **GarminLogo.tsx** - Garmin integration logo
- **AppleWatchLogo.tsx** - Apple Watch integration logo  
- **FitbitLogo.tsx** - Fitbit integration logo

## Usage

Import and use the logos in your components:

```tsx
import { GarminLogo, AppleWatchLogo, FitbitLogo } from '../assets/svg';

// In your component
<GarminLogo width={120} height={40} color="#fff" />
<AppleWatchLogo width={40} height={40} color="#fff" />
<FitbitLogo width={100} height={40} color="#fff" />
```

## Customization

These are placeholder logos. To replace with actual brand logos:

1. **Get official SVG files** from the brand's design resources
2. **Convert SVG to React Native components** using:
   - Online tool: https://react-svgr.com/playground/
   - Or manually convert SVG paths to react-native-svg components
3. **Replace the component code** while keeping the same interface (props: width, height, color)

## Props

All logo components accept:

- `width` (number, optional) - Width in pixels
- `height` (number, optional) - Height in pixels  
- `color` (string, optional) - Fill color (hex or named color)

## Example: Converting a Real SVG

If you have an SVG file like `garmin-logo.svg`:

```xml
<svg viewBox="0 0 100 50">
  <path d="M10 10 L90 10 L90 40 L10 40 Z" fill="#000"/>
</svg>
```

Convert to:

```tsx
import Svg, { Path } from 'react-native-svg';

const GarminLogo = ({ width = 100, height = 50, color = '#000' }) => (
  <Svg width={width} height={height} viewBox="0 0 100 50">
    <Path d="M10 10 L90 10 L90 40 L10 40 Z" fill={color} />
  </Svg>
);
```

