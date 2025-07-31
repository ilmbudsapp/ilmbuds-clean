# REŠENJE: AD_ID DOZVOLA NIJE UKLJUČENA U AAB FAJL

## PROBLEM:
Google Play Console prijavljuje da nedostaje AD_ID dozvola, iako je dodana u AndroidManifest.xml

## UZROK:
Build sistem ne koristi ispravljeni AndroidManifest.xml ili se regeneriše tokom build procesa.

## REŠENJE:

### Korak 1: Proveri AndroidManifest.xml
U `android/app/src/main/AndroidManifest.xml` MORA da bude:
```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
<uses-permission android:name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION" />
```

### Korak 2: Forsiraj kopiranje manifest-a
```powershell
# Posle npm run build, forsiraj Capacitor sync
npx cap sync android

# Ili manuelno kopiraj
npx cap copy android
```

### Korak 3: Proveri da li je manifest kopiran
Proveri fajl: `android/app/src/main/AndroidManifest.xml`
Da li sadrži AD_ID dozvole?

### Korak 4: Clean build
```powershell
cd android
./gradlew clean
./gradlew bundleRelease
```

### Korak 5: Verifikuj AAB fajl
```powershell
# Ekstraktuj AAB i proveri manifest
unzip -o app-release.aab -d extracted/
cat extracted/base/AndroidManifest.xml | grep AD_ID
```

### Korak 6: Ako se i dalje ne pojavljuje
Dodaj dozvole DIREKTNO u `android/app/src/main/AndroidManifest.xml`:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />
    <uses-permission android:name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION" />
    <!-- ostale dozvole -->
</manifest>
```

## NAPOMENE:
- Replit NE builduje AAB fajlove - to se radi lokalno
- Capacitor može da regeneriše manifest tokom sync-a
- Uvek proverava finalni AAB fajl pre upload-a