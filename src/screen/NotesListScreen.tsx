import React, { useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Theme, darkTheme, lightTheme, noteAccents } from "../constants/colors";
import { Note, SAMPLE_NOTES } from "../data/notes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NoteCardProps {
  note: Note;
  theme: Theme;
  onPress: (note: Note) => void;
  cardWidth: number;
}

interface NotesListScreenProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onSelectNote: (note: Note) => void;
  onAddNote: () => void;
}

// ─── Note Card ────────────────────────────────────────────────────────────────

function NoteCard({
  note,
  theme,
  onPress,
  cardWidth,
}: NoteCardProps): React.JSX.Element {
  const accent: string = noteAccents[note.accentIndex % noteAccents.length];

  const cardBase = StyleSheet.flatten([
    styles.card,
    {
      backgroundColor: theme.surface,
      shadowColor: theme.cardShadow,
      width: cardWidth,
    },
  ]);

  return (
    <Pressable
      style={({ pressed }) =>
        StyleSheet.compose(cardBase, pressed ? styles.cardPressed : null)
      }
      onPress={() => onPress(note)}
      android_ripple={{ color: theme.border, borderless: false }}
      accessibilityLabel={`Open note: ${note.title}`}
      accessibilityRole="button"
    >
      <View style={[styles.accentBar, { backgroundColor: accent }]} />
      <View style={styles.cardContent}>
        <Text
          style={[styles.cardTitle, { color: theme.text }]}
          numberOfLines={1}
        >
          {note.title}
        </Text>
        <Text
          style={[styles.cardSnippet, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {note.content}
        </Text>
        <View style={styles.cardMeta}>
          <Text style={[styles.metaIcon, { color: theme.textMuted }]}>📅</Text>
          <Text style={[styles.cardDate, { color: theme.textMuted }]}>
            {note.date} • {note.time}
          </Text>
        </View>
      </View>
      <Text style={[styles.chevron, { color: theme.textMuted }]}>›</Text>
    </Pressable>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function NotesListScreen({
  isDark,
  onToggleTheme,
  onSelectNote,
  onAddNote,
}: NotesListScreenProps): React.JSX.Element {
  const { width } = useWindowDimensions();
  const theme: Theme = isDark ? darkTheme : lightTheme;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const isTablet: boolean = width >= 768;
  const numColumns: number = isTablet ? 2 : 1;
  const horizontalPadding: number = isTablet ? 32 : 20;
  const columnGap: number = isTablet ? 12 : 0;
  const cardWidth: number = isTablet
    ? (width - horizontalPadding * 2 - columnGap) / 2
    : width - horizontalPadding * 2;

  const filteredNotes: Note[] = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_NOTES;
    const q: string = searchQuery.toLowerCase();
    return SAMPLE_NOTES.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<Note>): React.JSX.Element => (
    <NoteCard
      note={item}
      theme={theme}
      onPress={onSelectNote}
      cardWidth={cardWidth}
    />
  );

  const keyExtractor = (item: Note): string => item.id;

  const headerComponent: React.JSX.Element = (
    <View>
      {/* ── Top Bar ── */}
      <View style={[styles.topBar, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.logoRow}>
          <Text style={styles.logoEmoji}>🎓</Text>
          <Text style={[styles.logoText, { color: theme.primary }]}>
            MasterJi
          </Text>
        </View>
        <View style={styles.themeToggleRow}>
          <Text style={[styles.themeIcon, { color: theme.iconColor }]}>☀️</Text>
          <Switch
            value={isDark}
            onValueChange={onToggleTheme}
            trackColor={{ false: theme.switchTrack, true: theme.primary }}
            thumbColor={theme.switchThumb}
            ios_backgroundColor={theme.switchTrack}
            style={styles.switch}
            accessibilityLabel="Toggle dark mode"
          />
          <Text style={[styles.themeIcon, { color: theme.iconColor }]}>🌙</Text>
        </View>
      </View>

      {/* ── Greeting ── */}
      <View
        style={[
          styles.greetingSection,
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        <Text style={[styles.greetingLine, { color: theme.textSecondary }]}>
          Good Evening,{" "}
          <Text style={[styles.greetingName, { color: theme.primary }]}>
            Sur 👋
          </Text>
        </Text>
        <Text style={[styles.screenTitle, { color: theme.text }]}>
          My Notes
        </Text>
        <Text style={[styles.userName, { color: theme.textSecondary }]}>
          Suryansh Kushwaha
        </Text>
      </View>

      {/* ── Search ── */}
      <View
        style={[styles.searchWrapper, { paddingHorizontal: horizontalPadding }]}
      >
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.searchIcon, { color: theme.textMuted }]}>
            🔍
          </Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search notes..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityLabel="Search notes"
          />
        </View>
      </View>

      {/* ── Section Header ── */}
      <View
        style={[
          styles.sectionHeader,
          {
            paddingHorizontal: horizontalPadding,
            borderBottomColor: theme.divider,
          },
        ]}
      >
        <View style={styles.sectionLeft}>
          <Text style={[styles.folderIcon, { color: theme.textSecondary }]}>
            🗂️
          </Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            All Notes
          </Text>
        </View>
        <Text style={[styles.noteCount, { color: theme.textSecondary }]}>
          {filteredNotes.length} {filteredNotes.length === 1 ? "Note" : "Notes"}
        </Text>
      </View>
    </View>
  );

  const emptyComponent: React.JSX.Element = (
    <View style={styles.emptyState}>
      <Text style={styles.emptyEmoji}>📝</Text>
      <Text style={[styles.emptyText, { color: theme.textMuted }]}>
        No notes found
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <FlatList<Note>
        data={filteredNotes}
        key={String(numColumns)}
        numColumns={numColumns}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: horizontalPadding },
        ]}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
      />

      {/* ── FAB ── */}
      <Pressable
        style={({ pressed }) =>
          StyleSheet.compose(
            [styles.fab, { backgroundColor: theme.primary }],
            pressed ? styles.fabPressed : null,
          )
        }
        onPress={onAddNote}
        android_ripple={{ color: "rgba(255,255,255,0.3)", borderless: true }}
        accessibilityLabel="Create new note"
        accessibilityRole="button"
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },

  // Top bar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 16 : 12,
    paddingBottom: 4,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoEmoji: {
    fontSize: 22,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  themeToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  themeIcon: {
    fontSize: 16,
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },

  // Greeting
  greetingSection: {
    marginTop: 22,
    marginBottom: 20,
  },
  greetingLine: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  greetingName: {
    fontWeight: "700",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 3,
  },
  userName: {
    fontSize: 14,
    fontWeight: "400",
  },

  // Search
  searchWrapper: {
    marginBottom: 22,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 4,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    marginBottom: 6,
    borderBottomWidth: 1,
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  folderIcon: {
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  noteCount: {
    fontSize: 13,
    fontWeight: "500",
  },

  // Cards
  columnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  accentBar: {
    width: 4,
    borderRadius: 2,
    margin: 12,
    marginRight: 0,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 12,
    paddingRight: 4,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  cardSnippet: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 19,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  metaIcon: {
    fontSize: 11,
  },
  cardDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 24,
    fontWeight: "300",
    paddingHorizontal: 14,
    alignSelf: "center",
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5B4EFA",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 12,
    elevation: 8,
  },
  fabPressed: {
    transform: [{ scale: 0.93 }],
    opacity: 0.9,
  },
  fabIcon: {
    fontSize: 30,
    color: "#FFFFFF",
    lineHeight: 34,
    fontWeight: "300",
  },
});
