// MapSVG.tsx
import React from 'react';
import { Svg, Circle, Rect, Path } from 'react-native-svg';

const MapSVG: React.FC = () => (
  <Svg height="200" width="200" viewBox="0 0 100 100">
    <Rect width="100%" height="100%" fill="#f5f5f5" />
    <Path d="M10 30 L30 10 L50 30 L70 10 L90 30 L70 50 L50 30 L30 50 Z" fill="yellow" />
    <Circle cx="50" cy="50" r="5" fill="red" />
  </Svg>
);

export default MapSVG;