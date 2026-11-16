import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { useApp } from '../context/AppContext';
import { colors, radius, spacing } from '../theme/colors';

export default function EventSheet({ event, visible, onClose }) {
  const { actions, joinedEventIds } = useApp();
  if (!event) return null;
  const joined = joinedEventIds.includes(event.id);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            {event.sponsored ? (
              <View style={styles.sponsoredPill}>
                <Ionicons name="megaphone-outline" size={12} color={colors.textDim} />
                <Text style={styles.sponsoredText}>Sponsored</Text>
              </View>
            ) : (
              <View style={styles.categoryPill}>
                <Ionicons name={event.icon} size={12} color={event.color} />
                <Text style={[styles.sponsoredText, { color: event.color }]}>
                  {event.category}
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={colors.textDim} />
            </TouchableOpacity>
          </View>

          <View style={styles.inviteRow}>
            <Avatar initials={event.host.initials} color={event.host.color} size={30} />
            <Text style={styles.inviteText}>
              <Text style={styles.hostName}>{event.host.name}</Text> invites you to{' '}
              <Text style={styles.eventTitle}>{event.title}</Text>
            </Text>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={15} color={colors.textDim} />
            <Text style={styles.metaText}>{event.schedule}</Text>
          </View>

          <View style={styles.socialRow}>
            <View style={styles.attendeeStack}>
              {event.attendees.slice(0, 4).map((initials, i) => (
                <View key={i} style={[styles.stackAvatar, { marginLeft: i === 0 ? 0 : -10 }]}>
                  <Avatar initials={initials} size={26} color={colors.textFaint} borderColor="#fff" />
                </View>
              ))}
            </View>
            <Text style={styles.attendeeText}>
              {event.price} · {event.attendeesCount} interested
            </Text>
          </View>

          {joined ? (
            <View style={styles.joinedBanner}>
              <Ionicons name="checkmark-circle" size={18} color={colors.green} />
              <Text style={styles.joinedText}>You're going — see you there!</Text>
            </View>
          ) : (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.blue }]}
                onPress={() => {
                  actions.joinEvent(event.id);
                  Alert.alert('Tickets reserved', `You're in for "${event.title}".`);
                }}
              >
                <Ionicons name="ticket-outline" size={16} color="#fff" />
                <Text style={styles.actionBtnText}>Get Tickets</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.green }]}
                onPress={onClose}
              >
                <Ionicons name="chatbubble-outline" size={16} color="#fff" />
                <Text style={styles.actionBtnText}>Chat</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.notInterested}
            onPress={() => {
              actions.markNotInterested(event.id);
              onClose();
            }}
          >
            <Text style={styles.notInterestedText}>Not interested anymore</Text>
          </TouchableOpacity>

          {event.sponsored && (
            <Text style={styles.sponsorFooter}>Sponsored by {event.sponsor}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sponsoredPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sponsoredText: { fontSize: 11, color: colors.textDim, fontWeight: '600', textTransform: 'capitalize' },
  inviteRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm, alignItems: 'flex-start' },
  inviteText: { flex: 1, fontSize: 16, color: colors.text, lineHeight: 22 },
  hostName: { fontWeight: '700' },
  eventTitle: { color: colors.primary, fontWeight: '700' },
  description: { color: colors.textDim, fontSize: 14, lineHeight: 20, marginBottom: spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.md },
  metaText: { color: colors.textDim, fontSize: 13, fontWeight: '500' },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  attendeeStack: { flexDirection: 'row' },
  stackAvatar: { borderRadius: 999 },
  attendeeText: { color: colors.textDim, fontSize: 13, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 13,
    borderRadius: radius.pill,
  },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  joinedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EAFBF3',
    borderRadius: radius.pill,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  joinedText: { color: colors.green, fontWeight: '700', fontSize: 14 },
  notInterested: { alignItems: 'center', marginTop: spacing.md },
  notInterestedText: { color: colors.textFaint, fontSize: 13 },
  sponsorFooter: {
    textAlign: 'center',
    color: colors.textFaint,
    fontSize: 11,
    marginTop: spacing.sm,
  },
});
