import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Platform, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { styles as ds, colors, utilities, breakpoints, getResponsiveValue } from '../theme/designSystem';
import NeonButton from '../components/common/NeonButton';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ParticleField from '../components/Effects/ParticleField';
import ScrollReveal from '../components/common/ScrollReveal';

const sliderImages = [
  'https://images.unsplash.com/photo-1535528044987-e24f74d94968?w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
];

export default function HomeScreen() {
  const { palette, motion } = useTheme();
  const navigation = useNavigation();
  const door = useRef(new Animated.Value(0)).current; // 0 closed, 1 open
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroLift = useRef(new Animated.Value(12)).current;
  const reflectionY = useRef(new Animated.Value(-180)).current;
  const lockShake = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [sliderWidth, setSliderWidth] = useState(320);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const mobile = dimensions.width < breakpoints.tablet;
  const tablet = dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.desktop;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    // Elevator doors opening + hero copy reveal
    Animated.sequence([
      Animated.parallel([
        Animated.timing(door, { toValue: 1, duration: motion.duration.slow, useNativeDriver: false }),
        Animated.timing(heroOpacity, { toValue: 1, duration: 520, delay: 120, useNativeDriver: true }),
        Animated.timing(heroLift, { toValue: 0, duration: 520, delay: 120, useNativeDriver: true }),
      ]),
      // Micro vibration "lock" effect
      Animated.sequence([
        Animated.timing(lockShake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(lockShake, { toValue: -1, duration: 60, useNativeDriver: true }),
        Animated.timing(lockShake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]),
    ]).start();

    // Light reflection sweep loop
    const loop = () => {
      reflectionY.setValue(-180);
      Animated.timing(reflectionY, { toValue: 600, duration: 2600, useNativeDriver: true }).start(() => loop());
    };
    loop();
  }, [door, heroOpacity, heroLift, lockShake, reflectionY, motion.duration.slow]);

  const leftFlex = door.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const rightFlex = door.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const lockTranslateY = lockShake.interpolate({ inputRange: [-1, 1], outputRange: [-1, 1] });

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.obsidian }}
        contentContainerStyle={{ paddingBottom: 96 }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset?.y || 0;
          scrollY.setValue(y);
        }}
      >
        {/* Hero Section */}
        <View style={[ds.hero.stage, {
          height: mobile ? 500 : tablet ? 600 : 700,
          transform: [{ translateY: lockTranslateY }]
        }]}>
          <Image
            source={{ uri: 'https://wallpapers.com/images/featured/4k-architecture-b3uwz18py1b0e5a7.jpg' }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5,5,10,0.65)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)' }} />
          <ParticleField />

          <Animated.View style={[ds.hero.copyWrap, {
            opacity: heroOpacity,
            transform: [{ translateY: heroLift }],
            zIndex: 2,
            alignItems: 'center',
            paddingHorizontal: mobile ? 20 : 40,
            maxWidth: 1000,
            width: '100%',
          }]}>
            <Text style={{
              color: colors.blueprint,
              fontSize: mobile ? 14 : 16,
              fontWeight: '700',
              letterSpacing: 2,
              marginBottom: 16,
              textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(0,102,255,0.6)'
            }}>
              Future Vertical Mobility
            </Text>
            <Text style={{
              color: colors.white,
              fontSize: mobile ? 36 : tablet ? 48 : 64,
              fontWeight: '800',
              textAlign: 'center',
              lineHeight: mobile ? 44 : tablet ? 56 : 72,
              textShadow: '0 0 30px rgba(0,0,0,0.8)'
            }}>
              Ascend Beyond Limits
            </Text>
            <Text style={{
              color: colors.ink85,
              fontSize: mobile ? 16 : 20,
              textAlign: 'center',
              marginVertical: 24,
              maxWidth: 600,
              lineHeight: 28,
            }}>
              Experience next-generation elevator systems engineered for speed, safety, and silence. Redefining skylines worldwide.
            </Text>

            <View style={{
              flexDirection: mobile ? 'column' : 'row',
              gap: 16,
              width: mobile ? '100%' : 'auto',
              marginTop: 12,
            }}>
              <NeonButton
                onPress={() => navigation.navigate('Products')}
                text="View Our Systems"
                variant="filled"
                mobile={mobile}
                style={{ minWidth: 200 }}
                fontSize={16}
              />
              <NeonButton
                onPress={() => navigation.navigate('Contact')}
                text="Get a Quote"
                variant="outline"
                mobile={mobile}
                style={{ minWidth: 200 }}
                fontSize={16}
              />
            </View>
          </Animated.View>
        </View>

        {/* Stats Section with Glassmorphism */}
        <ScrollReveal delay={500} style={{ marginTop: -60, paddingHorizontal: mobile ? 16 : 40, marginBottom: 60 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            {[
              { val: '3000+', label: 'Active Units', icon: '🏢' },
              { val: '99.9%', label: 'Uptime', icon: '⚡' },
              { val: 'ISO', label: 'Certified', icon: '🛡' },
            ].map((stat, i) => (
              <View key={i} style={{
                flex: 1,
                minWidth: 140,
                maxWidth: mobile ? '100%' : 240,
                backgroundColor: 'rgba(20,20,30,0.8)',
                backdropFilter: 'blur(20px)', // Web only
                padding: 24,
                borderRadius: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)',
                shadowColor: colors.blueprint,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
              }}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</Text>
                <Text style={{ color: colors.white, fontSize: 28, fontWeight: '800', textShadow: `0 0 15px ${colors.blueprint}` }}>{stat.val}</Text>
                <Text style={{ color: colors.ink75, fontSize: 14, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </ScrollReveal>

        {/* Global Projects Gallery (New Swiper) */}
        <ScrollReveal delay={200} style={{ paddingVertical: 40, backgroundColor: '#08080A' }}>
          <View style={{ paddingHorizontal: mobile ? 20 : 40, marginBottom: 30, alignItems: 'center' }}>
            <Text style={{ color: colors.white, fontSize: mobile ? 24 : 32, fontWeight: '800', textAlign: 'center' }}>Iconic Installations</Text>
            <Text style={{ color: colors.ink75, marginTop: 8, textAlign: 'center' }}>Powering the world's most ambitious architecture.</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: mobile ? 20 : 40, gap: 20, flexGrow: 1, justifyContent: 'center' }}>
            {[
              { t: 'Burj Vista', l: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', desc: '12 High-speed units (8m/s)' },
              { t: 'The Shard', l: 'London, UK', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', desc: 'Double-deck systems' },
              { t: 'Marina 101', l: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80', desc: 'Smart dispatch logic' },
              { t: 'One57', l: 'New York, USA', img: 'https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?w=800&q=80', desc: 'Luxury residential lifts' },
            ].map((item, i) => (
              <View key={i} style={{
                width: mobile ? 260 : 320,
                backgroundColor: '#111',
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.08)'
              }}>
                <Image source={{ uri: item.img }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
                <View style={{ padding: 16 }}>
                  <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700' }}>{item.t}</Text>
                  <Text style={{ color: colors.blueprint, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 }}>{item.l}</Text>
                  <Text style={{ color: colors.ink75, marginTop: 8, fontSize: 13 }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollReveal>

        {/* Featured Systems Carousel */}
        <ScrollReveal delay={300} style={{ paddingVertical: 40, backgroundColor: '#050505' }}>
          <View style={{ paddingHorizontal: mobile ? 20 : 40, marginBottom: 30 }}>
            <Text style={{ color: colors.white, fontSize: mobile ? 28 : 36, fontWeight: '800' }}>Engineered Excellence</Text>
            <View style={{ width: 60, height: 4, backgroundColor: colors.blueprint, marginTop: 12, borderRadius: 2, shadowColor: colors.blueprint, shadowOpacity: 0.8, shadowRadius: 10 }} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: mobile ? 20 : 40, gap: 24, flexGrow: 1, justifyContent: 'center' }}>
            {sliderImages.map((uri, i) => (
              <Pressable key={i} style={({ pressed }) => ({
                width: mobile ? 280 : 360,
                height: mobile ? 380 : 460,
                borderRadius: 20,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: pressed ? colors.blueprint : 'rgba(255,255,255,0.1)',
                transform: [{ scale: pressed ? 0.98 : 1 }],
                backgroundColor: '#111'
              })}>
                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                  <Text style={{ color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: 4 }}>System Model {i + 1}X</Text>
                  <Text style={{ color: colors.blueprint, fontWeight: '600' }}>View Specifications →</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </ScrollReveal>

        {/* Why Choose Us - Modern Grid */}
        <ScrollReveal delay={200} style={{ padding: mobile ? 24 : 60, maxWidth: 1200, alignSelf: 'center' }}>
          <Text style={{ color: colors.white, fontSize: mobile ? 24 : 36, fontWeight: '800', textAlign: 'center', marginBottom: 48 }}>The Lift Tech Advantage</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {[
              { t: 'Safety First', d: 'Redundant braking systems and real-time monitoring ensure absolute passenger safety.', g: ['#FF4D4D', '#ff9e9e'] },
              { t: 'Smart IoT', d: 'Predictive maintenance powered by AI to prevent downtime before it happens.', g: ['#0066FF', '#00F0FF'] },
              { t: 'Eco Drive', d: 'Regenerative drives capture energy, reducing building power consumption by 40%.', g: ['#00C853', '#69F0AE'] },
            ].map((item, i) => (
              <View key={i} style={{
                width: mobile ? '100%' : 340,
                padding: 32,
                borderRadius: 24,
                backgroundColor: '#0F0F12',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.05)',
              }}>
                <View style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: item.g[0], marginBottom: 20, shadowColor: item.g[1], shadowOpacity: 0.5, shadowRadius: 20 }} />
                <Text style={{ color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: 12 }}>{item.t}</Text>
                <Text style={{ color: colors.ink75, lineHeight: 24 }}>{item.d}</Text>
              </View>
            ))}
          </View>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={200} style={{ padding: mobile ? 20 : 60 }}>
          <View style={{
            backgroundColor: colors.blueprint,
            borderRadius: 32,
            padding: mobile ? 32 : 60,
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <View style={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <View style={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(0,0,0,0.2)' }} />

            <Text style={{ color: colors.white, fontSize: mobile ? 28 : 42, fontWeight: '900', textAlign: 'center', marginBottom: 16 }}>Ready to Ascend?</Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: mobile ? 16 : 18, textAlign: 'center', maxWidth: 600, marginBottom: 32 }}>
              Join thousands of architects and developers building the vertical cities of tomorrow.
            </Text>
            <NeonButton
              text="Start Your Project"
              onPress={() => navigation.navigate('Contact')}
              style={{ backgroundColor: colors.white, minWidth: 220 }}
              textStyle={{ color: colors.blueprint }}
            />
          </View>
        </ScrollReveal>

        <Footer />
      </ScrollView>
    </View>
  );
}
