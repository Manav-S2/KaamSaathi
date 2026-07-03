# KaamSaathi
A village labour marketplace connecting local workers with nearby employers — mobile-first, bilingual (Hindi/English), built with Expo &amp; React Native.


KaamSaathi is a mobile marketplace that connects village and small-town labourers — carpenters, masons, tile-layers, farm workers, plumbers, and more — with nearby employers and homeowners. It's icon-led and bilingual (Hindi + English), with phone-OTP login and location-based matching, so users with low literacy or limited English can navigate it easily.

Two roles, one app

Workers discover nearby jobs, view details, and apply or call directly
Employers post work (requirements, location, salary range, hours) and review interested workers with accept/call actions
Features

Role selection (Worker / Employer) with phone → OTP login
Discover feed with map + nearby list and category filters
Detailed job/worker profiles: ratings, trust stats, pay, location, two-way reviews
Post Work flow with posted-jobs management
Community social feed
Profile with availability toggle, verification badges, reliability stats, and skills
Live HI/EN language switching from the header
Tech stack

Expo SDK 51 (React Native 0.74, React 18)
React Navigation v6 (native stack + bottom tabs)
@expo/vector-icons, runs on any phone via Expo Go — no native build needed
Run locally

npm install
npx expo start
Scan the QR with Expo Go (Android) or the Camera app (iOS).

Front-end prototype with demo data — designed to wire into a backend (Firebase/Supabase) for real OTP SMS, geo-matching, and image uploads.

