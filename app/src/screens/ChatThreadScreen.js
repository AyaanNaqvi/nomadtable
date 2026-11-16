import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Avatar from '../components/Avatar';
import { colors, radius, spacing } from '../theme/colors';

export default function ChatThreadScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const conversation = params?.conversation;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    { id: 'm1', fromMe: false, text: conversation?.lastMessage ?? 'Hey!' },
    { id: 'm2', fromMe: true, text: "Yes, I'll be there 🙌" },
  ]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: `m${prev.length + 1}`, fromMe: true, text }]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Avatar initials={conversation?.initials ?? '??'} color={conversation?.color} size={32} />
        <Text style={styles.headerName}>{conversation?.name ?? 'Chat'}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing.md, gap: spacing.sm }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.fromMe ? styles.bubbleMine : styles.bubbleTheirs,
            ]}
          >
            <Text style={[styles.bubbleText, item.fromMe && { color: '#fff' }]}>{item.text}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor={colors.textFaint}
            value={text}
            onChangeText={setText}
            onSubmitEditing={send}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Ionicons name="send" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backBtn: { marginRight: 2 },
  headerName: { fontSize: 16, fontWeight: '700', color: colors.text },
  bubble: { maxWidth: '75%', borderRadius: radius.md, padding: 12 },
  bubbleTheirs: { backgroundColor: colors.bg, alignSelf: 'flex-start' },
  bubbleMine: { backgroundColor: colors.primary, alignSelf: 'flex-end' },
  bubbleText: { fontSize: 14, color: colors.text },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  input: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
