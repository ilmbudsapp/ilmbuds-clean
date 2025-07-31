# 🔑 KREIRANJE NOVOG KEYSTORE-A - FINALNE INSTRUKCIJE

## 📋 VAŠI KEYSTORE PODACI:
- **Vlasnik**: Agron Osmani
- **Organizacija**: ILMBUDS
- **Grad**: Stuttgart
- **Država**: DE (Nemačka)
- **Store Password**: agron1974
- **Key Password**: Agron1974
- **Alias**: androidkey

## 🚀 KORAK PO KORAK KREIRANJE:

### 1. Pozicioniraj se u android/app folder:
```powershell
cd C:\ILMBUDS\android\app
```

### 2. Kreiraj novi keystore (JKS format):
```powershell
keytool -genkeypair -keystore ilmbuds-new.keystore -alias androidkey -keyalg RSA -keysize 2048 -validity 10000 -storepass agron1974 -keypass Agron1974 -dname "CN=ILMBUDS, OU=ILMBUDS, O=ILMBUDS, L=Stuttgart, ST=DE, C=DE" -storetype JKS
```

### 3. Proveri da li je keystore kreiran:
```powershell
dir ilmbuds-new.keystore
```
(Trebalo bi da bude ~2235 bytes)

### 4. Ažuriraj build.gradle konfiguraciju:
U fajlu `android/app/build.gradle` dodaj/ažuriraj signingConfigs sekciju:

```gradle
signingConfigs {
    release {
        storeFile file('ilmbuds-new.keystore')
        storePassword 'agron1974'
        keyAlias 'androidkey'
        keyPassword 'Agron1974'
    }
}
```

### 5. Testiraj build:
```powershell
cd C:\ILMBUDS\android
.\gradlew clean
.\gradlew bundleRelease --stacktrace
```

## ✅ OČEKIVANI REZULTAT:
- AAB fajl u `app/build/outputs/bundle/release/app-release.aab`
- Potpisan sa novim keystore-om
- Spreman za Google Play Console upload request

## 📋 ZA GOOGLE PLAY CONSOLE:
Kada zatražite promenu upload key-a, koristićete SHA1 fingerprint novog keystore-a:

```powershell
keytool -list -v -keystore ilmbuds-new.keystore -alias androidkey -storepass agron1974
```

## 💾 BACKUP KEYSTORE-A:
OBAVEZNO sačuvajte `ilmbuds-new.keystore` na sigurnom mestu - bez njega nećete moći da ažurirate aplikaciju!