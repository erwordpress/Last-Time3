import React, { useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Animated, Platform } from 'react-native';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { colors, utilities } from '../theme/designSystem';
import NeonButton from '../components/common/NeonButton';

function useProductById(id) {
  return useMemo(() => PRODUCTS.find(p => p.id === id) || PRODUCTS[0], [id]);
}

export default function ViewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addItem } = useCart();
  const params = route.params || {};
  const product = params.product || useProductById(params.id);

  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState('Steel');

  const pulse = useRef(new Animated.Value(0)).current;
  const onAdd = () => setQty(q => Math.max(1, q + 1));
  const onSub = () => setQty(q => Math.max(1, q - 1));

  const onAddToCart = () => {
    // add to global cart then navigate to Cart
    addItem(product, { qty, meta: { color } });
    navigation.navigate('Cart');
  };

  const imageUri = product.images?.[activeIndex] || product.images?.[0];

  const description = `The ${product.name} is engineered for safety and performance in demanding environments. It combines a high‑efficiency traction drive with silent operation and precise control for smooth rides. Designed for modern architecture, it supports up to ${product.specs?.maxFloors || 'N/A'} floors with a rated load of ${product.specs?.loadKg || 'N/A'} kg and a top speed of ${product.specs?.speedMps || 'N/A'} m/s. Redundant safety systems, intelligent dispatch, and energy recovery minimize downtime and power usage, delivering reliable, future‑ready vertical mobility.`;

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: colors.obsidian }} contentContainerStyle={{ paddingBottom: 64 }}>
        <View style={{ maxWidth: 1200, marginHorizontal: 'auto', paddingHorizontal: 20, paddingVertical: 20 }}>
          <Text style={{ color: colors.white, fontSize: 22, fontWeight: '800', marginBottom: 8 }}>{product.name}</Text>
          <Text style={{ color: colors.ink85, marginBottom: 16 }}>{product.tagline}</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {/* Gallery */}
            <View style={{ width: 640, maxWidth: '100%', marginRight: 20, marginBottom: 20 }}>
              <View style={{ height: 380, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.glass }}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                ) : (
                  <View style={{ flex: 1, backgroundColor: '#0D0D0D' }} />
                )}
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {(product.images || []).map((uri, idx) => (
                  <Pressable key={uri} onPress={() => setActiveIndex(idx)} style={{ marginRight: 10 }}>
                    <View style={{ width: 72, height: 48, borderRadius: 8, overflow: 'hidden', borderWidth: 2, borderColor: idx === activeIndex ? colors.blueprint : colors.glass }}>
                      <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Info */}
            <View style={{ flex: 1, minWidth: 280 }}>
              <Text style={{ color: colors.white, fontWeight: '800', fontSize: 20, marginBottom: 6 }}>${product.price?.toLocaleString?.() || product.price}</Text>
              <Text style={{ color: colors.ink85, lineHeight: 20 }}>{description}</Text>

              {/* Colors */}
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: colors.white, fontWeight: '700', marginBottom: 6 }}>Cabin Finish</Text>
                <View style={{ flexDirection: 'row' }}>
                  {['Steel', 'Graphite', 'Chrome'].map(c => (
                    <Pressable key={c} onPress={() => setColor(c)} style={{ marginRight: 10 }}>
                      <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: c === color ? colors.blueprint : colors.glass, backgroundColor: '#101010' }}>
                        <Text style={{ color: colors.white }}>{c}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Quantity */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                <Pressable
                  onPress={onSub}
                  style={[
                    utilities.neonOutlineButton,
                    {
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      marginRight: 8,
                      minWidth: 40,
                      ...(Platform.OS === 'web' ? {
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 10px rgba(0,240,255,0.3)',
                      } : {}),
                    }
                  ]}
                >
                  <Text style={{
                    color: colors.neonCyan,
                    fontWeight: '700',
                    ...(Platform.OS === 'web' ? {
                      textShadow: `0 0 5px ${colors.neonCyan}`,
                    } : {}),
                  }}>
                    −
                  </Text>
                </Pressable>
                <Text style={{
                  color: colors.white,
                  width: 40,
                  textAlign: 'center',
                  ...(Platform.OS === 'web' ? {
                    textShadow: `0 0 5px ${colors.neonCyan}`,
                  } : {}),
                }}>
                  {qty}
                </Text>
                <Pressable
                  onPress={onAdd}
                  style={[
                    utilities.neonOutlineButton,
                    {
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      marginLeft: 8,
                      minWidth: 40,
                      ...(Platform.OS === 'web' ? {
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 10px rgba(0,240,255,0.3)',
                      } : {}),
                    }
                  ]}
                >
                  <Text style={{
                    color: colors.neonCyan,
                    fontWeight: '700',
                    ...(Platform.OS === 'web' ? {
                      textShadow: `0 0 5px ${colors.neonCyan}`,
                    } : {}),
                  }}>
                    +
                  </Text>
                </Pressable>
              </View>

              {/* Add to Cart */}
              <NeonButton
                onPress={onAddToCart}
                text="Add to Cart"
                variant="filled"
                style={{ marginTop: 16, paddingVertical: 12 }}
                fontSize={16}
              />
            </View>
          </View>

          {/* Technical Summary */}
          <View style={{ marginTop: 24, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.glass, backgroundColor: '#0F0F0F' }}>
            <Text style={{ color: colors.white, fontWeight: '800', marginBottom: 8 }}>Engineering Summary</Text>
            <Text style={{ color: colors.ink85 }}>
              Built with a gearless traction motor and smart control logic, the system integrates redundancy, emergency braking,
              and energy recovery. Materials and tolerances meet international standards, providing smooth acceleration,
              precise leveling, and minimal maintenance downtime.
            </Text>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
