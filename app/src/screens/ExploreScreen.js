import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import MapBackground from '../components/MapBackground';
import { TravelerPin, EventPin, PricePin } from '../components/MapPins';
import CategoryChips from '../components/CategoryChips';
import EventSheet from '../components/EventSheet';
import TravelerSheet from '../components/TravelerSheet';
import Avatar from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { TRAVELERS, EVENTS, HOSTELS, CATEGORIES } from '../data/mockData';
import { colors, radius, spacing } from '../theme/colors';

export default function ExploreScreen() {
  const { notInterestedIds } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('map');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);

  const visibleEvents = useMemo(
    () =>
      EVENTS.filter((e) => !notInterestedIds.includes(e.id)).filter(
        (e) => activeCategory === 'all' || e.category === activeCategory
      ),
    [activeCategory, notInterestedIds]
  );

  const counts = useMemo(() => {
    const base = { all: EVENTS.filter((e) => !notInterestedIds.includes(e.id)).length };
    CATEGORIES.forEach((c) => {
      if (c.id === 'all') return;
      base[c.id] = EVENTS.filter(
        (e) => e.category === c.id && !notInterestedIds.includes(e.id)
      ).length;
    });
    return base;
  }, [notInterestedIds]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <TopBar />

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={colors.textFaint} />
          <TextInput
            placeholder="Search city, event, or traveler"
            placeholderTextColor={colors.textFaint}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.suggestPill}>
          <Ionicons name="sparkles-outline" size={14} color={colors.primary} />
          <Text style={styles.suggestText}>Suggest</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chipsRow}>
        <CategoryChips
          categories={CATEGORIES}
          activeId={activeCategory}
          onSelect={setActiveCategory}
          counts={counts}
        />
      </View>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapBackground />

          <TouchableOpacity style={styles.travelersPill}>
            <Text style={styles.travelersPillText}>100+ Travelers Here</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.text} />
          </TouchableOpacity>

          {TRAVELERS.map((t) => (
            <TravelerPin
              key={t.id}
              traveler={t}
              onPress={setSelectedTraveler}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                marginLeft: -18,
                marginTop: -18,
              }}
            />
          ))}

          {visibleEvents.map((ev) => (
            <EventPin
              key={ev.id}
              event={ev}
              onPress={setSelectedEvent}
              style={{
                left: `${ev.x}%`,
                top: `${ev.y}%`,
                marginLeft: -17,
                marginTop: -34,
              }}
            />
          ))}

          {HOSTELS.map((h) => (
            <PricePin
              key={h.id}
              hostel={h}
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
                marginLeft: -20,
              }}
            />
          ))}

          <View style={styles.mapControls}>
            <TouchableOpacity
              style={styles.listToggle}
              onPress={() => setViewMode('list')}
            >
              <Ionicons name="list-outline" size={15} color={colors.text} />
              <Text style={styles.listToggleText}>List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locateBtn}>
              <Ionicons name="navigate-outline" size={17} color={colors.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.fab}>
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={visibleEvents}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{ padding: spacing.md, gap: spacing.sm, paddingBottom: 90 }}
          ListHeaderComponent={
            <TouchableOpacity style={styles.mapToggleBtn} onPress={() => setViewMode('map')}>
              <Ionicons name="map-outline" size={15} color={colors.text} />
              <Text style={styles.listToggleText}>Map view</Text>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listCard} onPress={() => setSelectedEvent(item)}>
              <View style={[styles.listIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.listSub}>
                  {item.schedule} · {item.price}
                </Text>
              </View>
              <Avatar initials={item.host.initials} color={item.host.color} size={28} />
            </TouchableOpacity>
          )}
        />
      )}

      <EventSheet
        event={selectedEvent}
        visible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
      <TravelerSheet
        traveler={selectedTraveler}
        visible={!!selectedTraveler}
        onClose={() => setSelectedTraveler(null)}
        onChat={() => setSelectedTraveler(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 13, color: colors.text },
  suggestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FDEDEF',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  suggestText: { color: colors.primary, fontWeight: '700', fontSize: 12 },
  chipsRow: { paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  mapContainer: {
    flex: 1,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  travelersPill: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  travelersPillText: { fontSize: 12, fontWeight: '700', color: colors.text },
  mapControls: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.sm,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  listToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listToggleText: { fontSize: 12, fontWeight: '700', color: colors.text },
  locateBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.sm,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  list: { flex: 1 },
  mapToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: spacing.sm,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  listSub: { fontSize: 12, color: colors.textDim, marginTop: 2 },
});
