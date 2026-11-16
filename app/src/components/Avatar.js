import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

export default function Avatar({
  initials,
  color = colors.primary,
  size = 40,
  ringPct,
  borderColor = '#fff',
}) {
  const ringSize = size + 10;
  const strokeWidth = 3;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.max(0, Math.min(100, ringPct ?? 0)) / 100);

  return (
    <View style={{ width: ringSize, height: ringSize, alignItems: 'center', justifyContent: 'center' }}>
      {ringPct != null && (
        <Svg width={ringSize} height={ringSize} style={StyleSheet.absoluteFill}>
          <Circle
            stroke={colors.divider}
            fill="none"
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={colors.primary}
            fill="none"
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
          />
        </Svg>
      )}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            borderColor,
          },
        ]}
      >
        <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  initials: {
    color: '#fff',
    fontWeight: '700',
  },
});
