import { Tabs } from "expo-router";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Bot, 
  Crown 
} from "lucide-react-native";
import React from "react";

import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/constants/colors";

export default function TabLayout() {
  const { theme, themeMode } = useTheme();
  
  const activeColor = themeMode === 'dark' ? Colors.accent.gold : Colors.primary.emerald;
  const inactiveColor = themeMode === 'dark' ? Colors.text.mutedLight : Colors.text.muted;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "AI",
          tabBarIcon: ({ color, size }) => <Bot size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: "Premium",
          tabBarIcon: ({ color, size }) => <Crown size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}