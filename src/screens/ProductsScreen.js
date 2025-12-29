import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../theme/ThemeContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { colors, utilities, styles as ds, breakpoints } from '../theme/designSystem';

const Tab = createMaterialTopTabNavigator();

function ProductsTab({ category }) {
  const { palette } = useTheme();
  const [filters, setFilters] = useState({ env: '', minLoad: '', minSpeed: '' });
  const { addItem } = useCart();
  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const mobile = dimensions.width < breakpoints.tablet;
  const tablet = dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.desktop;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const filtered = useMemo(() => PRODUCTS.filter(p => {
    const categoryOk = category === 'All' || p.specs.environment === category;
    const envOk = !filters.env || p.specs.environment.toLowerCase().includes(filters.env.toLowerCase());
    const loadOk = !filters.minLoad || p.specs.loadKg >= Number(filters.minLoad);
    const speedOk = !filters.minSpeed || p.specs.speedMps >= Number(filters.minSpeed);
    return categoryOk && envOk && loadOk && speedOk;
  }), [filters, category]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: colors.obsidian }} contentContainerStyle={{ paddingBottom: 64 }}>
        <View style={{
          maxWidth: 1280,
          marginHorizontal: 'auto',
          paddingHorizontal: mobile ? 16 : 20,
          paddingVertical: mobile ? 16 : 24
        }}>
          <Text style={{
            color: colors.white,
            fontSize: mobile ? 20 : tablet ? 24 : 26,
            fontWeight: '800',
            marginBottom: 16
          }}>
            Systems & Solutions
          </Text>
          <View style={[utilities.panelSurface, { padding: mobile ? 12 : 14, marginBottom: 16 }]}>
            <Text style={{ color: colors.ink85, marginBottom: 6, fontSize: mobile ? 12 : 14 }}>Advanced Filters</Text>
            <View style={{ flexDirection: mobile ? 'column' : 'row', flexWrap: 'wrap', gap: 12 }}>
              <TextInput
                placeholder="Environment (e.g., Hospital)"
                placeholderTextColor={'rgba(245,247,250,0.4)'}
                value={filters.env}
                onChangeText={t => setFilters(f => ({ ...f, env: t }))}
                style={{
                  color: colors.white,
                  backgroundColor: colors.shadow,
                  padding: mobile ? 8 : 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.glass,
                  width: mobile ? '100%' : 'auto',
                  minWidth: mobile ? '100%' : 260,
                  fontSize: mobile ? 14 : 16,
                }}
              />
              <TextInput
                placeholder="Min Load (kg)"
                keyboardType="numeric"
                placeholderTextColor={'rgba(245,247,250,0.4)'}
                value={filters.minLoad}
                onChangeText={t => setFilters(f => ({ ...f, minLoad: t }))}
                style={{
                  color: colors.white,
                  backgroundColor: colors.shadow,
                  padding: mobile ? 8 : 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.glass,
                  width: mobile ? '100%' : 'auto',
                  minWidth: mobile ? '100%' : 200,
                  fontSize: mobile ? 14 : 16,
                }}
              />
              <TextInput
                placeholder="Min Speed (m/s)"
                keyboardType="numeric"
                placeholderTextColor={'rgba(245,247,250,0.4)'}
                value={filters.minSpeed}
                onChangeText={t => setFilters(f => ({ ...f, minSpeed: t }))}
                style={{
                  color: colors.white,
                  backgroundColor: colors.shadow,
                  padding: mobile ? 8 : 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.glass,
                  width: mobile ? '100%' : 'auto',
                  minWidth: mobile ? '100%' : 200,
                  fontSize: mobile ? 14 : 16,
                }}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {filtered.map(p => (
              <View key={p.id} style={{
                width: mobile ? '100%' : tablet ? '48%' : 380,
                marginBottom: mobile ? 16 : 0,
              }}>
                <ProductCard product={p} onAddToCart={(prod) => addItem(prod)} />
              </View>
            ))}
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

export default function ProductsScreen() {
  const categories = ['All', 'Commercial', 'Hospital', 'Industrial', 'Luxury Residential', 'Hotel', 'Infrastructure', 'Education', 'Government', 'Retail', 'Residential'];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#0A0A0A' },
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: '#F5F7FA',
        tabBarIndicatorStyle: { backgroundColor: '#0066FF' },
        tabBarScrollEnabled: true,
      }}
    >
      {categories.map(category => (
        <Tab.Screen
          key={category}
          name={category}
          children={() => <ProductsTab category={category} />}
        />
      ))}
    </Tab.Navigator>
  );
}
