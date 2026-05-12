export interface Theme {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  inputBackground: string;
  cardShadow: string;
  primary: string;
  primaryLight: string;
  switchTrack: string;
  switchThumb: string;
  iconColor: string;
  divider: string;
}

const palette = {
  primary: "#5B4EFA",
  primaryLight: "#7B6FFB",
  primaryDark: "#4338E0",

  accentGreen: "#22C55E",
  accentOrange: "#F59E0B",
  accentPink: "#EC4899",
  accentPurple: "#8B5CF6",
  accentBlue: "#3B82F6",
} as const;

export const lightTheme: Theme = {
  background: "#F5F4FF",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EFFF",
  text: "#0D0C1D",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E4F7",
  inputBackground: "#F9F8FF",
  cardShadow: "rgba(91, 78, 250, 0.10)",
  primary: palette.primary,
  primaryLight: palette.primaryLight,
  switchTrack: "#D1D5DB",
  switchThumb: "#FFFFFF",
  iconColor: "#374151",
  divider: "#E5E4F7",
};

export const darkTheme: Theme = {
  background: "#0D0C1D",
  surface: "#1A1930",
  surfaceAlt: "#141326",
  text: "#F0EFFF",
  textSecondary: "#A8A3C9",
  textMuted: "#6B6890",
  border: "#2A2845",
  inputBackground: "#1F1E35",
  cardShadow: "rgba(0,0,0,0.40)",
  primary: palette.primaryLight,
  primaryLight: palette.primaryLight,
  switchTrack: "#3F3C6A",
  switchThumb: "#FFFFFF",
  iconColor: "#C4C0E8",
  divider: "#2A2845",
};

export const noteAccents: string[] = [
  palette.primary,
  palette.accentGreen,
  palette.accentOrange,
  palette.accentPink,
  palette.accentBlue,
  palette.accentPurple,
];
