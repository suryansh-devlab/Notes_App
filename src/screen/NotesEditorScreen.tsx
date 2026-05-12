import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Theme, darkTheme, lightTheme } from "../constants/colors";
import { Note } from "../data/notes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NoteEditorScreenProps {
  note: Note | null;
  isDark: boolean;
  onBack: () => void;
  onSave: (note: Partial<Note>) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HEADER_IMAGE: ImageSourcePropType = {
  uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
};

const MAX_CHARS = 2000;

// ─── Component ────────────────────────────────────────────────────────────────

export default function NoteEditorScreen({
  note,
  isDark,
  onBack,
  onSave,
}: NoteEditorScreenProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const theme: Theme = isDark ? darkTheme : lightTheme;

  const isTablet: boolean = width >= 768;
  const horizontalPadding: number = isTablet ? 40 : 20;
  const heroHeight: number = isTablet ? 260 : Math.min(200, height * 0.26);

  const [title, setTitle] = useState<string>(note?.title ?? "");
  const [content, setContent] = useState<string>(note?.content ?? "");

  const charCount: number = content.length;
  const isOverLimit: boolean = charCount > MAX_CHARS;

  function handleSave(): void {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please add a title before saving.");
      return;
    }
    if (isOverLimit) {
      Alert.alert("Too Long", `Content exceeds ${MAX_CHARS} characters.`);
      return;
    }
    onSave({ ...note, title: title.trim(), content });
  }

  // StyleSheet.flatten() used to build the base, then StyleSheet.compose() applied per field
  const inputBase = StyleSheet.flatten([
    styles.inputBox,
    {
      backgroundColor: theme.inputBackground,
      borderColor: theme.border,
      color: theme.text,
    },
  ]) as React.ComponentProps<typeof TextInput>["style"];

  const titleInputStyle = StyleSheet.compose(
    inputBase,
    styles.titleInput,
  ) as React.ComponentProps<typeof TextInput>["style"];
  const contentInputStyle = StyleSheet.compose(
    inputBase,
    styles.contentInput,
  ) as React.ComponentProps<typeof TextInput>["style"];

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* ── Hero Image Header ── */}
        <ImageBackground
          source={HEADER_IMAGE}
          style={[styles.hero, { height: heroHeight }]}
          imageStyle={styles.heroImage}
          resizeMode="cover"
          accessibilityLabel="Hero landscape background"
        >
          <View style={styles.heroOverlay} />

          {/* Nav row */}
          <View
            style={[styles.navRow, { paddingHorizontal: horizontalPadding }]}
          >
            <Pressable
              style={({ pressed }) =>
                StyleSheet.compose(
                  styles.navBtn,
                  pressed ? styles.navBtnPressed : null,
                )
              }
              onPress={onBack}
              android_ripple={{
                color: "rgba(255,255,255,0.2)",
                borderless: false,
              }}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Text style={styles.navBtnArrow}>←</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) =>
                StyleSheet.compose(
                  [styles.saveBtn, { backgroundColor: theme.primary }],
                  pressed ? styles.saveBtnPressed : null,
                )
              }
              onPress={handleSave}
              android_ripple={{
                color: "rgba(255,255,255,0.25)",
                borderless: false,
              }}
              accessibilityLabel="Save note"
              accessibilityRole="button"
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
          </View>

          {/* Hero title */}
          <View
            style={[
              styles.heroTitleRow,
              { paddingHorizontal: horizontalPadding },
            ]}
          >
            <Text style={styles.heroTitle}>
              {note ? "Edit Note" : "New Note"}
            </Text>
            <Text style={styles.heroSubtitle}>Write your thoughts...</Text>
          </View>
        </ImageBackground>

        {/* ── Form Panel ── */}
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.formContent,
            { paddingHorizontal: horizontalPadding, paddingBottom: 48 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title field */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldLabelRow}>
              <Text style={[styles.fieldIcon, { color: theme.primary }]}>
                📋
              </Text>
              <Text style={[styles.fieldLabel, { color: theme.text }]}>
                Note Title
              </Text>
            </View>
            <TextInput
              style={titleInputStyle}
              placeholder="Enter note title..."
              placeholderTextColor={theme.textMuted}
              value={title}
              onChangeText={setTitle}
              maxLength={120}
              returnKeyType="next"
              selectionColor={theme.primary}
              accessibilityLabel="Note title input"
            />
          </View>

          {/* Content field */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldLabelRow}>
              <Text style={[styles.fieldIcon, { color: theme.primary }]}>
                ☰
              </Text>
              <Text style={[styles.fieldLabel, { color: theme.text }]}>
                Note Content
              </Text>
            </View>
            <TextInput
              style={contentInputStyle}
              placeholder="Start writing your note here..."
              placeholderTextColor={theme.textMuted}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              selectionColor={theme.primary}
              scrollEnabled={false}
              accessibilityLabel="Note content input"
            />
            <Text
              style={[
                styles.charCounter,
                { color: isOverLimit ? "#EF4444" : theme.textMuted },
              ]}
            >
              {charCount} / {MAX_CHARS}
            </Text>
          </View>

          {/* Bottom Save button */}
          <Pressable
            style={({ pressed }) =>
              StyleSheet.compose(
                [styles.bottomSaveBtn, { backgroundColor: theme.primary }],
                pressed ? styles.saveBtnPressed : null,
              )
            }
            onPress={handleSave}
            android_ripple={{
              color: "rgba(255,255,255,0.25)",
              borderless: false,
            }}
            accessibilityLabel="Save note"
            accessibilityRole="button"
          >
            <Text style={styles.bottomSaveBtnText}>💾 Save Note</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },

  // Hero
  hero: {
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  heroImage: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 8, 30, 0.52)",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  // Nav
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 56 : 44,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.93 }],
  },
  navBtnArrow: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  saveBtn: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
  },
  saveBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  // Hero text
  heroTitleRow: {
    paddingBottom: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.72)",
    marginTop: 3,
    fontWeight: "400",
  },

  // Form
  formContent: {
    paddingTop: 26,
    gap: 4,
  },
  fieldGroup: {
    marginBottom: 20,
    gap: 10,
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldIcon: {
    fontSize: 17,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.1,
  },

  // Base input box (flattened then composed per field above)
  inputBox: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    fontWeight: "400",
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 16,
  },
  contentInput: {
    minHeight: 180,
    lineHeight: 22,
    paddingTop: 14,
  },

  charCounter: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  // Bottom save
  bottomSaveBtn: {
    marginTop: 8,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#5B4EFA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  bottomSaveBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
