// Static requires so Metro can bundle the user's real worker photos.
export const WORKER_PHOTOS = [
  require('../assets/workers/w1.png'),
  require('../assets/workers/w2.png'),
  require('../assets/workers/w3.png'),
  require('../assets/workers/w4.png'),
  require('../assets/workers/w5.png'),
];

// Indian employer / household-owner avatars (remote)
const EMP = (id) => ({ uri: `https://images.unsplash.com/${id}?w=120&h=120&fit=crop&crop=faces&q=80` });
export const EMPLOYER_PHOTOS = [
  EMP('photo-1530268729831-4b0b9e170218'),
  EMP('photo-1656236577401-6c60e0baeed5'),
  EMP('photo-1694871420373-e9c1031b91ee'),
  EMP('photo-1558377235-76f53857000b'),
];

export const CATEGORIES = [
  { icon: 'construct',     en: 'Carpenter',  hi: 'बढ़ई' },
  { icon: 'cube',          en: 'Mason',      hi: 'राजमिस्त्री' },
  { icon: 'grid',          en: 'Tiles',      hi: 'टाइल' },
  { icon: 'color-fill',    en: 'Painter',    hi: 'पुताई' },
  { icon: 'leaf',          en: 'Farm',       hi: 'खेती' },
  { icon: 'flash',         en: 'Electric',   hi: 'बिजली' },
  { icon: 'water',         en: 'Plumber',    hi: 'प्लम्बर' },
  { icon: 'flame',         en: 'Welder',     hi: 'वेल्डर' },
];

// Jobs a WORKER browses (posted by employers)
export const JOBS = [
  { ph: 0, icon: 'construct',  en: 'Cabinet making',  hi: 'अलमारी बनवानी है',  byEn: 'Ramesh Kumar', byHi: 'रमेश कुमार', dist: '1.2', pay: '₹700', rating: '4.8', verified: true,  locEn: 'Rampur',   locHi: 'रामपुर' },
  { ph: 1, icon: 'cube',       en: 'Wall masonry',    hi: 'दीवार चिनाई',       byEn: 'Sunita Devi',  byHi: 'सुनीता देवी',dist: '2.4', pay: '₹650', rating: '4.6', verified: true,  locEn: 'Bhojpur',  locHi: 'भोजपुर' },
  { ph: 2, icon: 'grid',       en: 'Bathroom tiling', hi: 'बाथरूम टाइल',       byEn: 'Anil Kumar',   byHi: 'अनिल कुमार', dist: '3.1', pay: '₹800', rating: '4.9', verified: true,  locEn: 'Kotwa',    locHi: 'कोटवा' },
  { ph: 3, icon: 'color-fill', en: 'House painting',  hi: 'घर की पुताई',       byEn: 'Meena Bai',    byHi: 'मीना बाई',   dist: '0.8', pay: '₹600', rating: '4.5', verified: false, locEn: 'Rampur',   locHi: 'रामपुर' },
  { ph: 4, icon: 'flash',      en: 'Wiring repair',   hi: 'वायरिंग की मरम्मत', byEn: 'Vikas Yadav',  byHi: 'विकास यादव', dist: '4.2', pay: '₹900', rating: '4.7', verified: true,  locEn: 'Salempur', locHi: 'सालेमपुर' },
];

// Workers an EMPLOYER browses
export const WORKERS = [
  { ph: 0, icon: 'construct',  en: 'Rajesh Kumar', hi: 'राजेश कुमार', roleEn: 'Carpenter',   roleHi: 'बढ़ई',          dist: '1.1', pay: '₹700', rating: '4.9', verified: true,  locEn: 'Rampur',   locHi: 'रामपुर' },
  { ph: 1, icon: 'cube',       en: 'Imtiyaz',      hi: 'इम्तियाज़',   roleEn: 'Mason',       roleHi: 'राजमिस्त्री',  dist: '2.8', pay: '₹680', rating: '4.8', verified: true,  locEn: 'Kotwa',    locHi: 'कोटवा' },
  { ph: 2, icon: 'grid',       en: 'Sohan Lal',    hi: 'सोहन लाल',    roleEn: 'Tile-layer',  roleHi: 'टाइल मिस्त्री',dist: '3.5', pay: '₹820', rating: '4.9', verified: true,  locEn: 'Salempur', locHi: 'सालेमपुर' },
  { ph: 3, icon: 'leaf',       en: 'Mangal Singh', hi: 'मंगल सिंह',   roleEn: 'Farm labour', roleHi: 'खेत मज़दूर',    dist: '0.6', pay: '₹450', rating: '4.6', verified: false, locEn: 'Rampur',   locHi: 'रामपुर' },
  { ph: 4, icon: 'water',      en: 'Ravi Prasad',  hi: 'रवि प्रसाद',  roleEn: 'Plumber',     roleHi: 'प्लम्बर',       dist: '2.0', pay: '₹550', rating: '4.7', verified: true,  locEn: 'Bhojpur',  locHi: 'भोजपुर' },
];

export const REQUIREMENTS = [
  { en: 'Own tools',      hi: 'अपने औज़ार' },
  { en: 'Experienced',    hi: 'अनुभवी' },
  { en: 'Available now',  hi: 'तुरंत उपलब्ध' },
  { en: 'Lunch provided', hi: 'खाना मिलेगा' },
  { en: 'Local only',     hi: 'स्थानीय' },
  { en: 'Team work',      hi: 'टीम काम' },
];

export const REVIEWS = [
  { ph: 0, en: 'Suresh Gupta', hi: 'सुरेश गुप्ता', roleEn: 'Homeowner',  roleHi: 'गृहस्वामी', stars: 5, tEn: 'Skilled and punctual. Finished the almirah perfectly.', tHi: 'कुशल और समय का पाबंद। अलमारी बढ़िया बनाई।' },
  { ph: 1, en: 'Anil Kumar',   hi: 'अनिल कुमार',   roleEn: 'Contractor', roleHi: 'ठेकेदार',   stars: 4, tEn: 'Reliable worker, brings own tools. Recommended.',       tHi: 'भरोसेमंद कारीगर, अपने औज़ार लाता है। सुझाव दूँगा।' },
];

// Employer's posted jobs, each with interested workers (indices into WORKER_PHOTOS)
export const POSTED_JOBS = [
  {
    catIdx: 0, tEn: 'Cabinet making', tHi: 'अलमारी बनवानी है', locEn: 'Rampur', locHi: 'रामपुर',
    min: 500, max: 800, hours: 8,
    interested: [
      { ph: 0, nEn: 'Rajesh Kumar', nHi: 'राजेश कुमार', rEn: 'Carpenter', rHi: 'बढ़ई', rating: '4.9', dist: '1.1' },
      { ph: 1, nEn: 'Imtiyaz', nHi: 'इम्तियाज़', rEn: 'Mason', rHi: 'राजमिस्त्री', rating: '4.8', dist: '2.8' },
      { ph: 2, nEn: 'Sohan Lal', nHi: 'सोहन लाल', rEn: 'Tile-layer', rHi: 'टाइल मिस्त्री', rating: '4.9', dist: '3.5' },
    ],
  },
  {
    catIdx: 3, tEn: 'House painting', tHi: 'घर की पुताई', locEn: 'Bhojpur', locHi: 'भोजपुर',
    min: 450, max: 600, hours: 6,
    interested: [
      { ph: 3, nEn: 'Mangal Singh', nHi: 'मंगल सिंह', rEn: 'Farm / loader', rHi: 'खेत मज़दूर', rating: '4.6', dist: '0.6' },
    ],
  },
];
