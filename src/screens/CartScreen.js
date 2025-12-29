import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useTheme } from '../theme/ThemeContext';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { palette } = useTheme();
  const { items, updateQty, removeItem, clearCart } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: palette.obsidian }} contentContainerStyle={{ paddingBottom: 64 }}>
        <View style={{ maxWidth: 960, marginHorizontal: 'auto', paddingHorizontal: 20, paddingVertical: 24 }}>
          <Text style={{ color: palette.white, fontSize: 26, fontWeight: '800', marginBottom: 16 }}>Project Cart</Text>
          {items.length === 0 ? (
            <View style={{ backgroundColor: '#0F0F0F', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', padding: 14, borderRadius: 12 }}>
              <Text style={{ color: 'rgba(245,247,250,0.8)' }}>Your cart is empty. Add systems to request a consolidated engineering quote.</Text>
            </View>
          ) : (
            <View>
              {items.map(it => (
                <View key={it.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12, backgroundColor: '#0F0F0F', padding: 12, borderRadius: 10 }}>
                  {it.image ? <Image source={{ uri: it.image }} style={{ width: 84, height: 60, borderRadius: 8 }} /> : <View style={{ width: 84, height: 60, backgroundColor: '#0C0C0C', borderRadius: 8 }} />}
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: palette.white, fontWeight: '700' }}>{it.name}</Text>
                    <Text style={{ color: 'rgba(245,247,250,0.7)', fontSize: 12 }}>{it.meta?.color || ''}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: palette.white, fontWeight: '700' }}>${(it.price || 0).toLocaleString?.() || it.price}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                      <Pressable onPress={() => updateQty(it.id, it.qty - 1)} style={{ paddingHorizontal: 8, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 8, marginRight: 6 }}>
                        <Text style={{ color: palette.white }}>−</Text>
                      </Pressable>
                      <Text style={{ color: palette.white, minWidth: 28, textAlign: 'center' }}>{it.qty}</Text>
                      <Pressable onPress={() => updateQty(it.id, it.qty + 1)} style={{ paddingHorizontal: 8, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 8, marginLeft: 6 }}>
                        <Text style={{ color: palette.white }}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                  <Pressable onPress={() => removeItem(it.id)} style={{ marginLeft: 12 }}>
                    <Text style={{ color: 'rgba(255,100,100,0.95)' }}>Remove</Text>
                  </Pressable>
                </View>
              ))}
              <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: palette.white, fontWeight: '800' }}>Subtotal</Text>
                <Text style={{ color: palette.white, fontWeight: '800' }}>${items.reduce((s, it) => s + (it.price || 0) * it.qty, 0).toLocaleString?.() || items.reduce((s, it) => s + (it.price || 0) * it.qty, 0)}</Text>
              </View>
              <View style={{ height: 12 }} />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable onPress={() => clearCart()} style={{ flex: 1, backgroundColor: '#2B2B2B', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}>
                  <Text style={{ color: palette.white }}>Clear Cart</Text>
                </Pressable>
                <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,102,255,0.9)', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}>
                  <Text style={{ color: palette.white, fontWeight: '700' }}>Request Quote</Text>
                </Pressable>
              </View>
            </View>
          )}
          <View style={{ height: 12 }} />
          <Pressable disabled style={{ backgroundColor: 'rgba(0,102,255,0.3)', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ color: palette.white, fontWeight: '700' }}>Request Quote</Text>
          </Pressable>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
