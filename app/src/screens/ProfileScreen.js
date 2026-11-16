import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { colors, radius, spacing } from '../theme/colors';

export default function ProfileScreen() {
  const { user, joinedEventIds } = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar
            initials={user.initials}
            color={user.color}
            size={72}
            ringPct={user.profileCompletionPct}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.sub}>Based in {user.homeCity}</Text>
        </View>

        <View style={styles.completionCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.completionTitle}>
              Profile {user.profileCompletionPct}% complete
            </Text>
            <Text style={styles.completionSub}>
              Add a bio and 2 more photos to get more invites
            </Text>
          </View>
          <TouchableOpacity style={styles.completionBtn}>
            <Text style={styles.completionBtnText}>Finish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <Stat label="Countries" value="12" />
          <Stat label="Events joined" value={String(joinedEventIds.length)} />
          <Stat label="Connections" value="86" />
        </View>

        <View style={styles.menu}>
          <MenuRow icon="person-outline" label="Edit profile" />
          <MenuRow icon="shield-checkmark-outline" label="Safety & verification" />
          <MenuRow icon="notifications-outline" label="Notification settings" />
          <MenuRow icon="lock-closed-outline" label="Privacy" />
          <MenuRow icon="help-circle-outline" label="Help center" />
          <MenuRow icon="log-out-outline" label="Log out" danger />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuRow({ icon, label, danger }) {
  return (
    <TouchableOpacity style={styles.menuRow}>
      <Ionicons name={icon} size={18} color={danger ? colors.primary : colors.textDim} />
      <Text style={[styles.menuLabel, danger && { color: colors.primary }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: spacing.md, paddingBottom: 90 },
  header: { alignItems: 'center', marginBottom: spacing.md },
  name: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: spacing.sm },
  sub: { fontSize: 13, color: colors.textDim, marginTop: 2 },
  completionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FDEDEF',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  completionTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  completionSub: { fontSize: 12, color: colors.textDim, marginTop: 2 },
  completionBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  completionBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 11, color: colors.textDim, marginTop: 2 },
  menu: { borderTopWidth: 1, borderTopColor: colors.divider },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.text },
});
