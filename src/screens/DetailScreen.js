import React from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../i18n';
import { T } from '../theme';
import { WORKER_PHOTOS } from '../data';

export default function DetailScreen({ route, navigation }) {
  const { t, hi } = useI18n();
  const { item, role } = route.params;
  const isEmployer = role === 'employer';

  const title = hi ? item.hi : item.en;
  const sub = isEmployer ? (hi ? item.roleHi : item.roleEn) : (hi ? item.byHi : item.byEn);
  const loc = hi ? item.locHi : item.locEn;
  const done = isEmployer ? '41' : '24';

  const about = isEmployer
    ? (hi ? 'अनुभवी और भरोसेमंद। ज़्यादातर दिन उपलब्ध। अपने औज़ार साथ लाते हैं।' : 'Experienced and reliable. Available most days. Brings own tools.')
    : (hi ? 'घर का छोटा काम, सामान दिया जाएगा। इसी हफ़्ते शुरू होगा।' : 'Small home job, materials provided. Work to start this week.');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={T.sub} />
          <Text style={styles.backTxt}>{t('back')}</Text>
        </Pressable>

        {/* hero */}
        <View style={styles.hero}>
          <Image source={WORKER_PHOTOS[item.ph]} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{title}</Text>
              {item.verified && <Ionicons name="checkmark-circle" size={19} color={T.primary} />}
            </View>
            <Text style={styles.sub}>{sub}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={T.accent} />
              <Text style={styles.ratingTxt}>{item.rating}</Text>
              <Text style={styles.ratingSub}>· {done} {hi ? 'काम पूरे' : 'jobs done'}</Text>
            </View>
          </View>
        </View>

        {/* trust stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={styles.statTop}><Ionicons name="star" size={16} color={T.accent} /><Text style={[styles.statN, { color: T.accent }]}>{item.rating}</Text></View>
            <Text style={styles.statL}>{hi ? 'रेटिंग' : 'rating'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statN}>{done}</Text>
            <Text style={styles.statL}>{hi ? 'काम पूरे' : 'jobs done'}</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.statTop}><Ionicons name="navigate" size={15} color={T.primary} /><Text style={[styles.statN, { color: T.primary }]}>{item.dist}</Text></View>
            <Text style={styles.statL}>{t('away')}</Text>
          </View>
        </View>

        {/* pay */}
        <View style={styles.payBox}>
          <View style={styles.payLeft}>
            <Ionicons name="cash" size={20} color={T.primary} />
            <Text style={styles.payLabel}>{isEmployer ? (hi ? 'दैनिक दर' : 'Daily rate') : (hi ? 'मज़दूरी' : 'Pay offered')}</Text>
          </View>
          <Text style={styles.payVal}>{item.pay}<Text style={styles.payUnit}>{t('perDay')}</Text></Text>
        </View>

        {/* location */}
        <View style={styles.locRow}>
          <Ionicons name="location" size={19} color={T.primary} />
          <Text style={styles.locTxt}>{loc} · {item.dist} {t('away')}</Text>
        </View>

        {/* about */}
        <Text style={styles.aboutH}>{isEmployer ? (hi ? 'कारीगर के बारे में' : 'About the worker') : (hi ? 'काम के बारे में' : 'About the work')}</Text>
        <Text style={styles.aboutTxt}>{about}</Text>

        {/* actions */}
        <View style={styles.actions}>
          <Pressable style={styles.applyBtn}>
            <Ionicons name="hand-left" size={20} color="#fff" />
            <Text style={styles.applyTxt}>{isEmployer ? t('hire') : t('apply')}</Text>
          </Pressable>
          <Pressable style={styles.callBtn}>
            <Ionicons name="call" size={22} color={T.primary} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  content: { paddingHorizontal: 18, paddingBottom: 28 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6 },
  backTxt: { color: T.sub, fontSize: 14 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 },
  avatar: { width: 74, height: 74, borderRadius: 37, borderWidth: 3, borderColor: T.surface },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: 19, fontWeight: '800', color: T.ink },
  sub: { fontSize: 13.5, color: T.sub, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  ratingTxt: { fontWeight: '700', fontSize: 14, color: T.ink },
  ratingSub: { fontSize: 13, color: T.sub },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 18 },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 14, paddingVertical: 11 },
  statTop: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  statN: { fontSize: 17, fontWeight: '800', color: T.ink },
  statL: { fontSize: 11, color: T.sub },
  payBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: T.soft, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16, marginTop: 14 },
  payLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  payLabel: { fontWeight: '600', fontSize: 14, color: T.ink },
  payVal: { fontSize: 20, fontWeight: '800', color: T.primary },
  payUnit: { fontSize: 12, color: T.sub, fontWeight: '600' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  locTxt: { fontSize: 13.5, color: T.sub },
  aboutH: { fontWeight: '700', fontSize: 15, color: T.ink, marginTop: 18, marginBottom: 6 },
  aboutTxt: { fontSize: 13.5, color: T.sub, lineHeight: 21 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 22 },
  applyBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: T.primary, borderRadius: 15, paddingVertical: 15, ...T.shadow },
  applyTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  callBtn: { width: 54, borderWidth: 1.5, borderColor: T.primary, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: T.surface },
});
