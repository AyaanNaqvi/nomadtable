import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

export default function MapBackground() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none">
      <Rect x={0} y={0} width={400} height={600} fill={colors.mapLand} />

      <Path
        d="M0,120 C80,140 140,90 220,110 C300,130 340,90 400,110 L400,180 C320,160 280,200 200,180 C120,160 70,200 0,180 Z"
        fill={colors.mapWater}
        opacity={0.9}
      />
      <Path
        d="M0,340 C90,320 150,370 240,350 C310,335 350,370 400,355 L400,420 C330,400 280,430 210,415 C130,400 70,430 0,410 Z"
        fill={colors.mapWater}
        opacity={0.9}
      />
      <Path
        d="M60,0 C80,80 40,160 70,240 C95,305 60,380 80,460 C95,520 70,560 90,600 L150,600 C130,540 160,480 140,420 C120,360 150,300 130,240 C115,190 140,120 120,60 C110,30 120,10 110,0 Z"
        fill={colors.mapWater}
        opacity={0.85}
      />

      <Path d="M20,60 L20,600" stroke="#FFFFFF" strokeWidth={4} opacity={0.7} />
      <Path d="M200,0 L200,600" stroke="#FFFFFF" strokeWidth={5} opacity={0.7} />
      <Path d="M0,250 L400,250" stroke="#FFFFFF" strokeWidth={4} opacity={0.7} />
      <Path d="M0,470 L400,470" stroke="#FFFFFF" strokeWidth={5} opacity={0.7} />
      <Path d="M330,0 L330,600" stroke="#FFFFFF" strokeWidth={3} opacity={0.6} />
      <Path d="M0,50 L400,80" stroke="#FFFFFF" strokeWidth={2.5} opacity={0.5} />
      <Path d="M0,530 L400,505" stroke="#FFFFFF" strokeWidth={2.5} opacity={0.5} />

      <Rect x={250} y={470} width={70} height={60} rx={8} fill={colors.mapPark} opacity={0.9} />
      <Rect x={40} y={200} width={55} height={40} rx={8} fill={colors.mapPark} opacity={0.9} />

      {Array.from({ length: 26 }).map((_, i) => {
        const bx = (i * 53) % 380 + 10;
        const by = Math.floor(i / 8) * 145 + 30 + ((i * 37) % 40);
        const bw = 14 + (i % 3) * 6;
        const bh = 10 + (i % 4) * 5;
        return (
          <Rect
            key={i}
            x={bx}
            y={by}
            width={bw}
            height={bh}
            rx={2}
            fill="#FFFFFF"
            opacity={0.55}
          />
        );
      })}

      {Array.from({ length: 8 }).map((_, i) => (
        <Circle
          key={`buoy-${i}`}
          cx={(i * 71 + 30) % 400}
          cy={130 + ((i * 53) % 30)}
          r={2.2}
          fill="#FFFFFF"
          opacity={0.6}
        />
      ))}
    </Svg>
  );
}
