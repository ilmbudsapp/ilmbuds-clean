# NIOTRON BUILD REŠENJE - AD_ID DOZVOLA

## PROBLEM:
Niotron regeneriše AndroidManifest.xml tokom build procesa i briše custom dozvole.

## REŠENJE ZA NIOTRON:

### Opcija 1: Dodaj dozvole u Niotron Designer
1. Otvori projekat u Niotron-u
2. Idi na **"Screen1" > Properties**
3. Skroluj do **"Permissions"** sekcije
4. Dodaj custom permissions:
   - `com.google.android.gms.permission.AD_ID`
   - `android.permission.ACCESS_ADSERVICES_ATTRIBUTION`

### Opcija 2: Koristi AndroidManifest Extension
1. U Niotron Designer, dodaj **"Android Manifest"** extension
2. Dodaj ove linije u custom manifest:
```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
<uses-permission android:name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION" />
```

### Opcija 3: Koristi Assets/AndroidManifest.xml
1. Kreiraj fajl `assets/AndroidManifest.xml`
2. Dodaj potrebne dozvole
3. Niotron će merge-ovati sa osnovnim manifest-om

### Opcija 4: Prebaci na Android Studio
Preporučujem:
```powershell
# Preuzmi ILMBUDS-FINALNI-v7.3.tar.gz
# Raspakovaj
tar -xzf ILMBUDS-FINALNI-v7.3.tar.gz

# Instaliraj dependencies
cd ILMBUDS-FINALNI-v7.3
npm install

# Build
npm run build
npx cap sync android

# Otvori u Android Studio
npx cap open android
```

### Opcija 5: Verifikuj Niotron build
Posle build-a u Niotron-u:
1. Ekstraktuj AAB fajl
2. Proveri AndroidManifest.xml
3. Traži AD_ID dozvole

## PREPORUČENO REŠENJE:
**Koristi Android Studio** umesto Niotron-a za finalni build jer:
- Potpuna kontrola nad manifest fajlom
- Nema automatskih izmena
- Lakše debugging
- Direktan pristup Gradle build sistemu