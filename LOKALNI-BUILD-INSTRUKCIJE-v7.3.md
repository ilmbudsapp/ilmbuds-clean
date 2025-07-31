# LOKALNI BUILD INSTRUKCIJE v7.3 - REŠENJE BELE STRANICE

## PROBLEM: Bela stranica u Android aplikaciji

**Uzrok:** Aplikacija pokušava da pristupi Replit linku umesto lokalnim fajlovima.

## REŠENJE:

### Korak 1: Kreiranje lokalnog build-a
```powershell
# U PowerShell-u, pozicioniraj se u C:\ILMBUDS-KOMPLETNI-PROJEKAT
cd C:\ILMBUDS-KOMPLETNI-PROJEKAT

# Instaliraj dependencies
npm install

# Kreiraj production build
npm run build
```

### Korak 2: Pripremanje za Android
```powershell
# Kopiraj build u Android assets
npx cap copy android

# Sinhronizuj sa Android projektom
npx cap sync android
```

### Korak 3: Kreiranje APK-a
```powershell
# Otvori Android Studio
npx cap open android

# Ili direktno gradlew
cd android
./gradlew assembleDebug
```

### Korak 4: Lokalizacija problema
Proverite da li su sledeći fajlovi u android/app/src/main/assets/public/:
- index.html
- JavaScript fajlovi
- CSS fajlovi
- Slike i audio fajlovi

### Korak 5: Konfiguracija za offline rad
Dodaj u capacitor.config.ts:
```typescript
server: {
  url: undefined, // Koristi lokalne fajlove
  cleartext: true
}
```

## DEBUGGING:
1. Proveri Android logcat: `adb logcat | grep -i capacitor`
2. Proveri da li su assets kopirani u android/app/src/main/assets/
3. Proveri da li je build uspešan u dist/ folderu

## NAPOMENE:
- Nikad ne koristi Replit URL za production APK
- Uvek koristi lokalne fajlove za Android build
- Proverava da li je npm run build završen bez grešaka

## GOOGLE PLAY STORE DOZVOLE:
Dodaj ove dozvole u AndroidManifest.xml:
```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
<uses-permission android:name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION" />
```

Ovo je potrebno za AdMob reklame i Google Play Store compliance.