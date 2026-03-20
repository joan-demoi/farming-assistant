// U-Farm Color Palette - Warm, Vibrant, Culturally Resonant for East African Farmers

export const Colors = {
  // Primary Colors
  primary: {
    emerald: '#10B981',      // Main brand color - Emerald Green
    emeraldLight: '#34D399', // Lighter emerald
    emeraldDark: '#059669',  // Darker emerald
    emeraldGlow: 'rgba(16, 185, 129, 0.15)', // Glow effect
  },
  
  // Accent Colors
  accent: {
    lime: '#BEF264',         // Lime Yellow - fresh, vibrant
    limeLight: '#D9F99D',    // Lighter lime
    gold: '#FACC15',         // Warm Gold - premium, harvest
    goldLight: '#FDE047',    // Lighter gold
    goldGlow: 'rgba(250, 204, 21, 0.3)', // Gold glow
  },
  
  // Background Colors
  background: {
    light: '#FEFCE8',        // Warm off-white / very light khaki
    lightWarm: '#FEF9C3',    // Warmer light
    dark: '#052E16',         // Deep forest green
    darkForest: '#064E3B',   // Slightly lighter forest
    darkCard: '#065F46',     // Card background in dark mode
  },
  
  // Text Colors
  text: {
    darkGreen: '#166534',    // Primary text - dark green
    light: '#FFFFFF',        // Light text
    muted: '#6B7280',        // Muted text
    mutedLight: '#9CA3AF',   // Muted in light mode
  },
  
  // Status Colors
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Calendar Colors
  calendar: {
    plant: '#10B981',        // Green for planting
    harvest: '#FACC15',      // Gold for harvest
    alert: '#EF4444',        // Red for alerts
  },
} as const;

// Light Theme
export const LightTheme = {
  background: Colors.background.light,
  card: '#FFFFFF',
  cardAlt: Colors.background.lightWarm,
  text: Colors.text.darkGreen,
  textMuted: Colors.text.muted,
  textInverse: Colors.text.light,
  border: 'rgba(16, 185, 129, 0.2)',
  borderStrong: 'rgba(16, 185, 129, 0.4)',
  primary: Colors.primary.emerald,
  primaryLight: Colors.primary.emeraldLight,
  accent: Colors.accent.gold,
  accentLight: Colors.accent.lime,
  shadow: 'rgba(5, 46, 22, 0.15)',
  overlay: 'rgba(5, 46, 22, 0.5)',
} as const;

// Dark Theme
export const DarkTheme = {
  background: Colors.background.dark,
  card: Colors.background.darkCard,
  cardAlt: Colors.background.darkForest,
  text: Colors.text.light,
  textMuted: Colors.text.mutedLight,
  textInverse: Colors.text.darkGreen,
  border: 'rgba(190, 242, 100, 0.2)',
  borderStrong: 'rgba(250, 204, 21, 0.4)',
  primary: Colors.accent.lime,
  primaryLight: Colors.accent.limeLight,
  accent: Colors.accent.gold,
  accentLight: Colors.primary.emeraldLight,
  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

export type ThemeColors = typeof LightTheme | typeof DarkTheme;

// Legacy default export for compatibility
const defaultColors = {
  light: {
    text: Colors.text.darkGreen,
    background: Colors.background.light,
    tint: Colors.primary.emerald,
    tabIconDefault: Colors.text.muted,
    tabIconSelected: Colors.primary.emerald,
  },
};

export default defaultColors;
