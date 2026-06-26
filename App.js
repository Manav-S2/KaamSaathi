import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from './src/i18n';
import { T } from './src/theme';
import RoleScreen from './src/screens/RoleScreen';
import AuthScreen from './src/screens/AuthScreen';
import MainTabs from './src/screens/MainTabs';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: T.bg, primary: T.primary, card: T.surface, text: T.ink, border: T.border },
};

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('APP CRASH:', error, info); }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
          <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            App Crashed — Error Details:
          </Text>
          <Text style={{ color: '#333', fontSize: 13, fontFamily: 'monospace' }}>
            {this.state.error?.toString()}
          </Text>
          <Text style={{ color: '#333', fontSize: 13, fontFamily: 'monospace', marginTop: 10 }}>
            {this.state.error?.stack}
          </Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <I18nProvider>
          <StatusBar style="dark" />
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Role" component={RoleScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="Detail" component={DetailScreen} options={{ presentation: 'card' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </I18nProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
