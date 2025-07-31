# ILMBUDS - Islamic Children's Educational App

## Overview

ILMBUDS is a comprehensive Islamic educational mobile application designed for children, featuring interactive quizzes, stories, Quran learning, religious teachings (Ilmihal), and cartoons. The app is built as a Progressive Web App (PWA) with Capacitor for native mobile deployment, supporting multiple languages (English, Albanian, Bosnian, German, Italian) and featuring AdMob integration for monetization.

## User Preferences

Preferred communication style: Simple, everyday language.
**CRITICAL**: Never take any actions without explicit user instruction - wait for user commands before proceeding.
**IMPORTANT**: When user asks questions, only provide answers - do not take any actions or make changes unless explicitly requested.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API with custom providers (UserContext, QuizContext, LanguageContext, ThemeContext)
- **UI Components**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom theme configuration
- **Animation**: Framer Motion for smooth animations and transitions
- **PWA**: Service Worker for offline functionality and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API**: RESTful API with TypeScript
- **Authentication**: Simple session-based authentication
- **Email Service**: SendGrid for email notifications

### Mobile Architecture
- **Capacitor**: Cross-platform native runtime for mobile deployment
- **Target Platform**: Android (configured for Google Play Store)
- **AdMob Integration**: Native AdMob SDK for banner, interstitial, and rewarded ads
- **App ID**: com.ilmbuds.app

## Key Components

### User Management
- Role-based system (Child/Parent accounts)
- Parent-child relationship linking
- Point system for gamification
- Badge system for achievements
- Profile management with avatar support

### Quiz System
- Category-based quiz organization
- Multiple difficulty levels with star ratings
- Progress tracking and statistics
- Multilingual question content
- Audio feedback for correct/incorrect answers

### Content Sections
- **Quiz**: Interactive educational quizzes
- **Stories**: Islamic stories for children
- **Quran**: Quran learning with verse memorization tracking
- **Ilmihal (Catechism)**: Religious teachings and practices
- **Cartoons**: Educational Islamic cartoons with YouTube integration

### Internationalization
- Five language support: English, Albanian, Bosnian, German, Italian
- Centralized translation system
- Dynamic content switching
- RTL support preparation for Arabic content

### Monetization
- AdMob integration with multiple ad formats
- Banner ads on main screens
- Interstitial ads between sections
- Rewarded ads for bonus points
- Child-safe ad configuration

## Data Flow

### User Authentication Flow
1. User registration/login through Express API
2. Session stored in localStorage
3. User data fetched via React Query
4. Context providers distribute user state

### Quiz Flow
1. Category selection from database
2. Quiz questions loaded dynamically
3. Progress tracked in real-time
4. Results saved to user progress table
5. Points and badges awarded

### Content Delivery
1. Static assets served from public directory
2. Dynamic content from PostgreSQL database
3. Translations loaded from shared module
4. Audio files cached for offline use

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries
- **Connection**: Environment variable `DATABASE_URL`

### Third-Party Services
- **SendGrid**: Email delivery service
- **AdMob**: Mobile advertising platform
- **YouTube**: Video content embedding
- **Google Fonts**: Typography (Poppins, Montserrat, Scheherazade)

### Development Tools
- **Vite Plugins**: Theme configuration, runtime error overlay
- **ESBuild**: Production build optimization
- **Capacitor CLI**: Mobile app compilation

## Deployment Strategy

### Web Deployment
- **Build Process**: Vite builds React app to `dist/public`
- **Server Build**: ESBuild compiles Express server to `dist/index.js`
- **Environment**: Production mode with `NODE_ENV=production`
- **Static Assets**: Served from Express static middleware

### Mobile Deployment
- **Platform**: Android via Capacitor
- **Build Command**: `capacitor build android`
- **Configuration**: `capacitor.config.ts` with AdMob settings
- **Distribution**: Google Play Store ready

### Database Management
- **Migrations**: Drizzle Kit for schema changes
- **Command**: `npm run db:push` for schema updates
- **Environment**: Production database via `DATABASE_URL`

### Development Workflow
- **Dev Server**: `npm run dev` - TSX with hot reload
- **Type Checking**: `npm run check` - TypeScript validation
- **Build**: `npm run build` - Production build
- **Start**: `npm run start` - Production server

