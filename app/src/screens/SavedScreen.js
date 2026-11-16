import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { EVENTS } from '../data/mockData';
import { colors, radius, spacing } from '../theme/colors';

export default function SavedScreen() {
  const { savedEventIds, joinedEventIds, actions } = useApp();

  const savedEvents = useMemo(
    () => EVENTS.filter((e) => savedEventIds.includes(e.id)),
    [savedEventIds]
  );
  const joinedEvents = useMemo(
    () => EVENTS.filter((e) => joinedEventIds.includes(e.id)),
    [joinedEventIds]
  );

  const sections = [
    { title: 'Going', data: joinedEvents },
    { title: 'Saved', data: savedEvents },
  ].filter((s) => s.data.length);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>Saved</Text>

      {sections.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={36} color={colors.textFaint} />
          <Text style={styles.emptyText}>
            Events you save or join will show up here. Tap the bookmark on any event card.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(s) => s.title}
          contentContainerStyle={{ padding: spacing.md, paddingBottom: 90 }}
          renderItem={({ item: section }) => (
            <View style={{ marginBottom: spacing.md }}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.data.map((ev) => (
                <View key={ev.id} style={styles.card}>
                  <View style={[styles.icon, { backgroundColor: ev.color }]}>
                    <Ionicons name={ev.icon} size={18} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {ev.title}
                    </Text>
                    <Text style={styles.cardSub}>{ev.schedule}</Text>
                  </View>
                  <TouchableOpacity onPress={() => actions.toggleSaveEvent(ev.id)}>
                    <Ionicons name="bookmark" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.textDim, marginBottom: spacing.sm, textTransform: 'uppercase' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  cardSub: { fontSize: 12, color: colors.textDim, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingHorizontal: spacing.xl },
  emptyText: { textAlign: 'center', color: colors.textFaint, fontSize: 13, lineHeight: 20 },
});
