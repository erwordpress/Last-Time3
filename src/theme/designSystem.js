// Lift Tech Design System — Engineering-Grade UI Kit for React Native Web
// This file defines extensive tokens, utilities, and style objects designed for
// industrial elegance, metallic depth, and mechanical motion language. It is
// intentionally large to codify a rigorous, scalable design foundation.

import { Platform, Dimensions } from 'react-native';

export const colors = {
  obsidian: '#0A0A0A',
  graphite: '#1E1E1E',
  carbon: '#121212',
  hematite: '#151515',
  slate: '#171717',
  shadow: '#0C0C0C',
  onyx: '#0F0F0F',
  chrome: '#D1D6DE',
  steel: '#AAB2BD',
  blueprint: '#0066FF',
  white: '#F5F7FA',
  glass: 'rgba(255,255,255,0.06)',
  glassStrong: 'rgba(255,255,255,0.12)',
  ink60: 'rgba(245,247,250,0.60)',
  ink75: 'rgba(245,247,250,0.75)',
  ink85: 'rgba(245,247,250,0.85)',
  ink90: 'rgba(245,247,250,0.90)',
  // Neon colors
  neonBlue: '#00F0FF',
  neonCyan: '#00FFFF',
  neonPurple: '#B026FF',
  neonPink: '#FF00FF',
  neonGreen: '#00FF41',
  neonYellow: '#FFFF00',
  neonOrange: '#FF6B00',
};

export const z = {
  base: 0,
  header: 20,
  overlay: 30,
  modal: 40,
  max: 50,
};

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const space = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 14,
  8: 16,
  9: 18,
  10: 20,
  11: 24,
  12: 28,
  13: 32,
  14: 36,
  15: 40,
  16: 48,
  17: 56,
  18: 64,
  19: 72,
  20: 96,
};

