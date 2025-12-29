import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ScrollView, Platform, Dimensions } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { CartProvider } from './src/context/CartContext';
import { colors } from './src/theme/designSystem';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ContactScreen from './src/screens/ContactScreen';
import CartScreen from './src/screens/CartScreen';
import ViewScreen from './src/screens/ViewScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent({ navigation }) {
  const menuItems = [
    { label: 'Home', route: 'Home' },
    { label: 'About', route: 'About' },
    { label: 'Products', route: 'Products' },
    { label: 'Contact', route: 'Contact' },
    { label: 'Cart', route: 'Cart' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.obsidian, paddingTop: Platform.OS === 'web' ? 0 : 40 }}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: colors.glass }}>
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: '800', letterSpacing: 1.2 }}>LIFT TECH</Text>
        <Text style={{ color: colors.ink75, fontSize: 14, marginTop: 4 }}>Engineering Excellence</Text>
      </View>
      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
        {menuItems.map((item) => (
          <Pressable
            key={item.route}
            onPress={() => {
              navigation.navigate('MainStack', { screen: item.route });
              navigation.closeDrawer();
            }}
            style={({ pressed }) => ({
              paddingVertical: 16,
              paddingHorizontal: 20,
              backgroundColor: pressed ? colors.carbon : 'transparent',
              borderLeftWidth: 3,
              borderLeftColor: 'transparent',
            })}
          >
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600', letterSpacing: 0.5 }}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: colors.glass }}>
        <Text style={{ color: colors.ink75, fontSize: 12 }}>© 2024 Lift Tech</Text>
      </View>
    </View>
  );
}

// Stack for Mobile: Contains all screens manageable by Drawer
function MobileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="View" component={ViewScreen} />
    </Stack.Navigator>
  );
}

// Drawer for Mobile: Wraps the MobileStack
function MobileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerPosition: 'right', // Changed to left for standard feel? Or keep right? Keeping right as per previous code.
        drawerStyle: {
          width: 280,
          backgroundColor: colors.obsidian,
        },
        overlayColor: 'rgba(0,0,0,0.7)',
      }}
    >
      <Drawer.Screen name="MainStack" component={MobileStack} />
    </Drawer.Navigator>
  );
}

// Tab Navigator for Desktop (Internal)
function DesktopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.obsidian,
          borderTopWidth: 1,
          borderTopColor: colors.glass,
          height: 60,
        },
        tabBarActiveTintColor: colors.blueprint,
        tabBarInactiveTintColor: colors.ink75,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

// Stack for Desktop: Wraps Tabs + View Screen
function DesktopStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={DesktopTabs} />
      <Stack.Screen name="View" component={ViewScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const navTheme = useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#0A0A0A',
      primary: '#0066FF',
      text: '#F5F7FA',
      card: '#0A0A0A',
      border: '#1E1E1E',
      notification: '#0066FF',
    },
  }), []);

  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
  const isMobile = dimensions.width < 768;

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CartProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar style="light" />
            {isMobile ? <MobileDrawer /> : <DesktopStack />}
          </NavigationContainer>
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
