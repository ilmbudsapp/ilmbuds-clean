# ANDROID STUDIO ALTERNATIVA - KORAK PO KORAK

## ZAŠTO ANDROID STUDIO?
- Potpuna kontrola nad AndroidManifest.xml
- Nema automatskih izmena kao Niotron
- Lakše debugging i build process
- Direktan pristup Gradle konfiguraciji

## INSTALACIJA I SETUP:

### Korak 1: Preuzmi i instaliraj
1. Preuzmi Android Studio sa https://developer.android.com/studio
2. Instaliraj sa default settings
3. Instaliraj Android SDK (API 33+ za Android 13)

### Korak 2: Pripremi projekat
```powershell
# Preuzmi finalni backup
# Raspakovaj ILMBUDS-FINALNI-v7.3.tar.gz u C:\

cd C:\ILMBUDS-FINALNI-v7.3

# Instaliraj dependencies
npm install

# Build web verziju
npm run build

# Sync sa Android
npx cap sync android
```

### Korak 3: Otvori u Android Studio
```powershell
# Otvori Android Studio
npx cap open android

# Ili manuelno:
# File > Open > C:\ILMBUDS-FINALNI-v7.3\android
```

### Korak 4: Proveri AndroidManifest.xml
Otvori `app/src/main/AndroidManifest.xml` i proveri da li sadrži:
```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
<uses-permission android:name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION" />
```

### Korak 5: Build AAB
1. U Android Studio: **Build > Generate Signed Bundle/APK**
2. Odaberi **Android App Bundle**
3. Koristi `ilmbuds-key.keystore` sa alias "upload" i password "HalAni1974@"
4. Odaberi **release** build variant

### Korak 6: Verifikuj AAB
```powershell
# Ekstraktuj AAB fajl
unzip -o app-release.aab -d extracted/

# Proveri manifest
cat extracted/base/AndroidManifest.xml | grep AD_ID
```

## PREDNOSTI:
- ✅ Potpuna kontrola nad build procesom
- ✅ Nema automatskih izmena manifest-a
- ✅ Lakše debugging
- ✅ Direktan pristup svim Android features
- ✅ Sigurnost da se dozvole neće izgubiti