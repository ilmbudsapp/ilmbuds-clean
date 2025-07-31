import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, Volume2, Bell, Moon, Sparkles, Type, User, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/context/language-context";
import { useUserContext } from "@/context/user-context";
import { useTheme } from "@/context/theme-context";
import { Language } from "@shared/translations";

export default function Settings() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Initial settings state
  const [settings, setSettings] = useState({
    language: currentLanguage,
    volume: 80,
    notifications: true,
    darkMode: isDarkMode,
    animations: true,
    fontSize: 'medium',
  });
  
  // Sync theme state with settings
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: isDarkMode
    }));
  }, [isDarkMode]);

  // Handle settings changes
  const handleLanguageChange = (value: Language) => {
    setSettings({ ...settings, language: value });
    changeLanguage(value);
  };

  const handleVolumeChange = (value: number[]) => {
    setSettings({ ...settings, volume: value[0] });
  };

  const handleToggleChange = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const handleFontSizeChange = (value: string) => {
    setSettings({ ...settings, fontSize: value });
  };

  const saveSettings = () => {
    // In a real app, you'd save the settings to the server/database
    toast({
      title: t('settings', 'settingsSaved'),
      description: t('settings', 'settingsSavedDescription'),
      variant: "default",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{t('settings', 'pageTitle')}</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings', 'title')}</CardTitle>
          <CardDescription>{t('settings', 'description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{t('settings', 'language')}</h3>
              </div>
            </div>
            <Select value={settings.language} onValueChange={(value) => handleLanguageChange(value as Language)}>
              <SelectTrigger className="w-full md:w-80">
                <SelectValue placeholder={t('settings', 'selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('common', 'english')}</SelectItem>
                <SelectItem value="sq">{t('common', 'albanian')}</SelectItem>
                <SelectItem value="bs">{t('common', 'bosnian')}</SelectItem>
                <SelectItem value="de">{t('common', 'german')}</SelectItem>
                <SelectItem value="it">{t('common', 'italian')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Sound settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Volume2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{t('settings', 'sound')}</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="volume">{t('settings', 'volume')}</Label>
                <Badge variant="outline">{settings.volume}%</Badge>
              </div>
              <Slider 
                id="volume"
                defaultValue={[settings.volume]} 
                max={100} 
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t('settings', 'notifications')}</h3>
                  <p className="text-sm text-muted-foreground">{t('settings', 'notificationsDescription')}</p>
                </div>
              </div>
              <Switch 
                id="notifications" 
                checked={settings.notifications}
                onCheckedChange={() => handleToggleChange('notifications')}
              />
            </div>
          </div>

          <Separator />

          {/* Display settings */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Moon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">{t('settings', 'display')}</h3>
            </div>

            <div className="space-y-4 ml-10">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">{t('settings', 'darkMode')}</Label>
                <Switch 
                  id="darkMode" 
                  checked={settings.darkMode}
                  onCheckedChange={() => {
                    toggleDarkMode();
                    handleToggleChange('darkMode');
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>{t('settings', 'animations')}</span>
                  </div>
                </Label>
                <Switch 
                  id="animations" 
                  checked={settings.animations}
                  onCheckedChange={() => handleToggleChange('animations')}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <Label>{t('settings', 'fontSize')}</Label>
                  </div>
                </div>
                <Select value={settings.fontSize} onValueChange={handleFontSizeChange}>
                  <SelectTrigger className="w-full md:w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account */}
          {user && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('settings', 'account')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('settings', 'loggedInAs')}: <span className="font-medium">{user.username}</span>
                    </p>
                  </div>
                </div>
                <Link href="/">
                  <Button variant="outline">{t('settings', 'logout')}</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            {t('settings', 'saveSettings')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Globe icon component
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}