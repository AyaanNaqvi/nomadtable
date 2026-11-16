import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { colors, radius, spacing } from '../theme/colors';

export default function TravelerSheet({ traveler, visible, onClose, onChat }) {
  if (!traveler) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <Avatar initials={traveler.initials} color={traveler.color} size={56} />
          <Text style={styles.name}>
            {traveler.name} {traveler.country}
          </Text>
          <Text style={styles.sub}>Nearby now</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={onChat}
            >
              <Ionicons name="chatbubble-outline" size={16} color="#fff" />
              <Text style={styles.actionBtnText}>Say hi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.secondaryBtn]} onPress={onClose}>
              <Text style={[styles.actionBtnText, { color: colors.textDim }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: 260,
  },
  name: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: spacing.sm },
  sub: { fontSize: 13, color: colors.textDim, marginTop: 2, marginBottom: spacing.md },
  actionRow: { flexDirection: 'row', gap: spacing.sm, width: '100%' },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: radius.pill,
  },
  secondaryBtn: { backgroundColor: colors.bg },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
