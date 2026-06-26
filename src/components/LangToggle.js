import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useI18n } from '../i18n';
import { T } from '../theme';

// Small HI/EN pill used on headers
export default function LangToggle({ style }) {
  const { hi, setHi } = useI18n();
  return (
    <View style={[styles.wrap, style]}>
      <Pressable onPress={() => setHi(true)} style={[styles.seg, hi && styles.on]}>
        <Text style={[styles.txt, hi && styles.txtOn]}>हिंदी</Text>
      </Pressable>
      <Pressable onPress={() => setHi(false)} style={[styles.seg, !hi && styles.on]}>
        <Text style={[styles.txt, !hi && styles.txtOn]}>EN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 999, padding: 3, borderWidth: 1, borderColor: T.border },
  seg: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 999 },
  on: { backgroundColor: T.primary },
  txt: { fontWeight: '700', fontSize: 12, color: T.sub },
  txtOn: { color: '#fff' },
});