The application follows a monorepo structure with shared schema and translations, making it easy to maintain consistency across client and server components while supporting multiple languages and platforms.

## Recent Changes

### July 24, 2025 - BREAKTHROUGH: Debug Build Success!
- **MAJOR BREAKTHROUGH**: DEBUG BUILD SUCCESSFUL after 3+ months of troubleshooting
- **MainActivity Fixed**: Removed problematic AdMob imports causing compilation errors 
- **Java 21 Operational**: Gradle properly using Java 21 instead of system Java 11
- **Build Process Validated**: 111 tasks executed successfully in 39 seconds
- **Only Issue Remaining**: Release keystore signing error - debug proves core build works
- **Critical Discovery**: App compiles perfectly, only signing authentication needs resolution

### July 24, 2025 - New Keystore Creation Plan
- **KEYSTORE ISSUE IDENTIFIED**: NIOTRON keystore incompatible with modern Gradle build system
- **SOLUTION APPROACH**: Create new compatible keystore and request Google Play Console upload key change
- **NEW KEYSTORE DETAILS**:
  - Owner: Agron Osmani
  - Organization: ILMBUDS
  - City: Stuttgart, Germany
  - Store Password: agron1974
  - Key Password: Agron1974
  - Alias: androidkey
  - Type: JKS (Java KeyStore)
  - Filename: ilmbuds-new.keystore
  - Location: android/app/ilmbuds-new.keystore
- **DEPLOYMENT STRATEGY**: Request upload key change, await approval, then upload AAB for review
- **KEYSTORE CREATION INSTRUCTIONS**: Created KEYSTORE-KREIRANJE-INSTRUKCIJE.md with complete setup guide

### July 23, 2025 - Production Success & Version 7.3 Update
- **PRODUCTION SUCCESS**: Version 7.1 with test AdMob ads successfully passed Google Play review and published without errors
- **Build Process Validated**: Confirms Capacitor + AdMob + PowerShell build strategy works perfectly for Play Store
- **Version 7.3 Complete**: All files updated to version 7.3 - versionCode 73, manifest.json, service workers, documentation
- **Architecture Proven**: Native AdMob integration, ES modules build fixes, and PWA components all production-ready

### July 29, 2025 - VERSION 7.4.1 FINAL ANDROID FIXES
- **CRITICAL BUGS FIXED**: Post-launch issues resolved after user reported problems
- **Banner Navigation Fix**: Fixed AdMob banner covering bottom navigation
  - Changed navigation from relative to fixed positioning (bottom-14)
  - Added 56px margin to AdMob banner to avoid overlap
  - Added body padding-bottom: 112px for content spacing
- **Arabic Alphabet Audio**: Fixed TypeScript errors and added volume boost
  - Corrected audioRef assignment issues
  - Added Web Audio API gain node for 50% volume increase (1.5x)
  - Improved audio file mapping with proper Record<string, string> typing
- **Interstitial Ads Implementation**: Added proper ad triggers
  - Navigation-based interstitials every 3rd click in BannerWithNav
  - Fixed InterstitialAd component props interface (isOpen/onClose)
  - Added interstitial ads for Cartoons and Arabic Alphabet cards
- **Home Cards Navigation**: Fixed non-responsive card clicks
  - Updated InterstitialAd component usage in home-kids.tsx
  - Fixed duplicate component rendering issues
- **Version 7.4 Release**: Updated all version references from 7.3 to 7.4
  - manifest.json version: 7.4.0
  - Android versionCode: 74, versionName: "7.4"
  - Service workers cache: ilmbuds-v7.4.0 and ilmbuds-v7.4
  - Android 15 Ready: Confirmed SDK 35 (targetSdkVersion & compileSdkVersion = 35)
- **Android Logo Implementation**: Replaced generic Android icons with custom ILMBUDS logo
  - Generated all Android icon sizes (48x48 to 192x192) from ilmbuds_logo.png
  - Updated ic_launcher.png, ic_launcher_round.png, ic_launcher_foreground.png in all mipmap folders
  - Custom logo with boy in green kufi now displays when app is installed
- **Android App Critical Fixes (Version 7.4.1)**:
  - Removed debug "📱 AdMob Banner" text from NativeAdMobBanner component
  - Fixed Arabic Alphabet audio playback (removed Web Audio API for Android WebView compatibility)
  - Simplified audio volume handling for better mobile performance
  - Fixed interstitial ad component integration in Arabic Alphabet page
