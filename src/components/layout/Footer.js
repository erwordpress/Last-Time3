import React, { useEffect, useRef } from 'react';
import { View, Text, Linking, Pressable, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { styles as ds, colors } from '../../theme/designSystem';

export default function Footer() {
  const { palette } = useTheme();
  const navigation = useNavigation();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      pulse.setValue(0);
      Animated.timing(pulse, { toValue: 1, duration: 2000, useNativeDriver: false }).start(() => loop());
    };
    loop();
  }, [pulse]);

  const glowWidth = pulse.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[ds.footer.container, { paddingVertical: 42, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }] }>
      {/* Animated divider */}
      <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
      <Animated.View style={{ height: 2, backgroundColor: 'rgba(0,102,255,0.35)', width: glowWidth, marginBottom: 8 }} />

      <View style={[ds.footer.inner, { paddingTop: 24 }] }>
        {/* Multi-column layout */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* Philosophy */}
          <View style={{ flexGrow: 1, minWidth: 240, marginRight: 24, marginBottom: 24 }}>
            <Text style={{ color: colors.white, fontWeight: '800', marginBottom: 8 }}>Lift Tech</Text>
            <Text style={{ color: 'rgba(245,247,250,0.8)' }}>
              Precision elevators engineered for safety, performance, and modern architecture.
            </Text>
          </View>

          {/* Certifications */}
          <View style={{ flexGrow: 1, minWidth: 200, marginRight: 24, marginBottom: 24 }}>
            <Text style={{ color: colors.white, fontWeight: '800', marginBottom: 8 }}>Certifications</Text>
            {[
              'EN 81-20/50',
              'ISO 25745-2',
              'ISO 8100-32',
              'UL 508A',
            ].map((c) => (
              <Text key={c} style={{ color: 'rgba(245,247,250,0.8)', marginBottom: 6 }}>• {c}</Text>
            ))}
          </View>

            {/* Navigation */}
            <View style={{ flexGrow: 1, minWidth: 200, marginRight: 24, marginBottom: 24 }}>
              <Text style={{ color: colors.white, fontWeight: '800', marginBottom: 8 }}>Navigation</Text>
              {[
                ['Home', 'Home'],
                ['About', 'About'],
                ['Products', 'Products'],
                ['Contact', 'Contact'],
                ['Cart', 'Cart'],
              ].map(([label, route]) => (
                <Pressable key={route} onPress={() => navigation.navigate(route)} style={{ marginBottom: 6 }}>
                  <Text style={{ color: colors.white, opacity: 0.9 }}>{label}</Text>
                </Pressable>
              ))}
            </View>

          {/* Contact */}
          <View style={{ flexGrow: 1, minWidth: 240, marginRight: 24, marginBottom: 24 }}>
            <Text style={{ color: colors.white, fontWeight: '800', marginBottom: 8 }}>Contact</Text>
            <Text style={{ color: 'rgba(245,247,250,0.8)', marginBottom: 6 }}>Lift Tech HQ</Text>
            <Text style={{ color: 'rgba(245,247,250,0.8)', marginBottom: 6 }}>1200 Precision Ave, Berlin</Text>
            <Text style={{ color: 'rgba(245,247,250,0.8)', marginBottom: 6 }}>+49 30 123456</Text>
            <Pressable onPress={() => Linking.openURL('mailto:contact@lifttech.com')}>
              <Text style={{ color: colors.white, textDecorationLine: 'underline' }}>contact@lifttech.com</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ height: 20 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Text style={ds.footer.meta}>© {new Date().getFullYear()} LIFT TECH. All rights reserved.</Text>
          <View style={{ flexDirection: 'row' }}>
            {[
              ['Privacy', 'https://example.com/privacy'],
              ['Compliance', 'https://example.com/compliance'],
              ['Certifications', 'https://example.com/certifications'],
            ].map(([label, href]) => (
              <Pressable key={label} onPress={() => Linking.openURL(href)} style={{ marginLeft: 16 }}>
                <Text style={ds.footer.link}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
