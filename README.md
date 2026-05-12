# MasterJi Notes App 📝

### React Native + Expo + TypeScript

A clean, polished Notes application with dark/light theming, responsive layouts, and strict TypeScript throughout.

---

## 📁 Project Structure

# NotesApp Folder Structure

```bash
NOTESAPP
│
├── .vscode/                # VS Code settings
├── assets/                 # Images, icons, fonts
├── node_modules/           # Installed packages
│
├── src/
│   │
│   ├── app/                # Expo Router screens
│   │   ├── _layout.tsx     # Root layout/navigation
│   │   └── index.tsx       # Entry screen
│   │
│   ├── constants/          # Constant values
│   │   └── colors.ts       # App color palette
│   │
│   ├── data/               # Static/mock data
│   │   └── notes.tsx       # Notes dummy data
│   │
│   └── screen/             # App screens
│       ├── NotesEditorScreen.tsx
│       └── NotesListScreen.tsx
│
├── .gitignore              # Ignored files
├── app.json                # Expo configuration
├── expo-env.d.ts           # Expo TypeScript types
├── package-lock.json       # Dependency lock file
├── package.json            # Project dependencies
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

---

## 🖥️ Screens

### View 1 — Notes Listing Screen (`NotesListScreen.tsx`)

| Feature          | Detail                                                   |
| ---------------- | -------------------------------------------------------- |
| `FlatList<Note>` | Generic-typed list; 1 col on phone, 2 col on tablet      |
| Note card        | Title, snippet (2 lines), timestamp, coloured accent bar |
| Search           | Live `useMemo`-filtered by title + content               |
| `Switch`         | Manual dark ↔ light override                             |
| FAB              | Floating `+` button to create a new note                 |
| `Pressable`      | Cards + FAB — both with press scale/opacity animations   |

### View 2 — Note Editor Screen (`NoteEditorScreen.tsx`)

| Feature                | Detail                                             |
| ---------------------- | -------------------------------------------------- |
| `KeyboardAvoidingView` | `padding` on iOS / `height` on Android             |
| `ImageBackground`      | Landscape hero with semi-transparent overlay       |
| Title `TextInput`      | Single-line, max 120 chars                         |
| Content `TextInput`    | Multiline, 2 000-char counter (turns red at limit) |
| Back `Pressable`       | Glassmorphism circle button                        |
| Save `Pressable`       | Pill button in nav + full-width at form bottom     |

---

## ⚛️ Core Components Used

| Component              | Screen(s)                     |
| ---------------------- | ----------------------------- |
| `FlatList`             | NotesListScreen               |
| `TextInput`            | Both (search, title, content) |
| `Pressable`            | Both (cards, FAB, Back, Save) |
| `Switch`               | NotesListScreen               |
| `KeyboardAvoidingView` | NoteEditorScreen              |
| `ImageBackground`      | NoteEditorScreen              |
| `ScrollView`           | NoteEditorScreen (form area)  |
| `SafeAreaView`         | NotesListScreen               |
| `StatusBar`            | Both                          |
| `View`, `Text`         | Both                          |

---

## 🪝 Hooks Used

| Hook                     | Type                 | Purpose                                                |
| ------------------------ | -------------------- | ------------------------------------------------------ |
| `useColorScheme()`       | `ColorSchemeName`    | Seeds `isDark` from system preference                  |
| `useWindowDimensions()`  | `{ width, height }`  | Responsive columns, padding, hero height               |
| `useState<Screen>`       | `'list' \| 'editor'` | Screen routing in App.tsx                              |
| `useState<Note \| null>` | `Note \| null`       | Selected note passed to editor                         |
| `useState<string>`       | `string`             | Search query, title, content                           |
| `useMemo`                | `Note[]`             | Filters note list without re-render on unrelated state |

---

## 🎨 Styling — Full Requirements Met

### `StyleSheet.create()`

Every style rule lives inside `StyleSheet.create()`. No raw inline object literals.

### `StyleSheet.flatten()`

Used in `NoteEditorScreen.tsx` to merge the theme-coloured base input:

```ts
const inputBase = StyleSheet.flatten([
  styles.inputBox,
  {
    backgroundColor: theme.inputBackground,
    borderColor: theme.border,
    color: theme.text,
  },
]);
```

### `StyleSheet.compose()`

Used on every `Pressable` to conditionally add the pressed style:

```ts
style={({ pressed }) =>
  StyleSheet.compose(cardBase, pressed ? styles.cardPressed : null)
}
```

Also used to compose the per-field variant on top of `inputBase`:

```ts
const titleInputStyle = StyleSheet.compose(inputBase, styles.titleInput);
const contentInputStyle = StyleSheet.compose(inputBase, styles.contentInput);
```

---

## 🌓 Dark / Light Theme

- `useColorScheme()` returns `'dark' | 'light' | null` and seeds the initial boolean
- `Switch` in `NotesListScreen` lets users override at runtime
- `lightTheme` / `darkTheme` are typed with the exported `Theme` interface
- All colour references are resolved from the active theme — no hardcoded values in components

---

## 📱 Responsive Layout (`useWindowDimensions`)

| Property           | Phone `< 768px`        | Tablet `≥ 768px`   |
| ------------------ | ---------------------- | ------------------ |
| Columns            | 1                      | 2                  |
| H-padding (list)   | 20                     | 32                 |
| H-padding (editor) | 20                     | 40                 |
| Hero height        | `min(200, 26% height)` | 260                |
| Card width         | `width − 40`           | `(width − 76) / 2` |

---

## 🔷 TypeScript Specifics

```ts
// Typed interfaces
export interface Note { id: string; title: string; content: string; date: string; time: string; accentIndex: number; }
export interface Theme { background: string; surface: string; ... }
type Screen = 'list' | 'editor';

// Typed generic FlatList
<FlatList<Note> data={filteredNotes} renderItem={renderItem} ... />

// Typed render item
const renderItem = ({ item }: ListRenderItemInfo<Note>): React.JSX.Element => ...

// Typed props interfaces for every component
interface NotesListScreenProps { isDark: boolean; onToggleTheme: () => void; ... }
interface NoteEditorScreenProps { note: Note | null; isDark: boolean; onBack: () => void; onSave: (note: Partial<Note>) => void; }
```

`tsconfig.json` uses `"strict": true` — no `any`, proper null checks throughout.

---

## ✨ UI Enhancements

- Colour-coded left accent bars on each note card (6-colour palette cycling)
- Press animations on cards (`scale 0.985`, `opacity 0.82`) and FAB (`scale 0.93`)
- `android_ripple` on all `Pressable` elements
- Character counter turns red at the 2 000-char limit
- Empty state with emoji when search returns no results
- Hero image dark overlay keeps nav text legible on any photo
- Shadows on iOS, `elevation` on Android for card lift

---
