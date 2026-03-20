import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Colors, LightTheme, DarkTheme, type ThemeColors } from '@/constants/colors';

const THEME_STORAGE_KEY = '@ufarm_theme';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  theme: ThemeColors;
  colors: typeof Colors;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  isLoading: boolean;
  isDark: boolean;
}