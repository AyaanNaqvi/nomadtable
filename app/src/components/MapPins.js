import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { colors, radius } from '../theme/colors';

export function TravelerPin({ traveler, onPress, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(traveler)}
      style={[styles.pinWrap, style]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Avatar initials={traveler.initials} color={traveler.color} size={36} />
      <View style={styles.flagBadge}>
        <Text style={styles.flagText}>{traveler.country}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function EventPin({ event, onPress, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(event)}
      style={[styles.pinWrap, style]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={[styles.eventPin, { backgroundColor: event.color }]}>
        <Ionicons name={event.icon} size={17} color="#fff" />
      </View>
      <View style={[styles.pinPointer, { borderTopColor: event.color }]} />
    </TouchableOpacity>
  );
}

export function PricePin({ hostel, onPress, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress(hostel)}
      style={[styles.priceWrap, style]}
    >
      <Text style={styles.priceText}>{hostel.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pinWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  flagBadge: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 999,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: { fontSize: 9 },
  eventPin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pinPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  priceWrap: {
    position: 'absolute',
    backgroundColor: colors.text,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
