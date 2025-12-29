import React, { createContext, useContext, useMemo } from 'react';
import { Platform } from 'react-native';

const ThemeContext = createContext(null);

export const palette = {
  obsidian: '#0A0A0A',
  graphite: '#1E1E1E',
  blueprint: '#0066FF',
  white: '#F5F7FA',
};

export const gradients = {
  steel: [
    'rgba(255,255,255,0.06)',
    'rgba(200,200,200,0.04)',
    'rgba(80,80,80,0.06)',
    'rgba(0,0,0,0.10)'
  ],
};

export const motion = {
  // Mechanical precision timings and curves
  duration: {
    xfast: 120,
    fast: 220,
    base: 320,
    slow: 520,
    xslow: 840,
  },
  easing: {
    // custom bezier curves
    inOutPrecision: Platform.select({
      web: 'cubic-bezier(0.33, 0.0, 0.13, 1.0)',
      default: undefined,
    }),
    magnetic: Platform.select({
      web: 'cubic-bezier(0.18, 0.58, 0.22, 1.0)',
      default: undefined,
    }),
  },
};

export function ThemeProvider({ children }) {
  const value = useMemo(() => ({ palette, gradients, motion }), []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
