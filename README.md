# KaamSaathi — Expo App

A village labour marketplace connecting workers (carpenters, masons, tile-layers, farm labour, plumbers, etc.) with employers/homeowners nearby. Mobile-first, icon-led, bilingual (Hindi + English), with phone-OTP login and geo-matching.

Built with **Expo / React Native** + **React Navigation** (native stack + bottom tabs) — runs on a real phone via **Expo Go**, no native build needed.

## Run it

1. Install Node.js (18+) and the Expo CLI is bundled — no global install needed.
2. In this folder:

   ```bash
   npm install
   npx expo start
   ```

3. Install **Expo Go** on your phone (Play Store / App Store).
4. Scan the QR code shown in the terminal/browser with Expo Go (Android) or the Camera app (iOS).

The app opens on your phone with live reload.

## What's inside

| Screen | What it does |
|---|---|
| **Role** | Choose Worker or Employer (with real photos) |
| **Auth** | Phone number → OTP (demo code shown on screen; wrong code shows error) |
| **Discover** | Map + nearby list of jobs (worker) or workers (employer), category filter; tap a card → **Job Detail** |
| **Job Detail** | Full profile: photo, rating, trust stats, pay, location, about, Apply/Call |
| **Post Work** (employer) | **New** tab: job profile, requirements, location, salary range, hours (max 8), contact. **Posted** tab: your posted jobs + interested workers with Accept/Call |
| **Community** | Social feed of posts |
| **Profile** | Availability toggle, verification badges, reliability stats, skills, two-way reviews, logout |

Switch **HI / EN** any time from the header. Switch **Worker / Employer** by logging out and re-picking a role.

## Wiring it to real services (next steps)

This is a working front-end. To make it production-ready you'll add a backend:

- **OTP SMS**: replace the demo code in `src/screens/AuthScreen.js` with a real provider — **Firebase Phone Auth** (easiest for India, generous free tier), **MSG91**, or **Twilio**.
- **Data**: move `src/data.js` to an API (Firebase Firestore / Supabase / your own server) for jobs, workers, posts, reviews.
- **Geo-matching**: use the device GPS (`expo-location`) + a backend query that returns people within a chosen radius.
- **Image uploads**: profile and proof-of-work photos via `expo-image-picker` + cloud storage.

## Project structure

```
expo-app/
├── App.js                  # entry + simple state navigation
├── app.json                # Expo config
├── package.json
├── assets/workers/         # the real worker photos
└── src/
    ├── theme.js            # earthy-green palette
    ├── i18n.js             # Hindi/English strings + provider
    ├── data.js             # demo data (jobs, workers, posted jobs, reviews)
    ├── components/LangToggle.js
    └── screens/
        ├── RoleScreen.js
        ├── AuthScreen.js
        ├── MainTabs.js      # React Navigation bottom tabs + top bar
        ├── DetailScreen.js  # job / worker detail (pushed on stack)
        └── tabs/
            ├── DiscoverTab.js
            ├── PostJobTab.js    # New form + My Posted Jobs
            ├── CommunityTab.js
            └── ProfileTab.js
```
