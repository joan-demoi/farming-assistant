import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Language, getTranslation, type Translations } from '@/translations';
export { type Language };

const LANGUAGE_STORAGE_KEY = '@ufarm_language';

export const [LanguageProvider, useLanguage] = createContextHook(() => {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && ['en', 'sw', 'lg'].includes(saved)) {
        setCurrentLanguageState(saved as Language);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = useCallback(async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      setCurrentLanguageState(lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  }, []);

  const t = useCallback((key: keyof Translations, params?: Record<string, string>) => {
    return getTranslation(currentLanguage, key, params);
  }, [currentLanguage]);

  return useMemo(() => ({
    currentLanguage,
    setLanguage,
    t,
    isLoading,
  }), [currentLanguage, setLanguage, t, isLoading]);
});