import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../i18n';
import { T } from '../../theme';
import { WORKER_PHOTOS, EMPLOYER_PHOTOS, REVIEWS } from '../../data';

export default function ProfileTab({ role, onLogout }) {
  const { t, hi } = useI18n();
  const [onLeave, setOnLeave] = useState(false);
  const isWorker = role !== 'employer';

  const profile = isWorker
    ? { name: hi ? 'राजेश कुमार' : 'Rajesh Kumar', sub: hi ? 'बढ़ई · रामपुर' : 'Carpenter · Rampur', av: WORKER_PHOTOS[0],
        stats: [['56', hi ? 'काम' : 'jobs'], ['4.9', hi ? 'रेटिंग' : 'rating'], ['3y', hi ? 'अनुभव' : 'exp.']],
        skills: hi ? ['बढ़ई', 'फर्नीचर', 'मरम्मत', 'पॉलिश'] : ['Carpenter', 'Furniture', 'Repair', 'Polish'] }
    : { name: hi ? 'सुरेश गुप्ता' : 'Suresh Gupta', sub: hi ? 'नियोक्ता · रामपुर' : 'Employer · Rampur', av: EMPLOYER_PHOTOS[0],
        stats: [['12', hi ? 'पोस्ट' : 'posted'], ['9', hi ? 'रखा' : 'hired'], ['4.8', hi ? 'रेटिंग' : 'rating']],
        skills: null };

  const verifs = [
    { icon: 'card', label: hi ? 'पहचान सत्यापित' : 'ID verified', ok: true },
    { icon: 'phone-portrait', label: hi ? 'फ़ोन सत्यापित' : 'Phone verified', ok: true },
    { icon: 'location', label: hi ? 'पता सत्यापित' : 'Address verified', ok: true },
    { icon: 'school', label: hi ? 'हुनर सत्यापित' : 'Skill verified', ok: isWorker },
  ];

  const insights = isWorker
    ? [['time', '98%', hi ? 'समय पर' : 'On-time'], ['repeat', '12', hi ? 'दोबारा' : 'Repeat'], ['checkmark-done', '94%', hi ? 'पूरा' : 'Completion']]
    : [['checkmark-done', '96%', hi ? 'समय पर भुगतान' : 'Pays on time'], ['repeat', '7', hi ? 'दोबारा' : 'Repeat'], ['flash', '2h', hi ? 'जवाब' : 'Response']];

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* header */}
      <View style={styles.hero}>
        <Image source={profile.av} style={styles.avatar} />
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile.name}</Text>
          <Ionicons name="checkmark-circle" size={18} color={T.primary} />
        </View>
        <Text style={styles.sub}>{profile.sub}</Text>
      </View>

      {/* stats */}
      <View style={styles.statsRow}>
        {profile.stats.map((s, i) => (
          <View key={i} style={styles.statBox}>
            <Text style={[styles.statN, i === 1 && { color: T.accent }]}>{s[0]}</Text>
            <Text style={styles.statL}>{s[1]}</Text>
          </View>
        ))}
      </View>

      {/* availability */}
      <Pressable style={[styles.availBox, { backgroundColor: onLeave ? '#F6E7DC' : '#E7F0E8' }]} onPress={() => setOnLeave((v) => !v)}>
        <View style={[styles.dot, { backgroundColor: onLeave ? T.warn : T.ok }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.availTitle}>{onLeave ? t('availFalse') : t('availTrue')}</Text>
          <Text style={styles.availSub}>{onLeave ? (hi ? 'अभी काम नहीं ले रहे' : 'Not taking jobs right now') : (hi ? 'पास के मालिकों को दिख रहे' : 'Shown to nearby employers')}</Text>
        </View>
        <Ionicons name={onLeave ? 'toggle' : 'toggle'} size={34} color={onLeave ? T.warn : T.ok} style={{ transform: [{ scaleX: onLeave ? -1 : 1 }] }} />
      </Pressable>

      {/* skills */}
      {profile.skills && (
        <>
          <Text style={styles.secH}>{hi ? 'हुनर' : 'Skills'}</Text>
          <View style={styles.wrap}>
            {profile.skills.map((sk, i) => (
              <View key={i} style={styles.skill}><Text style={styles.skillTxt}>{sk}</Text></View>
            ))}
          </View>
        </>
      )}

      {/* trust */}
      <Text style={styles.secH}>{t('trust')}</Text>
      <View style={styles.grid}>
        {verifs.map((v, i) => (
          <View key={i} style={styles.verif}>
            <Ionicons name={v.icon} size={20} color={v.ok ? T.primary : '#b3ab9c'} />
            <Text style={styles.verifTxt}>{v.label}</Text>
            <Ionicons name={v.ok ? 'checkmark-circle' : 'ellipse-outline'} size={17} color={v.ok ? T.primary : '#b3ab9c'} />
          </View>
        ))}
      </View>

      {/* reliability */}
      <Text style={styles.secH}>{t('reliability')}</Text>
      <View style={styles.insRow}>
        {insights.map((ins, i) => (
          <View key={i} style={styles.insBox}>
            <Ionicons name={ins[0]} size={21} color={T.primary} />
            <Text style={styles.insN}>{ins[1]}</Text>
            <Text style={styles.insL}>{ins[2]}</Text>
          </View>
        ))}
      </View>

      {/* reviews */}
      <Text style={styles.secH}>{t('reviews')}</Text>
      {REVIEWS.map((r, i) => (
        <View key={i} style={styles.review}>
          <View style={styles.reviewHead}>
            <Image source={isWorker ? EMPLOYER_PHOTOS[r.ph] : WORKER_PHOTOS[r.ph]} style={styles.reviewAv} />
            <View style={{ flex: 1 }}>
              <Text style={styles.reviewName}>{hi ? r.hi : r.en}</Text>
              <Text style={styles.reviewRole}>{hi ? r.roleHi : r.roleEn}</Text>
            </View>
            <Text style={styles.stars}>{'★★★★★'.slice(0, r.stars)}{'☆☆☆☆☆'.slice(0, 5 - r.stars)}</Text>
          </View>
          <Text style={styles.reviewTxt}>{hi ? r.tHi : r.tEn}</Text>
        </View>
      ))}

      <Pressable style={styles.logout} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={20} color={T.accent} />
        <Text style={styles.logoutTxt}>{t('logout')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  hero: { alignItems: 'center', marginTop: 6 },
  avatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 3, borderColor: T.surface },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 },
  name: { fontSize: 19, fontWeight: '800', color: T.ink },
  sub: { fontSize: 12.5, color: T.sub },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 14, paddingVertical: 11 },
  statN: { fontSize: 17, fontWeight: '800', color: T.ink },
  statL: { fontSize: 10.5, color: T.sub },
  availBox: { flexDirection: 'row', alignItems: 'center', gap: 11, borderRadius: 14, padding: 13, marginTop: 18 },
  dot: { width: 11, height: 11, borderRadius: 6 },
  availTitle: { fontWeight: '800', fontSize: 14, color: T.ink },
  availSub: { fontSize: 11.5, color: T.sub },
  secH: { fontWeight: '700', fontSize: 13.5, color: T.ink, marginTop: 18, marginBottom: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  skill: { backgroundColor: T.soft, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999 },
  skillTxt: { color: T.primary, fontWeight: '600', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  verif: { width: '47.5%', flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, borderRadius: 12, padding: 10 },
  verifTxt: { flex: 1, fontWeight: '600', fontSize: 11.5, color: T.ink },
  insRow: { flexDirection: 'row', gap: 8 },
  insBox: { flex: 1, alignItems: 'center', backgroundColor: T.soft, borderRadius: 14, paddingVertical: 13 },
  insN: { fontSize: 17, fontWeight: '800', color: T.ink, marginTop: 3 },
  insL: { fontSize: 10, color: T.sub },
  review: { borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, borderRadius: 14, padding: 12, marginBottom: 9 },
  reviewHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAv: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: T.bg },
  reviewName: { fontWeight: '700', fontSize: 13, color: T.ink },
  reviewRole: { fontSize: 11, color: T.sub },
  stars: { fontSize: 13, color: T.accent, letterSpacing: 1 },
  reviewTxt: { fontSize: 12.5, color: T.ink, lineHeight: 19, marginTop: 8 },
  logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: T.accent, borderRadius: 14, paddingVertical: 13, marginTop: 16 },
  logoutTxt: { color: T.accent, fontWeight: '700', fontSize: 15 },
});
