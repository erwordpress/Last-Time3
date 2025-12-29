import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ContactScreen from '../screens/ContactScreen';
import CartScreen from '../screens/CartScreen';
import ViewScreen from '../screens/ViewScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="View" component={ViewScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
