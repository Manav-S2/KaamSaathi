import React from 'react';
import { View, Text, Pressable, Image, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../i18n';
import { T } from '../theme';
import { WORKER_PHOTOS, EMPLOYER_PHOTOS } from '../data';
import LangToggle from '../components/LangToggle';

export default function RoleScreen({ navigation }) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const onPick = (r) => navigation.navigate('Auth', { role: r });

  return (
    <View style={styles.root}>
      {/* GREEN COLOUR-BLOCK HERO (same dimensions as Clay variant) */}
      <View style={[styles.hero, { paddingTop: insets.top + 18 }]}>
        <View style={styles.topRow}>
          <View style={styles.brandRow}>
            <Ionicons name="hand-left" size={22} color="#fff" />
            <Text style={styles.brand}>{t('appName')}</Text>
          </View>
          <LangToggle />
        </View>

        <Text style={styles.h1}>{t('roleTitle')}</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>

        <View style={styles.avatarRow}>
          {WORKER_PHOTOS.slice(0, 4).map((src, i) => (
            <Image key={i} source={src} style={[styles.avatar, { marginLeft: i === 0 ? 0 : -7 }]} />
          ))}
          <Text style={styles.social}>12+ {t('nearby')}</Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.card} onPress={() => onPick('worker')}>
          <View style={[styles.cardIcon, { backgroundColor: T.soft }]}>
            <Ionicons name="construct" size={30} color={T.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{t('workerT')}</Text>
            <Text style={styles.cardSub}>{t('workerS')}</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={26} color={T.primary} />
        </Pressable>

        <Pressable style={styles.card} onPress={() => onPick('employer')}>
          <View style={[styles.cardIcon, { backgroundColor: T.soft }]}>
            <Ionicons name="home" size={30} color={T.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{t('employerT')}</Text>
            <Text style={styles.cardSub}>{t('employerS')}</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={26} color={T.accent} />
        </Pressable>

        <View style={styles.secure}>
          <Ionicons name="shield-checkmark" size={16} color={T.primary} />
          <Text style={styles.secureTxt}>{t('secure')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.bg },
  hero: { backgroundColor: T.primary, paddingHorizontal: 22, paddingBottom: 26, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brand: { fontSize: 18, fontWeight: '800', color: '#fff' },
  h1: { fontSize: 25, fontWeight: '800', color: '#fff', lineHeight: 30, marginTop: 18 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.82)', marginTop: 4 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: T.primary },
  social: { marginLeft: 12, fontWeight: '700', fontSize: 12, color: '#fff' },
  body: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 24, flexGrow: 1 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: T.surface, borderRadius: 18, padding: 18, marginBottom: 13, ...T.shadow },
  cardIcon: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '800', color: T.ink },
  cardSub: { fontSize: 12.5, color: T.sub, marginTop: 2 },
  secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 'auto', paddingTop: 16 },
  secureTxt: { color: T.sub, fontSize: 12.5 },
});