export const typography = {
  families: {
    sans: Platform.select({ web: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial', default: undefined }),
    mono: Platform.select({ web: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', default: undefined }),
  },
  sizes: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    h6: 20,
    h5: 22,
    h4: 24,
    h3: 28,
    h2: 34,
    h1: 44,
    display: 56,
  },
  weights: {
    regular: '400',
    medium: '600',
    bold: '700',
    heavy: '800',
  },
  tracking: {
    tight: 0.2,
    normal: 0.6,
    wide: 1.2,
    ultra: 1.6,
  },
};

export const shadows = {
  // Simulated metallic depth using layered rgba shadows. Web-only filters for gloss.
  card: Platform.select({
    web: '0 0.8px 1.6px rgba(0,0,0,0.42), 0 3.2px 12px rgba(0,0,0,0.28)',
    default: undefined,
  }),
  lift: Platform.select({
    web: '0 4px 16px rgba(0,0,0,0.36)',
    default: undefined,
  }),
  glowBlueprint: Platform.select({
    web: '0 0 0 1px rgba(0,102,255,0.35), 0 8px 24px rgba(0,102,255,0.25)',
    default: undefined,
  }),
  // Neon glow effects
  neonBlue: Platform.select({
    web: '0 0 10px rgba(0,240,255,0.5), 0 0 20px rgba(0,240,255,0.3), 0 0 30px rgba(0,240,255,0.2), 0 0 40px rgba(0,240,255,0.1)',
    default: undefined,
  }),
  neonCyan: Platform.select({
    web: '0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.3), 0 0 30px rgba(0,255,255,0.2)',
    default: undefined,
  }),
  neonPurple: Platform.select({
    web: '0 0 10px rgba(176,38,255,0.5), 0 0 20px rgba(176,38,255,0.3), 0 0 30px rgba(176,38,255,0.2)',
    default: undefined,
  }),
  neonPink: Platform.select({
    web: '0 0 10px rgba(255,0,255,0.5), 0 0 20px rgba(255,0,255,0.3), 0 0 30px rgba(255,0,255,0.2)',
    default: undefined,
  }),
  neonGreen: Platform.select({
    web: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3), 0 0 30px rgba(0,255,65,0.2)',
    default: undefined,
  }),
  neonButton: Platform.select({
    web: '0 0 15px rgba(0,240,255,0.6), 0 0 30px rgba(0,240,255,0.4), 0 0 45px rgba(0,240,255,0.2), inset 0 0 15px rgba(0,240,255,0.1)',
    default: undefined,
  }),
  neonCard: Platform.select({
    web: '0 0 20px rgba(0,240,255,0.3), 0 0 40px rgba(0,240,255,0.15), 0 0 60px rgba(0,240,255,0.1)',
    default: undefined,
  }),
};

export const gradients = {
  brushedSteel: 'linear-gradient(120deg, rgba(255,255,255,0.08), rgba(200,200,200,0.06), rgba(80,80,80,0.08), rgba(0,0,0,0.15))',
  deepChrome: 'radial-gradient(1000px 400px at 50% -20%, rgba(255,255,255,0.10), rgba(0,0,0,0.0)), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.4))',
  blueprintSheen: 'radial-gradient(600px 260px at 50% -10%, rgba(0,102,255,0.18), rgba(0,0,0,0))',
};

export const motion = {
  duration: {
    xfast: 120,
    fast: 220,
    base: 320,
    slow: 520,
    xslow: 840,
    panel: 680,
    hero: 1200,
  },
  easing: {
    inOutPrecision: Platform.select({ web: 'cubic-bezier(0.33, 0.0, 0.13, 1.0)', default: undefined }),
    magnetic: Platform.select({ web: 'cubic-bezier(0.18, 0.58, 0.22, 1.0)', default: undefined }),
    shaft: Platform.select({ web: 'cubic-bezier(0.20, 0.00, 0.00, 1.0)', default: undefined }),
  },
};

// Responsive breakpoints
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

// Responsive utilities
export const getResponsiveValue = (values) => {
  const { width } = Dimensions.get('window');
  if (width >= breakpoints.wide) return values.wide || values.desktop || values.tablet || values.mobile;
  if (width >= breakpoints.desktop) return values.desktop || values.tablet || values.mobile;
  if (width >= breakpoints.tablet) return values.tablet || values.mobile;
  return values.mobile;
};

export const isMobile = () => {
  const { width } = Dimensions.get('window');
  return width < breakpoints.tablet;
};

export const isTablet = () => {
  const { width } = Dimensions.get('window');
  return width >= breakpoints.tablet && width < breakpoints.desktop;
};

export const isDesktop = () => {
  const { width } = Dimensions.get('window');
  return width >= breakpoints.desktop;
};

export const layout = {
  container: {
    width: '100%',
    maxWidth: 1280,
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
  containerNarrow: {
    width: '100%',
    maxWidth: 960,
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
};

export const utilities = {
  cardSurface: {
    backgroundColor: colors.carbon,
    borderWidth: 1,
    borderColor: colors.glass,
    borderRadius: radius.md,
    ...(Platform.OS === 'web' ? { boxShadow: shadows.card } : null),
  },
  panelSurface: {
    backgroundColor: colors.onyx,
    borderWidth: 1,
    borderColor: colors.glass,
    borderRadius: radius.lg,
  },
  blueprintButton: {
    backgroundColor: colors.blueprint,
    paddingVertical: space[8],
    paddingHorizontal: space[10],
    borderRadius: radius.lg,
    ...(Platform.OS === 'web' ? { 
      transition: 'all 0.3s ease',
      boxShadow: '0 0 10px rgba(0,102,255,0.3)',
    } : null),
  },
  outlineButton: {
    borderColor: colors.glassStrong,
    borderWidth: 1,
    paddingVertical: space[8],
    paddingHorizontal: space[10],
    borderRadius: radius.lg,
    ...(Platform.OS === 'web' ? { 
      transition: 'all 0.3s ease',
    } : null),
  },
  neonButton: {
    backgroundColor: colors.blueprint,
    paddingVertical: space[8],
    paddingHorizontal: space[10],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neonCyan,
    ...(Platform.OS === 'web' ? { 
      transition: 'all 0.3s ease',
      boxShadow: shadows.neonButton,
    } : null),
  },
  neonOutlineButton: {
    borderColor: colors.neonCyan,
    borderWidth: 2,
    paddingVertical: space[8],
    paddingHorizontal: space[10],
    borderRadius: radius.lg,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web' ? { 
      transition: 'all 0.3s ease',
      boxShadow: '0 0 10px rgba(0,240,255,0.3)',
    } : null),
  },
  label: {
    color: colors.ink75,
    fontSize: typography.sizes.sm,
    letterSpacing: typography.tracking.normal,
  },
  title: {
    color: colors.white,
    fontWeight: typography.weights.heavy,
  },
  body: {
    color: colors.ink85,
  },
};

// Long-form style maps for repeated usage across the app. This purposely
// expresses a large, explicit, and production-grade styling grammar.
export const styles = {
  header: {
    container: {
      position: 'sticky',
      top: 0,
      zIndex: z.header,
      backgroundColor: 'rgba(10,10,10,0.86)',
      backdropFilter: 'blur(10px)',
      borderBottomWidth: 1,
      borderBottomColor: colors.glass,
    },
    inner: {
      ...layout.container,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    brand: {
      color: colors.white,
      fontSize: typography.sizes.h5,
      letterSpacing: typography.tracking.wide,
      fontWeight: typography.weights.heavy,
    },
    navRow: { 
      flexDirection: 'row', 
      alignItems: 'center',
    },
    navItem: { 
      paddingHorizontal: space[8], 
      paddingVertical: space[4] 
    },
    navText: { 
      color: colors.white, 
      fontSize: typography.sizes.md, 
      letterSpacing: typography.tracking.normal, 
      fontWeight: typography.weights.medium 
    },
  },
  hero: {
    stage: {
      height: 600,
      minHeight: 400,
      position: 'relative',
      overflow: 'hidden',
      borderBottomWidth: 1,
      borderBottomColor: colors.glass,
    },
    door: {
      backgroundColor: colors.slate,
      borderColor: colors.glass,
      borderWidth: 1,
    },
    copyWrap: { 
      position: 'absolute', 
      inset: 0, 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    headline: { 
      color: colors.white, 
      fontSize: typography.sizes.h2, 
      textAlign: 'center', 
      fontWeight: typography.weights.heavy, 
      letterSpacing: typography.tracking.wide,
    },
    ctas: { 
      flexDirection: 'row', 
      gap: space[8], 
      marginTop: space[9],
      alignItems: 'center',
    },
  },
  sections: {
    rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space[10] },
    card: { ...utilities.cardSurface, padding: space[10] },
    chip: { backgroundColor: colors.onyx, borderColor: colors.glass, borderWidth: 1, borderRadius: radius.sm, paddingVertical: space[4], paddingHorizontal: space[6] },
  },
  footer: {
    container: { borderTopWidth: 1, borderTopColor: colors.glass, paddingVertical: space[11], backgroundColor: colors.obsidian },
    inner: { ...layout.container },
    meta: { color: colors.ink75, fontSize: typography.sizes.sm, letterSpacing: typography.tracking.normal, marginBottom: space[6] },
    link: { color: colors.white, opacity: 0.74, fontSize: typography.sizes.sm },
  },
};
