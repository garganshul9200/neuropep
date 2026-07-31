# Neuropep

React Native mobile app for Neuropep — medication tracking, protocol building, and daily health workflows.

Built with **React Native 0.86.2** and **TypeScript**. UI implemented from Figma for iOS and Android.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Features](#features)
- [Libraries & packages](#libraries--packages)
- [Development assumptions](#development-assumptions)
- [Conventions](#conventions)
- [Out of scope](#out-of-scope)
- [Troubleshooting](#troubleshooting)

---

## Tech stack

| Layer | Version / detail |
| --- | --- |
| React Native | `0.86.2` |
| React | `19.2.3` |
| TypeScript | `^5.8.3` |
| Node | `>= 22.11.0` |
| Package manager | npm |
| Navigation | React Navigation 7 (native stack + bottom tabs) |
| Android | `minSdk` 24 · `compileSdk` / `targetSdk` 36 |
| iOS | CocoaPods (`Podfile`) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) **≥ 22.11.0**
- npm (comes with Node)
- Xcode + CocoaPods (iOS)
- Android Studio / SDK (Android)
- Follow the official [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)

---

## Getting started

### 1. Install dependencies

```sh
npm install
```

### 2. iOS pods (macOS only)

```sh
bundle install
cd ios && bundle exec pod install && cd ..
```

### 3. Start Metro

```sh
npm start
```

### 4. Run the app

In a second terminal:

```sh
# Android
npm run android

# iOS
npm run ios
```

You can also open `ios/neuropep.xcworkspace` in Xcode or the `android/` project in Android Studio.

---

## Available scripts

| Script | Description |
| --- | --- |
| `npm start` | Start Metro bundler |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest |
| `npm run build_android` | Assemble Android release APK |
| `npm run clean` | Clean Android Gradle build |

---

## Project structure

```text
neuropep/
├── App.tsx                 # App entry → SafeAreaProvider + RootNavigator
├── index.js                # Native registration
├── metro.config.js         # SVG transformer config
├── android/                # Android native project
├── ios/                    # iOS native project
└── src/
    ├── assets/icons/       # SVG icons (exported via index)
    ├── components/         # Shared UI
    │   └── builder/        # Form fields, chips, builder primitives
    ├── constants/          # Shared constants / image paths
    ├── navigation/         # Stack, tabs, param types
    ├── screens/            # Feature screens
    │   ├── LoginScreen/
    │   ├── HomeScreen.tsx
    │   ├── ProtocolBuilder/
    │   ├── AddMedication/
    │   └── PlaceholderScreen.tsx
    ├── theme/              # Colors & gradients
    └── types/              # Type declarations (e.g. SVG modules)
```

**Key entry points for review**

| Area | Path |
| --- | --- |
| Navigation | `src/navigation/RootNavigator.tsx` |
| Design tokens | `src/theme/colors.ts` |
| Home | `src/screens/HomeScreen.tsx` |
| Protocol Builder | `src/screens/ProtocolBuilder/` |
| Add Medication | `src/screens/AddMedication/` |
| Form primitives | `src/components/builder/` |

---

## Features

| Screen / flow | Status | Notes |
| --- | --- | --- |
| Login | Done (UI) | Continues into app; auth not wired |
| Home | Done (UI) | Morning Brief, checklist, Quick Links, protocol prompt |
| Protocol Builder | Done (UI) | Multi-step flow; answers kept in memory |
| Add Medication (AI) | Done (UI) | Chat UX with mocked parse result |
| Add Medication (manual) | Done (UI) | Vial preview, colors, form fields, save CTA |
| Track / Lifestyle / Profile | Placeholder | Tab shells only |

---

## Libraries & packages

### Runtime

| Package | Role |
| --- | --- |
| `react` / `react-native` | Core framework |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/native-stack` | Root stack (Login, Main, Protocol Builder, Add Medication) |
| `@react-navigation/bottom-tabs` | Main tabs (Home, Track, Lifestyle, Profile) |
| `react-native-screens` | Native screen containers |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-svg` | SVG icon rendering |
| `react-native-size-matters` | Responsive scaling (`moderateScale`, `ScaledSheet`) |
| `@react-native-community/datetimepicker` | Native date picker (optional; start date uses shared calendar sheet for iOS/Android parity) |

### Tooling

| Package | Role |
| --- | --- |
| `typescript` | Static typing |
| `eslint` + `@react-native/eslint-config` | Linting |
| `prettier` | Formatting |
| `jest` | Unit tests |
| `react-native-svg-transformer` | Import `.svg` as React components |
| `@react-native/metro-config` / babel / jest presets | RN 0.86 toolchain |

No Redux, Zustand, React Query, Axios, or auth SDK is used in this phase.

---

## Development assumptions

This phase is a **UI implementation** against Figma. The following are intentional:

1. **No backend / API** — no network layer; medication AI parse, protocol answers, and checklist data are mocked or local state.
2. **No real authentication** — login navigates into the app; no tokens, session restore, or OAuth.
3. **No persistence** — drafts and toggles reset on remount / app restart.
4. **Cross-platform parity** — shared sheets (select, date) behave the same on iOS and Android where possible.
5. **Phone-first layouts** — spacing and type use `react-native-size-matters` against Figma phone frames.
6. **SVG icons** — icons live under `src/assets/icons/` and are exported from the icons index (not icon fonts).
7. **Typed navigation & drafts** — stack/tab params and medication/protocol models are TypeScript-typed.
8. **Native rebuild after native deps** — after adding/updating native modules, run `pod install` (iOS) and rebuild; Metro reload alone is not enough.

---

## Conventions

- App code lives under `src/`; keep screens thin and push reusable UI into `src/components/`.
- Theme colors come from `src/theme/colors.ts` — avoid hard-coding one-off hex values when a token exists.
- Prefer shared builder fields (`FormTextField`, `FormSelectField`, `FormDateField`) for forms.
- New SVG icons: add file → export from `src/assets/icons/index.ts`.
- Metro treats `.svg` as source via `react-native-svg-transformer` (`metro.config.js`).

---

## Out of scope

Planned / not included in this delivery:

- Real auth (email / Google)
- API integration and persistence
- Production AI medication parsing
- Full Track, Lifestyle, and Profile features
- E2E / UI automation coverage

---

## Troubleshooting

**Metro cache issues**

```sh
npm start -- --reset-cache
```

**iOS pod / native module errors** (after dependency changes)

```sh
cd ios && bundle exec pod install && cd ..
npm run ios
```

**Android clean rebuild**

```sh
npm run clean
npm run android
```

For environment setup problems, see the [React Native troubleshooting guide](https://reactnative.dev/docs/troubleshooting).
