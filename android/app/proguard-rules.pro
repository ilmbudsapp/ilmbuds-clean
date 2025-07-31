# Keep your application classes that will be accessed by reflection
-keep class com.ilmbuds.app.** { *; }

# Capacitor related classes
-keep class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.Plugin

# Cordova plugins
-keep class org.apache.cordova.** { *; }
-keep class com.silkimen.http.** { *; }

# AdMob
-keep class com.google.android.gms.ads.** { *; }

# JavaScript interface
-keepattributes JavascriptInterface

# JSR 305 annotations are for embedding nullability information.
-dontwarn javax.annotation.**

# Keep generic signature of ViewHolder.
-keepclassmembers,allowobfuscation class * extends androidx.recyclerview.widget.RecyclerView$ViewHolder {
  <init>(...);
}

# Gson specific classes
-keep class sun.misc.Unsafe { *; }
-keep class com.google.gson.** { *; }

# R8 compatibility
-keepclassmembers class * {
    native <methods>;
}

# Keep setters in Views so that animations can work
-keepclassmembers public class * extends android.view.View {
   void set*(***);
   *** get*();
}

# We want to keep methods in Activity that could be used in the XML attribute onClick
-keepclassmembers class * extends android.app.Activity {
   public void *(android.view.View);
}
