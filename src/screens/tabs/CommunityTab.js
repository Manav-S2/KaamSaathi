import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../i18n';
import { T } from '../../theme';
import { WORKER_PHOTOS, EMPLOYER_PHOTOS } from '../../data';

const POSTS = [
  { av: WORKER_PHOTOS[0], en: 'Rajesh Kumar', hi: 'राजेश कुमार', rEn: 'Carpenter', rHi: 'बढ़ई', tEn: 'Finished a cabinet job in Rampur today — happy client!', tHi: 'आज रामपुर में अलमारी का काम पूरा किया — खुश ग्राहक!', likes: 12, comments: 3, time: '2h' },
  { av: EMPLOYER_PHOTOS[0], en: 'Suresh Gupta', hi: 'सुरेश गुप्ता', rEn: 'Employer', rHi: 'नियोक्ता', tEn: 'Need 2 masons near Bhojpur this week. Fair pay, lunch included.', tHi: 'इस हफ़्ते भोजपुर के पास 2 राजमिस्त्री चाहिए। उचित मज़दूरी, खाना शामिल।', likes: 8, comments: 5, time: '5h' },
  { av: WORKER_PHOTOS[3], en: 'Mangal Singh', hi: 'मंगल सिंह', rEn: 'Farm labour', rHi: 'खेत मज़दूर', tEn: 'Available for farm and loading work all month. Call me.', tHi: 'इस महीने खेत और लोडिंग के काम के लिए उपलब्ध। संपर्क करें।', likes: 5, comments: 1, time: '1d' },
];

export default function CommunityTab() {
  const { t, hi } = useI18n();
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.h1}>{t('community')}</Text>
      {POSTS.map((p, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.head}>
            <Image source={p.av} style={styles.av} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{hi ? p.hi : p.en}</Text>
              <Text style={styles.role}>{(hi ? p.rHi : p.rEn)} · {p.time}</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={20} color={T.sub} />
          </View>
          <Text style={styles.text}>{hi ? p.tHi : p.tEn}</Text>
          <View style={styles.actions}>
            <View style={styles.action}><Ionicons name="heart" size={17} color={T.accent} /><Text style={styles.actionTxt}>{p.likes}</Text></View>
            <View style={styles.action}><Ionicons name="chatbubble" size={16} color={T.primary} /><Text style={styles.actionTxt}>{p.comments}</Text></View>
            <View style={[styles.action, { marginLeft: 'auto' }]}><Ionicons name="share-social" size={17} color={T.sub} /></View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  h1: { fontSize: 20, fontWeight: '800', color: T.ink, marginVertical: 6 },
  card: { backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 16, padding: 13, marginBottom: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  av: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: T.bg },
  name: { fontWeight: '700', fontSize: 14, color: T.ink },
  role: { fontSize: 11.5, color: T.sub },
  text: { fontSize: 13.5, color: T.ink, lineHeight: 20, marginTop: 9 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 11, paddingTop: 10, borderTopWidth: 1, borderTopColor: T.border },
  action: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionTxt: { fontSize: 12.5, color: T.sub },
});
