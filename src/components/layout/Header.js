import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Platform, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { colors, styles as ds, motion, breakpoints, isMobile } from '../../theme/designSystem';

function NavItem({ label, to }) {
  const navigation = useNavigation();
  const { palette, motion } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const underline = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const onPress = () => navigation.navigate(to);

  const onHoverIn = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.04,
        duration: motion.duration.fast,
        easing: Platform.OS === 'web' ? undefined : undefined,
        useNativeDriver: true,
      }),
      Animated.timing(underline, {
        toValue: 1,
        duration: motion.duration.base,
        useNativeDriver: false,
      }),
      Animated.timing(glow, {
        toValue: 1,
        duration: motion.duration.fast,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const onHoverOut = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: motion.duration.fast,
        useNativeDriver: true,
      }),
      Animated.timing(underline, {
        toValue: 0,
        duration: motion.duration.fast,
        useNativeDriver: false,
      }),
      Animated.timing(glow, {
        toValue: 0,
        duration: motion.duration.fast,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const width = underline.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.8] });

  return (
    <Pressable onPress={onPress} onHoverIn={onHoverIn} onHoverOut={onHoverOut} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={{
          color: palette.white,
          fontSize: 14,
          letterSpacing: 1.2,
          fontWeight: '600',
          ...(Platform.OS === 'web' ? {
            textShadow: glow.interpolate({
              inputRange: [0, 1],
              outputRange: ['none', `0 0 10px rgba(0,240,255,0.8), 0 0 20px rgba(0,240,255,0.5)`],
            }),
          } : {}),
        }}>
          {label}
        </Text>
        <Animated.View style={{
          height: 2,
          backgroundColor: glow.interpolate({
            inputRange: [0, 1],
            outputRange: [palette.blueprint, '#00F0FF'],
          }),
          width,
          marginTop: 6,
          borderRadius: 1,
          ...(Platform.OS === 'web' ? {
            boxShadow: glow.interpolate({
              inputRange: [0, 1],
              outputRange: ['none', '0 0 10px rgba(0,240,255,0.8)'],
            }),
          } : {}),
        }} />
      </Animated.View>
    </Pressable>
  );
}

export default function Header({ onDrawerToggle }) {
  const { palette } = useTheme();
  const navigation = useNavigation();
  const [elev, setElev] = useState(new Animated.Value(0));
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const mobile = dimensions.width < breakpoints.tablet;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      Animated.timing(elev, { toValue: Math.min(1, y / 80), duration: 200, useNativeDriver: false }).start();
    };
    if (Platform.OS === 'web') {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [elev]);

  const bg = elev.interpolate({ inputRange: [0, 1], outputRange: ['rgba(10,10,10,0.72)', 'rgba(10,10,10,0.94)'] });
  const border = elev.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.12)'] });
  const height = elev.interpolate({ inputRange: [0, 1], outputRange: [mobile ? 64 : 72, mobile ? 56 : 64] });

  const toggleDrawer = () => {
    if (onDrawerToggle) {
      onDrawerToggle();
    } else if (navigation.toggleDrawer) {
      navigation.toggleDrawer();
    } else if (navigation.openDrawer) {
      navigation.openDrawer();
    }
  };

  // Only show drawer toggle on mobile (when drawer navigation is active)
  // On desktop, tabs handle navigation, so no drawer toggle needed
  const showDrawerToggle = mobile;

  return (
    <Animated.View style={[ds.header.container, { height, backgroundColor: bg, borderBottomColor: border, justifyContent: 'center' }]}>
      <View style={[ds.header.inner, { paddingHorizontal: mobile ? 16 : 32, justifyContent: 'space-between' }]}>
        {/* Left Side: Brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={{ uri: 'https://www.designevo.com/res/templates/thumb_small/geometrical-lift.webp' }}
            style={{
              width: mobile ? 28 : 32,
              height: mobile ? 28 : 32,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.1)'
            }}
          />
          <Text style={[ds.header.brand, {
            fontSize: mobile ? 18 : 22,
            letterSpacing: 1,
            textShadow: '0 0 10px rgba(0,102,255,0.5)'
          }]}>
            LIFT TECH
          </Text>
        </View>

        {/* Right Side: Navigation or Drawer Toggle */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {showDrawerToggle ? (
            <Pressable
              onPress={toggleDrawer}
              style={({ pressed }) => ({
                padding: 10,
                borderRadius: 8,
                backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderWidth: 1,
                borderColor: pressed ? palette.blueprint : 'rgba(255,255,255,0.08)'
              })}>
              <Text style={{
                color: palette.white,
                fontSize: 22,
                fontWeight: '700',
                textShadow: '0 0 8px rgba(0,240,255,0.6)'
              }}>☰</Text>
            </Pressable>
          ) : (
            null /* Desktop tabs handle nav, possibly add profile/search here later */
          )}
        </View>
      </View>
    </Animated.View>
  );
}
