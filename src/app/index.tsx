import React, { useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import { Note } from "../data/notes";
import NoteEditorScreen from "../screen/NotesEditorScreen";
import NotesListScreen from "../screen/NotesListScreen";

// ─── Screen types ─────────────────────────────────────────────────────────────

type Screen = "list" | "editor";

// ─── App Entry ────────────────────────────────────────────────────────────────

export default function App(): React.JSX.Element {
  const systemScheme: ColorSchemeName = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemScheme === "dark");

  const [currentScreen, setCurrentScreen] = useState<Screen>("list");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleToggleTheme(): void {
    setIsDark((prev) => !prev);
  }

  function handleSelectNote(note: Note): void {
    setSelectedNote(note);
    setCurrentScreen("editor");
  }

  function handleAddNote(): void {
    setSelectedNote(null);
    setCurrentScreen("editor");
  }

  function handleBack(): void {
    setCurrentScreen("list");
    setSelectedNote(null);
  }

  function handleSave(_updatedNote: Partial<Note>): void {
    setCurrentScreen("list");
    setSelectedNote(null);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (currentScreen === "editor") {
    return (
      <NoteEditorScreen
        note={selectedNote}
        isDark={isDark}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  return (
    <NotesListScreen
      isDark={isDark}
      onToggleTheme={handleToggleTheme}
      onSelectNote={handleSelectNote}
      onAddNote={handleAddNote}
    />
  );
}
