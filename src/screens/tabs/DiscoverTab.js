import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../i18n';
import { T } from '../../theme';
import { JOBS, WORKERS, CATEGORIES, WORKER_PHOTOS } from '../../data';

export default function DiscoverTab({ role, navigation }) {
  const { t, hi } = useI18n();
  const [cat, setCat] = useState(-1);
  const items = role === 'employer' ? WORKERS : JOBS;
  const openDetail = (it) => navigation.navigate('Detail', { item: it, role });

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.locRow}>
        <View style={styles.locLeft}>
          <Ionicons name="location" size={18} color={T.primary} />
          <Text style={styles.locTxt}>{t('loc')}</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="navigate" size={14} color={T.primary} />
          <Text style={styles.chipTxt}>{t('within')}</Text>
        </View>
      </View>

      <Text style={styles.h1}>{role === 'employer' ? t('workersNear') : t('workNear')}</Text>
      <Text style={styles.count}>{items.length} · {t('within')}</Text>

      {/* category chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} contentContainerStyle={{ gap: 8 }}>
        <Pressable style={[styles.cChip, cat === -1 && styles.cChipOn]} onPress={() => setCat(-1)}>
          <Text style={[styles.cChipTxt, cat === -1 && styles.cChipTxtOn]}>{hi ? 'सभी' : 'All'}</Text>
        </Pressable>
        {CATEGORIES.map((c, i) => (
          <Pressable key={i} style={[styles.cChip, cat === i && styles.cChipOn]} onPress={() => setCat(i)}>
            <Ionicons name={c.icon} size={15} color={cat === i ? '#fff' : T.primary} />
            <Text style={[styles.cChipTxt, cat === i && styles.cChipTxtOn]}>{hi ? c.hi : c.en}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* simple map banner with avatar pins */}
      <View style={styles.map}>
        <View style={styles.ring} />
        <View style={styles.you} />
        {items.map((it, i) => {
          const pos = [[62, 18], [28, 30], [72, 60], [40, 70], [20, 16]][i] || [50, 50];
          return (
            <Pressable key={i} onPress={() => openDetail(it)} style={[styles.pinWrap, { left: `${pos[0]}%`, top: `${pos[1]}%` }]}>
              <Image source={WORKER_PHOTOS[it.ph]} style={styles.pin} />
            </Pressable>
          );
        })}
        <View style={styles.mapTag}><Text style={styles.mapTagTxt}>{t('within')}</Text></View>
      </View>

      <Text style={styles.listHead}>{t('nearest')}</Text>

      {items.map((it, i) => (
        <Pressable key={i} style={styles.row} onPress={() => openDetail(it)}>
          <Image source={WORKER_PHOTOS[it.ph]} style={styles.rowAv} />
          <View style={{ flex: 1 }}>
            <View style={styles.rowTitleRow}>
              <Text style={styles.rowTitle}>{hi ? it.hi : it.en}</Text>
              {it.verified && <Ionicons name="checkmark-circle" size={15} color={T.primary} />}
            </View>
            <Text style={styles.rowSub}>
              {role === 'employer' ? (hi ? it.roleHi : it.roleEn) : (hi ? it.byHi : it.byEn)} · {hi ? it.locHi : it.locEn}
            </Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={13} color={T.accent} />
                <Text style={[styles.metaTxt, { color: T.accent, fontWeight: '700' }]}>{it.rating}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="navigate" size={13} color={T.sub} />
                <Text style={styles.metaTxt}>{it.dist} {t('away')}</Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.pay}>{it.pay}</Text>
            <Text style={styles.perDay}>{t('perDay')}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  locRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  locLeft: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  locTxt: { fontWeight: '600', fontSize: 14, color: T.ink },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: T.soft, paddingVertical: 5, paddingHorizontal: 11, borderRadius: 999 },
  chipTxt: { color: T.primary, fontWeight: '700', fontSize: 12.5 },
  h1: { fontSize: 20, fontWeight: '800', color: T.ink, marginTop: 12 },
  count: { fontSize: 13, color: T.sub },
  cChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999 },
  cChipOn: { backgroundColor: T.primary, borderColor: T.primary },
  cChipTxt: { fontWeight: '600', fontSize: 12.5, color: T.ink },
  cChipTxtOn: { color: '#fff' },
  map: { height: 180, borderRadius: 18, backgroundColor: T.soft, borderWidth: 1, borderColor: T.border, marginTop: 14, position: 'relative', overflow: 'hidden' },
  ring: { position: 'absolute', left: '50%', top: '55%', width: 150, height: 150, marginLeft: -75, marginTop: -75, borderRadius: 75, borderWidth: 2, borderColor: T.primary, borderStyle: 'dashed', opacity: 0.4 },
  you: { position: 'absolute', left: '50%', top: '55%', width: 22, height: 22, marginLeft: -11, marginTop: -11, borderRadius: 11, backgroundColor: T.accent, borderWidth: 3, borderColor: '#fff' },
  pinWrap: { position: 'absolute', width: 34, height: 34, marginLeft: -17, marginTop: -17 },
  pin: { width: 34, height: 34, borderRadius: 17, borderWidth: 2.5, borderColor: T.primary },
  mapTag: { position: 'absolute', left: 8, bottom: 8, backgroundColor: T.surface, paddingVertical: 4, paddingHorizontal: 9, borderRadius: 999 },
  mapTagTxt: { fontSize: 11, fontWeight: '700', color: T.ink },
  listHead: { fontSize: 15, fontWeight: '700', color: T.ink, marginTop: 18, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 16, padding: 12, marginBottom: 10 },
  rowAv: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: T.bg },
  rowTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rowTitle: { fontSize: 15, fontWeight: '700', color: T.ink },
  rowSub: { fontSize: 12.5, color: T.sub },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 3 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  metaTxt: { fontSize: 12, color: T.sub },
  pay: { fontSize: 15, fontWeight: '800', color: T.primary },
  perDay: { fontSize: 11, color: T.sub },
});
