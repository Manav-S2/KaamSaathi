import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../i18n';
import { T } from '../theme';

export default function AuthScreen({ navigation, route }) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const role = (route?.params?.role) || 'worker';
  const onBack = () => navigation.goBack();
  const onVerified = () => navigation.replace('Main', { role });

  const [phase, setPhase] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [gen, setGen] = useState('');
  const [err, setErr] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const timer = useRef(null);

  const phoneValid = phone.length === 10;
  const fmtPhone = phone.replace(/(\d{5})(\d{1,5})/, '$1 $2');

  const startResend = () => {
    clearInterval(timer.current);
    setResendIn(30);
    timer.current = setInterval(() => {
      setResendIn((s) => { if (s <= 1) { clearInterval(timer.current); return 0; } return s - 1; });
    }, 1000);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  const sendOtp = () => {
    if (!phoneValid) return;
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGen(code); setOtp(''); setErr(false); setPhase('otp'); startResend();
  };
  const verify = () => {
    if (otp.length < 4) return;
    if (otp === gen) onVerified(); else setErr(true);
  };
  const resend = () => {
    if (resendIn !== 0) return;
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGen(code); setOtp(''); setErr(false); startResend();
  };

  return (
    <View style={styles.root}>
      {/* GREEN COLOUR-BLOCK HERO (same dimensions as Clay variant) */}
      <View style={[styles.hero, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.back} onPress={phase === 'otp' ? () => setPhase('phone') : onBack}>
          <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.9)" />
          <Text style={styles.backTxt}>{t('back')}</Text>
        </Pressable>

        <View style={styles.iconBox}>
          <Ionicons name={phase === 'otp' ? 'chatbox-ellipses' : 'phone-portrait'} size={30} color="#fff" />
        </View>

        {phase === 'phone' ? (
          <>
            <Text style={styles.h1}>{t('phoneEntry')}</Text>
            <Text style={styles.sub}>{t('phoneHint')}</Text>
          </>
        ) : (
          <>
            <Text style={styles.h1}>{t('otpTitle')}</Text>
            <View style={styles.sentRow}>
              <Text style={styles.sub}>{t('sentTo')} +91 {fmtPhone}</Text>
              <Pressable onPress={() => setPhase('phone')} style={styles.editChip}>
                <Text style={styles.editTxt}>{t('edit')}</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {phase === 'phone' ? (
          <>
            <View style={[styles.inputRow, { borderColor: phoneValid ? T.primary : T.border }]}>
              <Text style={styles.cc}>🇮🇳 +91</Text>
              <TextInput
                value={phone}
                onChangeText={(v) => setPhone(v.replace(/\D/g, '').slice(0, 10))}
                keyboardType="number-pad"
                placeholder={t('phonePh')}
                placeholderTextColor={T.sub}
                style={styles.input}
              />
            </View>
            <Pressable style={[styles.cta, { backgroundColor: phoneValid ? T.primary : '#b8b0a0' }]} onPress={sendOtp}>
              <Text style={styles.ctaTxt}>{t('sendOtp')}</Text>
              <Ionicons name="chatbox" size={20} color="#fff" />
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.demo}>
              <Ionicons name="information-circle" size={17} color={T.primary} />
              <Text style={styles.demoTxt}>{t('demoCode')}: <Text style={{ fontWeight: '800', letterSpacing: 2 }}>{gen}</Text></Text>
            </View>

            <View style={styles.otpWrap}>
              <View style={styles.otpBoxes} pointerEvents="none">
                {[0, 1, 2, 3].map((i) => (
                  <View key={i} style={[styles.otpBox, { borderColor: err ? T.warn : (otp.length === i ? T.primary : (otp[i] ? T.primary : T.border)) }]}>
                    <Text style={styles.otpCh}>{otp[i] || ''}</Text>
                  </View>
                ))}
              </View>
              <TextInput
                value={otp}
                onChangeText={(v) => { setOtp(v.replace(/\D/g, '').slice(0, 4)); setErr(false); }}
                keyboardType="number-pad"
                autoFocus
                style={styles.otpInput}
                maxLength={4}
              />
            </View>

            {err && (
              <View style={styles.errRow}>
                <Ionicons name="alert-circle" size={16} color={T.warn} />
                <Text style={styles.errTxt}>{t('wrongOtp')}</Text>
              </View>
            )}

            <Pressable style={[styles.cta, { backgroundColor: otp.length === 4 ? T.primary : '#b8b0a0' }]} onPress={verify}>
              <Text style={styles.ctaTxt}>{t('verify')}</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </Pressable>

            <Pressable onPress={resend} style={{ marginTop: 14 }}>
              <Text style={[styles.resend, { color: resendIn === 0 ? T.accent : T.sub }]}>
                {resendIn === 0 ? t('resend') : `${t('resendIn')} ${resendIn}s`}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.bg },
  hero: { backgroundColor: T.primary, paddingHorizontal: 22, paddingBottom: 26, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backTxt: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  iconBox: { width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  h1: { fontSize: 23, fontWeight: '800', color: '#fff', marginTop: 14 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 3 },
  sentRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 3 },
  editChip: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 9 },
  editTxt: { color: '#fff', fontWeight: '700', fontSize: 11.5 },
  body: { paddingHorizontal: 22, paddingTop: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderRadius: 16, paddingHorizontal: 16, backgroundColor: T.surface, ...T.shadow },
  cc: { fontWeight: '700', fontSize: 16, color: T.ink, borderRightWidth: 1.5, borderRightColor: T.border, paddingRight: 10 },
  input: { flex: 1, fontSize: 17, fontWeight: '600', color: T.ink, letterSpacing: 1, paddingVertical: 14 },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, paddingVertical: 16, marginTop: 18, ...T.shadow },
  ctaTxt: { color: '#fff', fontWeight: '700', fontSize: 17 },
  demo: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: T.soft, borderRadius: 11, paddingVertical: 9, paddingHorizontal: 12 },
  demoTxt: { fontSize: 12.5, color: T.primary },
  otpWrap: { marginTop: 16, position: 'relative' },
  otpBoxes: { flexDirection: 'row', gap: 10 },
  otpBox: { flex: 1, height: 58, borderWidth: 2, borderRadius: 15, backgroundColor: T.surface, alignItems: 'center', justifyContent: 'center', ...T.shadow },
  otpCh: { fontSize: 27, fontWeight: '800', color: T.ink },
  otpInput: { position: 'absolute', top: 0, left: 0, right: 0, height: 58, opacity: 0 },
  errRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  errTxt: { color: T.warn, fontWeight: '600', fontSize: 12.5 },
  resend: { textAlign: 'center', fontSize: 13, fontWeight: '600' },
});
