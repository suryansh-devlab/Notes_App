export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  accentIndex: number;
}

export const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Project Ideas",
    content:
      "Build a clean notes app using Expo Router and React Native. Focus on smooth animations, dark/light theming, and a polished card-based UI that feels native on both iOS and Android.",
    date: "May 10, 2026",
    time: "10:45 PM",
    accentIndex: 0,
  },
  {
    id: "2",
    title: "React Native Assignment",
    content:
      "Timeline, requirements, and important components to use in the project. Need to cover FlatList, KeyboardAvoidingView, ImageBackground, useColorScheme, and useWindowDimensions.",
    date: "May 10, 2026",
    time: "09:15 PM",
    accentIndex: 1,
  },
  {
    id: "3",
    title: "Mobile Development Cohort",
    content:
      "Study plan, daily targets and important resources for the cohort. Week 1: basics & navigation. Week 2: state management. Week 3: APIs and async data.",
    date: "May 9, 2026",
    time: "08:30 PM",
    accentIndex: 2,
  },
  {
    id: "4",
    title: "UI/UX Inspiration",
    content:
      "Beautiful colors, typography and layout ideas for mobile app design. Explore Dribbble, Mobbin, and Awwwards for reference. Prioritize whitespace and visual rhythm.",
    date: "May 9, 2026",
    time: "07:20 PM",
    accentIndex: 3,
  },
  {
    id: "5",
    title: "Things to Remember",
    content:
      "Small notes about life, goals and important things to remember. Stay consistent. Progress over perfection. Hydrate. Read 20 minutes every day.",
    date: "May 8, 2026",
    time: "11:10 PM",
    accentIndex: 0,
  },
  {
    id: "6",
    title: "Book Recommendations",
    content:
      "Deep Work by Cal Newport, Atomic Habits by James Clear, The Pragmatic Programmer, Clean Code by Robert Martin. Start with Deep Work this month.",
    date: "May 7, 2026",
    time: "06:00 PM",
    accentIndex: 4,
  },
  {
    id: "7",
    title: "Weekly Goals",
    content:
      "Complete the notes app assignment, revise JavaScript promises and async/await, push 3 commits to GitHub, finish Chapter 5 of the cohort material.",
    date: "May 6, 2026",
    time: "09:00 AM",
    accentIndex: 5,
  },
];
