import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useTheme } from '../theme/ThemeContext';
import { breakpoints } from '../theme/designSystem';

export default function AboutScreen() {
  const { palette } = useTheme();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const mobile = dimensions.width < breakpoints.tablet;
  const tablet = dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.desktop;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: palette.obsidian }}>
        <View style={{ position: 'relative', height: mobile ? 300 : 400, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop' }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <Text style={{
            color: palette.white,
            fontSize: mobile ? 32 : 48,
            fontWeight: '900',
            letterSpacing: 1,
            textShadow: '0 0 20px rgba(0,0,0,0.8)'
          }}>
            ENGINEERED TRUST
          </Text>
          <Text style={{
            color: palette.blueprint,
            fontSize: 14,
            fontWeight: '700',
            marginTop: 12,
            letterSpacing: 2
          }}>
            SINCE 2010
          </Text>
        </View>

        <View style={{ maxWidth: 1024, marginHorizontal: 'auto', padding: 24, marginTop: -40 }}>
          <View style={{
            backgroundColor: '#0F0F12',
            padding: 32,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.5,
            shadowRadius: 20
          }}>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, lineHeight: 28, textAlign: 'center' }}>
              "Our origin is industrial engineering. Our method is absolute safety. Our future is autonomous, connected vertical mobility."
            </Text>
          </View>
        </View>

        <View style={{ maxWidth: 1200, marginHorizontal: 'auto', padding: 24 }}>
          <Text style={{ color: palette.white, fontSize: 32, fontWeight: '800', marginBottom: 32, textAlign: 'center' }}>Our Milestones</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            {[
              { y: '2010', t: 'Founded in Berlin', d: 'Started by ex-Siemens engineers.' },
              { y: '2015', t: 'Zero-Incident Award', d: 'Benchmark safety across 50 cities.' },
              { y: '2018', t: 'IoT Platform Launch', d: 'Predictive maintenance for all units.' },
              { y: '2022', t: 'Green Tech Leader', d: 'Energy recovery standard implementation.' },
            ].map((item, i) => (
              <View key={i} style={{
                width: mobile ? '100%' : 260,
                backgroundColor: '#111',
                padding: 24,
                borderRadius: 16,
                borderTopWidth: 4,
                borderTopColor: palette.blueprint,
                borderWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.05)',
                borderLeftColor: 'rgba(255,255,255,0.05)',
                borderRightColor: 'rgba(255,255,255,0.05)',
              }}>
                <Text style={{ color: palette.blueprint, fontSize: 24, fontWeight: '900', marginBottom: 8 }}>{item.y}</Text>
                <Text style={{ color: palette.white, fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{item.t}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 20 }}>{item.d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alternating Layout: Photo Left, Text Right */}
        <View style={{ paddingVertical: 60, backgroundColor: '#0A0A0E' }}>
          <View style={{ maxWidth: 1200, marginHorizontal: 'auto', paddingHorizontal: 24, flexDirection: mobile ? 'column' : 'row', alignItems: 'center', gap: 40 }}>
            {/* Image */}
            <View style={{ flex: 1, width: '100%', height: 300, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            {/* Text */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: palette.blueprint, fontWeight: '700', letterSpacing: 1, marginBottom: 8 }}>PRECISION ENGINEERING</Text>
              <Text style={{ color: palette.white, fontSize: mobile ? 28 : 36, fontWeight: '800', marginBottom: 16 }}>Crafted for Performance</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 26 }}>
                Every component we manufacture undergoes rigorous stress testing. From the smallest micro-switch to the largest traction motor, we ensure zero-tolerance for error. Our Berlin facility combines traditional German engineering with modern robotics.
              </Text>
            </View>
          </View>
        </View>

        {/* Alternating Layout: Text Left, Photo Right */}
        <View style={{ paddingVertical: 60, backgroundColor: '#050505' }}>
          <View style={{ maxWidth: 1200, marginHorizontal: 'auto', paddingHorizontal: 24, flexDirection: mobile ? 'column-reverse' : 'row', alignItems: 'center', gap: 40 }}>
            {/* Text */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: palette.blueprint, fontWeight: '700', letterSpacing: 1, marginBottom: 8 }}>GLOBAL SUPPORT</Text>
              <Text style={{ color: palette.white, fontSize: mobile ? 28 : 36, fontWeight: '800', marginBottom: 16 }}>24/7 Monitoring Center</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 26 }}>
                Our centralized command center never sleeps. We monitor over 3,000 active units in real-time using IoT telemetry, predicting faults before they occur and dispatching technicians automatically in Ferizaj and beyond.
              </Text>
            </View>
            {/* Image */}
            <View style={{ flex: 1, width: '100%', height: 300, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#050505', paddingVertical: 60, marginTop: 40 }}>
          <Text style={{ color: palette.white, fontSize: 32, fontWeight: '800', marginBottom: 40, textAlign: 'center' }}>Leadership Team</Text>
          <TeamCarousel />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

function TeamCarousel() {
  const members = [
    { name: 'Aisha Khan', role: 'Lead Engineer', image: 'https://t3.ftcdn.net/jpg/05/93/40/82/360_F_593408229_iZUqIkNJTnfcej66N5oWm38uFgX5AoYl.jpg' },
    { name: 'Marco Rossi', role: 'Product Manager', image: 'https://media.sciencephoto.com/f0/34/59/01/f0345901-800px-wm.jpg' },
    { name: 'Lina Garcia', role: 'Systems Architect', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBCOtxzkOApVUz1iH-_5OF0S9o7Gi5R6ewQ&s' },
    { name: 'Ethan Cole', role: 'Field Operations', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQkqsK3704d14KuYzN3mQmWAhwKH3BKBZGw&s' },
    { name: 'Sofia Patel', role: 'Controls Engineer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4X_xFkaYCTqKPB74KaW4LYxndgW0Q8j66g&s' },
    { name: 'Noah Kim', role: 'Software Lead', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnUTV7oA8FVIvstY-QsmA8d1pFqnAqd67TA&s' },
    { name: 'Maya Singh', role: 'QA Engineer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLynGnQCU0UhjAxzc5xUa_cC9h6weLNhEqg&s' },
    { name: 'Oliver Brown', role: 'Installation Lead', image: 'https://images.unsplash.com/photo-1547425163-02d0d2f501a1?w=800&q=80' },
    { name: 'Hana Suzuki', role: 'UX Designer', image: 'https://images.unsplash.com/photo-1544005313-1b8f5c9d6b6f?w=800&q=80' },
    { name: 'Liam Johnson', role: 'Electrical Engineer', image: 'https://images.unsplash.com/photo-1545996124-abcdef123456?w=800&q=80' },
    { name: 'Isabella Lopez', role: 'Customer Success', image: 'https://images.unsplash.com/photo-1547425260-zzzzzzzzzz?w=800&q=80' },
    { name: 'Noor Ahmed', role: 'Field Technician', image: 'https://images.unsplash.com/photo-1544006659-yyyyyyyyyyy?w=800&q=80' },
    { name: 'Lucas Martin', role: 'R&D', image: 'https://images.unsplash.com/photo-1544005313-ccccccccccc?w=800&q=80' },
    { name: 'Emma Wilson', role: 'Operations Manager', image: 'https://images.unsplash.com/photo-1545996124-ddddddddddd?w=800&q=80' },
  ];

  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const itemWidth = 120; // px
  const gap = 12;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % members.length);
    }, 3000);
    return () => clearInterval(id);
  }, [members.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const x = index * (itemWidth + gap);
      try { scrollRef.current.scrollTo({ x, animated: true }); } catch (e) { }
    }
  }, [index]);

  return (
    <View style={{ paddingVertical: 8 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + gap}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
      >
        {members.map((m, i) => (
          <View key={m.name} style={{ width: itemWidth, alignItems: 'center', marginRight: gap }}>
            <Pressable onPress={() => setIndex(i)}>
              <Image source={{ uri: m.image }} style={{ width: itemWidth, height: itemWidth, borderRadius: itemWidth / 2, borderWidth: 2, borderColor: i === index ? '#2EA3FF' : 'rgba(255,255,255,0.06)' }} />
            </Pressable>
            <Text style={{ color: 'rgba(245,247,250,0.9)', marginTop: 8, fontWeight: '700', textAlign: 'center' }}>{m.name}</Text>
            <Text style={{ color: 'rgba(245,247,250,0.6)', fontSize: 12, textAlign: 'center' }}>{m.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
