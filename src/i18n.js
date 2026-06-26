import React, { createContext, useContext, useState } from 'react';

// Bilingual strings — Hindi + English. Add keys as needed.
const STR = {
  appName:    ['कामसाथी', 'KaamSaathi'],
  tagline:    ['काम और कारीगर, एक जगह', 'Work & workers, one place'],
  roleTitle:  ['आप क्या करना चाहते हैं?', 'What brings you here?'],
  workerT:    ['मुझे काम चाहिए', 'I want work'],
  workerS:    ['कारीगर / मज़दूर', 'Worker / Craftsperson'],
  employerT:  ['मुझे काम कराना है', 'I need work done'],
  employerS:  ['काम देने वाला', 'Employer'],
  secure:     ['सुरक्षित लॉगिन', 'Safe & secure login'],
  nearby:     ['लोग पास में सक्रिय', 'people active nearby'],

  phoneEntry: ['फ़ोन नंबर डालें', 'Enter your phone'],
  phoneHint:  ['हम एक ओटीपी कोड भेजेंगे', 'We will send a one-time code'],
  phonePh:    ['मोबाइल नंबर', 'Mobile number'],
  sendOtp:    ['ओटीपी भेजें', 'Send OTP'],
  otpTitle:   ['ओटीपी डालें', 'Enter OTP'],
  sentTo:     ['कोड भेजा गया', 'Code sent to'],
  edit:       ['बदलें', 'Edit'],
  demoCode:   ['डेमो कोड', 'Demo code'],
  wrongOtp:   ['ग़लत कोड, फिर कोशिश करें', 'Wrong code, try again'],
  verify:     ['सत्यापित करें', 'Verify & continue'],
  resend:     ['ओटीपी दोबारा भेजें', 'Resend OTP'],
  resendIn:   ['दोबारा भेजें', 'Resend in'],
  back:       ['पीछे', 'Back'],

  loc:        ['रामपुर, बिहार', 'Rampur, Bihar'],
  within:     ['5 किमी', '5 km'],
  workNear:   ['आस-पास काम', 'Work near you'],
  workersNear:['आस-पास कारीगर', 'Workers near you'],
  away:       ['किमी', 'km'],
  perDay:     ['/दिन', '/day'],
  nearest:    ['सबसे पास', 'Nearest'],

  findWork:   ['काम ढूँढें', 'Find work'],
  findWorkers:['कारीगर खोजें', 'Find workers'],
  postWork:   ['काम डालें', 'Post work'],
  community:  ['समुदाय', 'Community'],
  profile:    ['प्रोफ़ाइल', 'Profile'],

  // post job
  pjHeading:  ['नया काम पोस्ट करें', 'Post a new job'],
  pjProfile:  ['काम का प्रकार', 'Job profile'],
  pjTitlePh:  ['जैसे लकड़ी की अलमारी बनवानी है', 'e.g. Make a wooden almirah'],
  pjReqs:     ['ज़रूरतें', 'Requirements'],
  pjLoc:      ['जगह', 'Location'],
  pjSalary:   ['मज़दूरी (प्रति दिन)', 'Salary range (per day)'],
  pjMin:      ['कम से कम', 'Minimum'],
  pjMax:      ['ज़्यादा से ज़्यादा', 'Maximum'],
  pjHours:    ['काम के घंटे / दिन', 'Work hours per day'],
  pjHoursCap: ['अधिकतम 8 घंटे', 'Max 8 hours/day'],
  pjContact:  ['संपर्क जानकारी', 'Contact information'],
  pjName:     ['संपर्क नाम', 'Contact name'],
  pjVerified: ['सत्यापित', 'Verified'],
  pjPost:     ['काम पोस्ट करें', 'Post work'],
  posted:     ['पोस्ट हो गया!', 'Posted!'],
  tabNew:     ['नया', 'New'],
  tabPosted:  ['पोस्ट किए', 'Posted'],
  myJobs:     ['मेरे पोस्ट किए काम', 'My posted jobs'],
  interested: ['इच्छुक', 'interested'],
  noInterest: ['अभी कोई नहीं — अभी पोस्ट हुआ', 'No one yet — just posted'],
  newBadge:   ['नया', 'NEW'],

  // profile
  availTrue:  ['काम के लिए उपलब्ध', 'Available for work'],
  availFalse: ['छुट्टी पर', 'On leave'],
  trust:      ['भरोसा और सत्यापन', 'Trust & verification'],
  reliability:['भरोसेमंदी', 'Reliability'],
  reviews:    ['समीक्षाएँ', 'Reviews'],
  logout:     ['लॉग आउट', 'Log out'],
  apply:      ['काम के लिए संपर्क करें', 'Contact for work'],
  hire:       ['काम पर रखें', 'Hire / Contact'],
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [hi, setHi] = useState(true); // default Hindi
  const t = (key) => {
    const v = STR[key];
    if (!v) return key;
    return hi ? v[0] : v[1];
  };
  return (
    <I18nContext.Provider value={{ hi, setHi, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
