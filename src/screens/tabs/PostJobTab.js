import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../i18n';
import { T } from '../../theme';
import { CATEGORIES, REQUIREMENTS, POSTED_JOBS, WORKER_PHOTOS } from '../../data';

export default function PostJobTab() {
  const { t, hi } = useI18n();
  const [view, setView] = useState('new'); // new | posted
  const [posted, setPosted] = useState(POSTED_JOBS);

  const [cat, setCat] = useState(0);
  const [reqs, setReqs] = useState([0, 2]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [loc, setLoc] = useState('');
  const [min, setMin] = useState(500);
  const [max, setMax] = useState(800);
  const [hours, setHours] = useState(8);

  const toggleReq = (i) => setReqs((r) => (r.includes(i) ? r.filter((x) => x !== i) : [...r, i]));
  const step = (setter, val, lo, hiB) => () => setter((v) => Math.min(hiB, Math.max(lo, v + val)));

  const submit = () => {
    const c = CATEGORIES[cat];
    const job = {
      catIdx: cat,
      tEn: title.trim() || c.en, tHi: title.trim() || c.hi,
      locEn: loc.trim() || 'Rampur', locHi: loc.trim() || 'रामपुर',
      min, max, hours, interested: [], isNew: true,
    };
    setPosted((p) => [job, ...p]);
    setTitle(''); setLoc('');
    setView('posted');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* segmented control */}
      <View style={styles.segWrap}>
        <Pressable style={[styles.seg, view === 'new' && styles.segOn]} onPress={() => setView('new')}>
          <Text style={[styles.segTxt, view === 'new' && styles.segTxtOn]}>{t('tabNew')}</Text>
        </Pressable>
        <Pressable style={[styles.seg, view === 'posted' && styles.segOn]} onPress={() => setView('posted')}>
          <Text style={[styles.segTxt, view === 'posted' && styles.segTxtOn]}>{t('tabPosted')}</Text>
        </Pressable>
      </View>

      {view === 'new' ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* job profile */}
          <Text style={styles.label}>{t('pjProfile')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
            {CATEGORIES.map((c, i) => (
              <Pressable key={i} style={[styles.catChip, cat === i && styles.catChipOn]} onPress={() => setCat(i)}>
                <Ionicons name={c.icon} size={16} color={cat === i ? '#fff' : T.primary} />
                <Text style={[styles.catTxt, cat === i && styles.catTxtOn]}>{hi ? c.hi : c.en}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.field}>
            <TextInput value={title} onChangeText={setTitle} placeholder={t('pjTitlePh')} placeholderTextColor={T.sub} style={styles.input} />
          </View>

          {/* requirements */}
          <Text style={styles.label}>{t('pjReqs')}</Text>
          <View style={styles.wrapRow}>
            {REQUIREMENTS.map((r, i) => {
              const on = reqs.includes(i);
              return (
                <Pressable key={i} style={[styles.reqChip, on ? styles.reqOn : styles.reqOff]} onPress={() => toggleReq(i)}>
                  <Ionicons name={on ? 'checkmark-circle' : 'add-circle-outline'} size={15} color={on ? T.primary : T.sub} />
                  <Text style={[styles.reqTxt, { color: on ? T.primary : T.sub }]}>{hi ? r.hi : r.en}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* location */}
          <Text style={styles.label}>{t('pjLoc')}</Text>
          <View style={styles.fieldRow}>
            <Ionicons name="location" size={18} color={T.primary} />
            <TextInput value={loc} onChangeText={setLoc} placeholder={t('loc')} placeholderTextColor={T.sub} style={[styles.input, { flex: 1 }]} />
          </View>

          {/* salary range */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>{t('pjSalary')}</Text>
            <Text style={styles.rangeTxt}>₹{min} – ₹{max}</Text>
          </View>
          <View style={styles.stepRow}>
            <Stepper label={t('pjMin')} value={`₹${min}`} onMinus={step(setMin, -50, 200, max)} onPlus={step(setMin, 50, 200, max)} />
            <Stepper label={t('pjMax')} value={`₹${max}`} onMinus={step(setMax, -50, min, 2000)} onPlus={step(setMax, 50, min, 2000)} />
          </View>

          {/* hours capped at 8 */}
          <Text style={styles.label}>{t('pjHours')}</Text>
          <View style={styles.hoursRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Pressable key={n} style={[styles.hourPill, n === hours && styles.hourPillOn]} onPress={() => setHours(n)}>
                <Text style={[styles.hourTxt, n === hours && styles.hourTxtOn]}>{n}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.capRow}>
            <Ionicons name="information-circle" size={14} color={T.primary} />
            <Text style={styles.capTxt}>{t('pjHoursCap')}</Text>
          </View>

          {/* contact */}
          <Text style={styles.label}>{t('pjContact')}</Text>
          <View style={styles.fieldRow}>
            <Ionicons name="person" size={18} color={T.primary} />
            <TextInput value={name} onChangeText={setName} placeholder={t('pjName')} placeholderTextColor={T.sub} style={[styles.input, { flex: 1 }]} />
          </View>
          <View style={[styles.fieldRow, { marginTop: 10 }]}>
            <Text style={styles.cc}>+91</Text>
            <Text style={styles.phoneTxt}>98765 43210</Text>
            <View style={styles.verifiedTag}>
              <Ionicons name="checkmark-circle" size={14} color={T.primary} />
              <Text style={styles.verifiedTxt}>{t('pjVerified')}</Text>
            </View>
          </View>

          <Pressable style={styles.postBtn} onPress={submit}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.postTxt}>{t('pjPost')}</Text>
          </Pressable>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.myJobsH}>{t('myJobs')}</Text>
          {posted.map((job, i) => {
            const c = CATEGORIES[job.catIdx];
            return (
              <View key={i} style={styles.jobCard}>
                <View style={styles.jobHead}>
                  <View style={styles.jobIcon}><Ionicons name={c.icon} size={24} color={T.primary} /></View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.jobTitleRow}>
                      <Text style={styles.jobTitle}>{hi ? job.tHi : job.tEn}</Text>
                      {job.isNew && <View style={styles.newBadge}><Text style={styles.newTxt}>{t('newBadge')}</Text></View>}
                    </View>
                    <View style={styles.jobMeta}>
                      <View style={styles.jobMetaItem}><Ionicons name="location" size={13} color={T.sub} /><Text style={styles.jobMetaTxt}>{hi ? job.locHi : job.locEn}</Text></View>
                      <View style={styles.jobMetaItem}><Ionicons name="time" size={13} color={T.sub} /><Text style={styles.jobMetaTxt}>{job.hours}h</Text></View>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.jobPay}>₹{job.min}–{job.max}</Text>
                    <Text style={styles.jobPerDay}>{t('perDay')}</Text>
                  </View>
                </View>

                <View style={styles.interestedRow}>
                  <Ionicons name="people" size={16} color={T.accent} />
                  <Text style={styles.interestedTxt}>{job.interested.length} {t('interested')}</Text>
                </View>

                {job.interested.length === 0 ? (
                  <Text style={styles.noInterest}>{t('noInterest')}</Text>
                ) : (
                  job.interested.map((w, j) => (
                    <View key={j} style={styles.worker}>
                      <Image source={WORKER_PHOTOS[w.ph]} style={styles.workerAv} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.workerName}>{hi ? w.nHi : w.nEn}</Text>
                        <View style={styles.workerMeta}>
                          <Text style={styles.workerRole}>{hi ? w.rHi : w.rEn}</Text>
                          <View style={styles.workerMetaItem}><Ionicons name="star" size={12} color={T.accent} /><Text style={[styles.workerMetaTxt, { color: T.accent, fontWeight: '700' }]}>{w.rating}</Text></View>
                          <View style={styles.workerMetaItem}><Ionicons name="navigate" size={12} color={T.sub} /><Text style={styles.workerMetaTxt}>{w.dist}</Text></View>
                        </View>
                      </View>
                      <Pressable style={styles.acceptBtn}><Ionicons name="checkmark" size={18} color="#fff" /></Pressable>
                      <Pressable style={styles.callSmall}><Ionicons name="call" size={16} color={T.primary} /></Pressable>
                    </View>
                  ))
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

function Stepper({ label, value, onMinus, onPlus }) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepLabel}>{label}</Text>
      <View style={styles.stepInner}>
        <Pressable style={styles.stepBtn} onPress={onMinus}><Ionicons name="remove" size={17} color={T.primary} /></Pressable>
        <Text style={styles.stepVal}>{value}</Text>
        <Pressable style={styles.stepBtn} onPress={onPlus}><Ionicons name="add" size={17} color={T.primary} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  segWrap: { flexDirection: 'row', backgroundColor: T.soft, borderRadius: 12, padding: 4, marginHorizontal: 16, marginTop: 6 },
  seg: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 9 },
  segOn: { backgroundColor: T.primary },
  segTxt: { fontWeight: '700', fontSize: 13, color: T.sub },
  segTxtOn: { color: '#fff' },
  content: { paddingHorizontal: 16, paddingBottom: 28, paddingTop: 10 },
  label: { fontWeight: '700', fontSize: 12.5, color: T.sub, marginTop: 16, marginBottom: 8 },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rangeTxt: { fontWeight: '800', fontSize: 14, color: T.primary, marginTop: 16 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#fff', borderWidth: 1, borderColor: T.border, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999 },
  catChipOn: { backgroundColor: T.primary, borderColor: T.primary },
  catTxt: { fontWeight: '600', fontSize: 12.5, color: '#5b5346' },
  catTxtOn: { color: '#fff' },
  field: { borderWidth: 1.5, borderColor: T.border, backgroundColor: T.surface, borderRadius: 13, paddingHorizontal: 13, marginTop: 10 },
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: T.border, backgroundColor: T.surface, borderRadius: 13, paddingHorizontal: 13 },
  input: { fontSize: 13.5, color: T.ink, paddingVertical: 13 },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  reqChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 11, borderRadius: 999, borderWidth: 1.5 },
  reqOn: { backgroundColor: T.soft, borderColor: T.primary },
  reqOff: { backgroundColor: '#fff', borderColor: T.border },
  reqTxt: { fontWeight: '600', fontSize: 12 },
  stepRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  stepper: { flex: 1, borderWidth: 1.5, borderColor: T.border, backgroundColor: T.surface, borderRadius: 13, paddingVertical: 9, paddingHorizontal: 11 },
  stepLabel: { fontSize: 10.5, color: T.sub },
  stepInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  stepBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: T.soft, alignItems: 'center', justifyContent: 'center' },
  stepVal: { fontSize: 15, fontWeight: '800', color: T.ink },
  hoursRow: { flexDirection: 'row', gap: 6 },
  hourPill: { flex: 1, backgroundColor: T.soft, borderRadius: 9, paddingVertical: 9, alignItems: 'center' },
  hourPillOn: { backgroundColor: T.primary },
  hourTxt: { fontWeight: '800', fontSize: 13, color: T.primary },
  hourTxtOn: { color: '#fff' },
  capRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 9 },
  capTxt: { fontSize: 11, fontWeight: '600', color: T.primary },
  cc: { fontWeight: '700', fontSize: 14, color: T.ink, paddingVertical: 13 },
  phoneTxt: { flex: 1, fontWeight: '600', fontSize: 14, color: T.ink, letterSpacing: 1 },
  verifiedTag: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  verifiedTxt: { color: T.primary, fontWeight: '700', fontSize: 10.5 },
  postBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: T.primary, borderRadius: 14, paddingVertical: 15, marginTop: 22, ...T.shadow },
  postTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  // posted view
  myJobsH: { fontSize: 16, fontWeight: '800', color: T.ink, marginBottom: 12 },
  jobCard: { borderWidth: 1, borderColor: T.border, backgroundColor: T.surface, borderRadius: 18, padding: 14, marginBottom: 13 },
  jobHead: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  jobIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: T.soft, alignItems: 'center', justifyContent: 'center' },
  jobTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  jobTitle: { fontSize: 15, fontWeight: '800', color: T.ink },
  newBadge: { backgroundColor: T.accent, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 7 },
  newTxt: { color: '#fff', fontWeight: '800', fontSize: 9 },
  jobMeta: { flexDirection: 'row', gap: 10, marginTop: 2 },
  jobMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  jobMetaTxt: { fontSize: 11.5, color: T.sub },
  jobPay: { fontSize: 14, fontWeight: '800', color: T.primary },
  jobPerDay: { fontSize: 10, color: T.sub },
  interestedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 13, marginBottom: 9 },
  interestedTxt: { fontWeight: '700', fontSize: 11.5, color: T.ink },
  noInterest: { fontSize: 12, color: T.sub, fontStyle: 'italic', paddingVertical: 4 },
  worker: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: T.bg, borderRadius: 13, padding: 9, marginBottom: 8 },
  workerAv: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: T.surface },
  workerName: { fontWeight: '700', fontSize: 13.5, color: T.ink },
  workerMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  workerRole: { fontSize: 11, color: T.sub },
  workerMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  workerMetaTxt: { fontSize: 11, color: T.sub },
  acceptBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center' },
  callSmall: { width: 34, height: 34, borderRadius: 10, borderWidth: 1.5, borderColor: T.primary, backgroundColor: T.surface, alignItems: 'center', justifyContent: 'center' },
});
