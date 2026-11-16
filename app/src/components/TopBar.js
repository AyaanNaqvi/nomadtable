import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Avatar from './Avatar';
import { useApp } from '../context/AppContext';
import { colors, spacing } from '../theme/colors';

export default function TopBar() {
  const navigation = useNavigation();
  const { user, unreadNotifCount, unreadChatCount } = useApp();

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Avatar
          initials={user.initials}
          color={user.color}
          size={30}
          ringPct={user.profileCompletionPct}
        />
      </TouchableOpacity>

      <View style={styles.brand}>
        <Ionicons name="planet-outline" size={18} color={colors.primary} />
        <Text style={styles.brandText}>nomadtable</Text>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={20} color={colors.text} />
          {unreadNotifCount > 0 && <View style={styles.dot} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.text} />
          {unreadChatCount > 0 && <View style={styles.dot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandText: { fontSize: 16, fontWeight: '800', color: colors.text },
  iconRow: { flexDirection: 'row', gap: spacing.sm },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
