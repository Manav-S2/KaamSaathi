import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../i18n';
import { T } from '../theme';
import LangToggle from '../components/LangToggle';
import DiscoverTab from './tabs/DiscoverTab';
import PostJobTab from './tabs/PostJobTab';
import CommunityTab from './tabs/CommunityTab';
import ProfileTab from './tabs/ProfileTab';

const Tab = createBottomTabNavigator();

function TopBar() {
  const { t } = useI18n();
  return (
    <View style={styles.topBar}>
      <View style={styles.brandRow}>
        <View style={styles.logo}><Ionicons name="hand-left" size={18} color="#fff" /></View>
        <Text style={styles.brand}>{t('appName')}</Text>
      </View>
      <LangToggle />
    </View>
  );
}

export default function MainTabs({ route, navigation }) {
  const { t } = useI18n();
  const role = route?.params?.role || 'worker';
  const isEmployer = role === 'employer';

  const icons = {
    Discover: 'compass',
    Post: 'add-circle',
    Community: 'chatbubbles',
    Profile: 'person',
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <TopBar />
      <Tab.Navigator
        screenOptions={({ route: r }) => ({
          headerShown: false,
          tabBarActiveTintColor: T.primary,
          tabBarInactiveTintColor: '#9a9384',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          tabBarStyle: { backgroundColor: T.surface, borderTopColor: T.border, height: 60, paddingBottom: 8, paddingTop: 6 },
          tabBarIcon: ({ color, size }) => <Ionicons name={icons[r.name]} size={size - 1} color={color} />,
        })}
      >
        <Tab.Screen name="Discover" options={{ tabBarLabel: isEmployer ? t('findWorkers') : t('findWork') }}>
          {(props) => <DiscoverTab {...props} role={role} />}
        </Tab.Screen>

        {isEmployer && (
          <Tab.Screen name="Post" options={{ tabBarLabel: t('postWork') }}>
            {(props) => <PostJobTab {...props} />}
          </Tab.Screen>
        )}

        <Tab.Screen name="Community" options={{ tabBarLabel: t('community') }}>
          {(props) => <CommunityTab {...props} role={role} />}
        </Tab.Screen>

        <Tab.Screen name="Profile" options={{ tabBarLabel: t('profile') }}>
          {(props) => <ProfileTab {...props} role={role} onLogout={() => navigation.replace('Role')} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 10 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 32, height: 32, borderRadius: 10, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 16, fontWeight: '800', color: T.ink },
});