- **FINAL TRANSFER LIST FOR VERSION 7.4.1 (29 FAJLOVA)**:

**Version Files (4):**
  1. manifest.json - PWA version 7.4.0
  2. android/app/build.gradle - Android versionCode 74
  3. public/service-worker.js - Cache v7.4.0  
  4. public/sw.js - Cache v7.4

**Critical Bug Fixes (8):**
  5. client/src/components/BannerWithNav.tsx - Navigation + interstitial triggers
  6. client/src/services/capacitor-admob.ts - Banner margin adjustment
  7. client/src/components/ads/InterstitialAd.tsx - Props interface update
  8. client/src/pages/arabic-alphabet.tsx - Audio fixes + interstitial integration
  9. client/src/components/ads/NativeAdMobBanner.tsx - Removed debug text
  10. client/src/index.css - Body padding for fixed layout
  11. client/src/App.tsx - Content padding adjustment
  12. client/src/pages/home-kids.tsx - Card navigation fixes

**Android Logo Icons (15):**
  13-27. android/app/src/main/res/mipmap-*/ic_launcher*.png - Custom ILMBUDS logo

**UKUPNO: 29 FAJLOVA SPREMNO ZA PRODUCTION BUILD 7.4.1**

### July 31, 2025 - Codemagic CI/CD Integration Started
- **CLOUD BUILD STRATEGY**: Shifted from local Android Studio builds to cloud-based solutions due to recurring build failures
- **CODEMAGIC SETUP**: Created codemagic.yaml configuration for automated Android AAB/APK builds
- **KEYSTORE INTEGRATION**: Working on keystore reference configuration in Codemagic dashboard
- **MULTIPLE BUILD APPROACHES**: Implemented 3 different keystore authentication methods for testing
- **GIT INTEGRATION**: Prepared GitHub repository integration with Codemagic triggers on main branch push
- **NEXT STEPS**: Resolve keystore authentication and complete automated build pipeline

### July 24, 2025 - COMPLETE SUCCESS: AAB Build & Google Play Upload Key Reset
- **FINAL BREAKTHROUGH**: Full end-to-end AAB build successfully completed with new keystore
- **Java 21 Upgrade**: Resolved Android Gradle Plugin compatibility by upgrading from Java 11 to Java 21.0.8.9-hotspot
- **Capacitor Sync Fixed**: Corrected webDir from 'dist' to 'dist/public' to match Vite build output structure
- **AAB Build Success**: 95 tasks executed in 1m 9s, generating signed app-release.aab file
- **New Keystore Created**: ilmbuds-new.keystore with proper certificate chain for Google Play Console
  - Owner: CN=ILMBUDS, OU=ILMBUDS, O=ILMBUDS, L=Stuttgart, ST=DE, C=DE
  - Store Password: agron1974, Key Password: Agron1974, Alias: androidkey
  - Validity: 24/07/25 to 09/12/52 (27 years)
- **PEM Certificate Generated**: upload_certificate.pem created for Google Play Console upload key reset
- **Upload Key Reset Submitted**: Successfully submitted to Google Play Console with matching fingerprints:
  - SHA1: BA:90:DB:3A:9C:6C:52:9B:F3:C3:A5:70:08:2C:21:5D:22:23:53:DB
  - MD5: 71:D6:16:7E:04:3F:54:BD:23:B3:03:EB:D4:BE:31:9F
- **Build System Operational**: Complete PowerShell-based build pipeline now functional for Google Play Store deployment
- **Awaiting Google Approval**: Upload key reset request pending (24-48 hours), AAB ready for immediate deployment
- **Future Development Strategy**: Established selective file update approach for version 7.4 and beyond - only modified files will be transferred from Replit to local build environment

### July 18, 2025 - Build Strategy Decision
- **PWABuilder vs Capacitor Analysis**: Discovered PWABuilder TWA cannot support native AdMob plugins
- **Build Decision**: User choosing local Capacitor build to maintain native AdMob monetization
- **Project Download**: User downloading complete project for local Android SDK build
- **Keystore Ready**: ilmbuds-key.keystore with alias "upload", password "HalAni1974@" prepared for signing