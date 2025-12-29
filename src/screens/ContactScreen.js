import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Platform } from 'react-native';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useTheme } from '../theme/ThemeContext';

export default function ContactScreen() {
  const { palette } = useTheme();
  const [data, setData] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const onSubmit = () => {
    if (!data.name || !data.email) return;
    setSent(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: palette.obsidian }}>
        <View style={{ paddingTop: 40, paddingBottom: 80, paddingHorizontal: 20 }}>
          <Text style={{
            color: palette.white,
            fontSize: 42,
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: 10,
            textShadow: '0 0 20px rgba(255,255,255,0.1)'
          }}>
            Get Connected
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 40, fontSize: 16 }}>
            Start your journey with our engineering team today.
          </Text>

          <View style={{ maxWidth: 800, width: '100%', alignSelf: 'center', gap: 24 }}>
            {/* Form Card */}
            <View style={{
              backgroundColor: '#111',
              borderRadius: 24,
              padding: 32,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
              shadowColor: palette.blueprint,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 30
            }}>
              {[
                { k: 'name', l: 'Full Name', p: 'e.g. John Doe' },
                { k: 'email', l: 'Work Email', p: 'e.g. john@company.com' },
                { k: 'company', l: 'Company', p: 'e.g. Skyline Arquitectos' },
              ].map((f) => (
                <View key={f.k} style={{ marginBottom: 20 }}>
                  <Text style={{ color: palette.white, fontWeight: '700', marginBottom: 8, paddingLeft: 4 }}>{f.l}</Text>
                  <TextInput
                    placeholder={f.p}
                    placeholderTextColor={'rgba(255,255,255,0.3)'}
                    value={data[f.k]}
                    onChangeText={t => setData(d => ({ ...d, [f.k]: t }))}
                    style={{
                      backgroundColor: '#0A0A0A',
                      color: palette.white,
                      padding: 16,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.1)',
                      fontSize: 16
                    }}
                  />
                </View>
              ))}

              <View style={{ marginBottom: 32 }}>
                <Text style={{ color: palette.white, fontWeight: '700', marginBottom: 8, paddingLeft: 4 }}>Project Details</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  placeholder="Describe your project requirements..."
                  placeholderTextColor={'rgba(255,255,255,0.3)'}
                  value={data.message}
                  onChangeText={t => setData(d => ({ ...d, message: t }))}
                  style={{
                    backgroundColor: '#0A0A0A',
                    color: palette.white,
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.1)',
                    fontSize: 16,
                    minHeight: 120,
                    textAlignVertical: 'top'
                  }}
                />
              </View>

              <Pressable
                onPress={onSubmit}
                style={({ pressed }) => ({
                  backgroundColor: palette.blueprint,
                  paddingVertical: 18,
                  borderRadius: 12,
                  alignItems: 'center',
                  opacity: pressed ? 0.9 : 1,
                  shadowColor: palette.blueprint,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12
                })}
              >
                <Text style={{ color: palette.white, fontWeight: '800', fontSize: 18, letterSpacing: 1 }}>SEND REQUEST</Text>
              </Pressable>

              {sent && (
                <View style={{ marginTop: 20, padding: 16, backgroundColor: 'rgba(0,255,100,0.1)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,255,100,0.2)' }}>
                  <Text style={{ color: '#4ADE80', textAlign: 'center', fontWeight: '600' }}>✓ Request received. We'll be in touch shortly.</Text>
                </View>
              )}
            </View>

            {/* Info Cards */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
              <View style={{ flex: 1, minWidth: 280, backgroundColor: '#111', padding: 24, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                <Text style={{ color: palette.white, fontSize: 18, fontWeight: '700', marginBottom: 4 }}>Headquarters</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Ferizaj, Kosovo</Text>
                <Text style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>1200 Precision Ave</Text>
              </View>
              <View style={{ flex: 1, minWidth: 280, backgroundColor: '#111', padding: 24, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                <Text style={{ color: palette.white, fontSize: 18, fontWeight: '700', marginBottom: 4 }}>Contact</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)' }}>+383 44 123 456 • contact@lifttech.ks</Text>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
