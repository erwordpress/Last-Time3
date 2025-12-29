import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Image, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { colors, utilities, styles as ds, shadows, breakpoints } from '../../theme/designSystem';
import NeonButton from '../common/NeonButton';

export default function ProductCard({ product, onAddToCart }) {
  const { palette, motion } = useTheme();
  const navigation = useNavigation();
  const lift = useRef(new Animated.Value(0)).current;
  const appear = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(8)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const borderGlow = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isHovered, setIsHovered] = useState(false);
  const mobile = dimensions.width < breakpoints.tablet;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(appear, { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 360, useNativeDriver: true }),
    ]).start();
  }, [appear, rise]);

  const onHoverIn = () => {
    setIsHovered(true);
    Animated.parallel([
      Animated.timing(lift, { toValue: -4, duration: motion.duration.fast, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 1, duration: motion.duration.fast, useNativeDriver: false }),
      Animated.timing(borderGlow, { toValue: 1, duration: motion.duration.fast, useNativeDriver: false }),
    ]).start();
  };
  const onHoverOut = () => {
    setIsHovered(false);
    Animated.parallel([
      Animated.timing(lift, { toValue: 0, duration: motion.duration.fast, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 0, duration: motion.duration.fast, useNativeDriver: false }),
      Animated.timing(borderGlow, { toValue: 0, duration: motion.duration.fast, useNativeDriver: false }),
    ]).start();
  };

  const glowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });
  const borderGlowOpacity = borderGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.06, 1],
  });

  return (
    <Pressable onHoverIn={onHoverIn} onHoverOut={onHoverOut} onPress={() => navigation.navigate('View', { product })} style={{ flex: 1 }}>
      <Animated.View style={[utilities.cardSurface, { 
        transform: [{ translateY: lift }, { translateY: rise }], 
        padding: mobile ? 12 : 16, 
        opacity: appear,
        borderColor: borderGlow.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.glass, colors.neonCyan],
        }),
        ...(Platform.OS === 'web' ? {
          boxShadow: glow.interpolate({
            inputRange: [0, 1],
            outputRange: [
              shadows.card,
              '0 0 20px rgba(0,240,255,0.4), 0 0 40px rgba(0,240,255,0.2), 0 0 60px rgba(0,240,255,0.1)',
            ],
          }),
        } : {}),
      }]}>        
        {product.images?.length ? (
          <View style={{ marginBottom: 12, overflow: 'hidden', borderRadius: 12, borderWidth: 1, borderColor: colors.glass }}>
            <Image source={{ uri: product.images[0] }} style={{ width: '100%', height: mobile ? 140 : 160, backgroundColor: '#0D0D0D' }} resizeMode="cover" />
          </View>
        ) : null}
        <Text style={{ color: colors.white, fontSize: mobile ? 16 : 18, fontWeight: '700' }}>{product.name}</Text>
        <Text style={{ color: colors.ink75, marginTop: 6, fontSize: mobile ? 12 : 14 }}>{product.tagline}</Text>
        <View style={{ height: 1, backgroundColor: colors.glass, marginVertical: 12 }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Object.entries(product.specs).map(([k, v]) => (
            <View key={k} style={[ds.sections.chip, { marginRight: 12, marginBottom: 12 }]}>
              <Text style={{ color: colors.ink85, fontSize: mobile ? 11 : 12 }}>{k}: <Text style={{ fontWeight: '700', color: colors.white }}>{String(v)}</Text></Text>
            </View>
          ))}
        </View>
        <View style={{ 
          flexDirection: mobile ? 'column' : 'row', 
          marginTop: 14, 
          alignItems: mobile ? 'stretch' : 'center', 
          justifyContent: mobile ? 'flex-start' : 'space-between',
          gap: mobile ? 10 : 0,
        }}>
          <View style={{ flexDirection: mobile ? 'column' : 'row', alignItems: 'center', width: mobile ? '100%' : 'auto', gap: mobile ? 10 : 0 }}>
            <NeonButton 
              onPress={() => onAddToCart?.(product)} 
              style={{ 
                marginRight: mobile ? 0 : 10,
                width: mobile ? '100%' : 'auto',
                paddingVertical: mobile ? 10 : utilities.blueprintButton.paddingVertical,
              }}
              text="Add to Cart"
              variant="filled"
              mobile={mobile}
            />
            <NeonButton 
              onPress={() => navigation.navigate('View', { product })} 
              style={{
                width: mobile ? '100%' : 'auto',
                paddingVertical: mobile ? 10 : utilities.outlineButton.paddingVertical,
              }}
              text="View"
              variant="outline"
              mobile={mobile}
            />
          </View>
          <Text style={{ 
            color: colors.white, 
            fontWeight: '800',
            fontSize: mobile ? 16 : 18,
            marginTop: mobile ? 8 : 0,
            textAlign: mobile ? 'center' : 'right',
          }}>
            ${product.price?.toLocaleString?.() || product.price}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}
