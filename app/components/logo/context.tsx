// LogoContext.tsx
import React, { createContext, useContext, useState } from 'react';

const defaultLogoSettings = {
  icon: { library: 'FontAwesome', icon: 'faHome' },
  iconSize: 100,
  iconColor: '#F6FAFF',
  text: 'Logo',
  fontFamily: 'Arial',
  fontSize: 48,
  letterSpacing: 5,
  isBold: false,
  color: '#FFFFFF',
  accentText: 'Create your future',
  accentFontFamily: 'Arial',
  accentFontSize: 26,
  accentLetterSpacing: 0,
  isAccentBold: false,
  accentColor: '#FFFFFF',
  layoutHorizontal: true,
  layoutDirection: 'ltr' as 'ltr' | 'rtl',
  offsetXmain: 0,
  offsetYmain: 0,
  blurMain: 3,
  offsetColormain: '#242424',
  offsetXlogo: 5,
  offsetYlogo: 5,
  blurlogo: 5,
  offsetColorlogo: '#242424',
  offsetXaccent: 0,
  offsetYaccent: 0,
  offsetColoraccent: '#242424',
  blurAccent: 3,
  backgroundColorLogo: '#00054d',
  horizontalPadding: 15,
  verticalPadding: 0,
  isTextLayoutHorizontal: false,
  textAboveIcon: true,
  borderRadius: '10',
  borderRadiusType: 'px' as 'px' | '%',
  underlineaccent: false,
  underlinemain: false,
  is3DEffect: false,
  icon3DDepth: 6,
  accentbgcolor: 'rgba(0, 0, 0, 0)',
  accentbgpaddingx: 0,
  accentbgpaddingy: 0,
  accentbgborderradius: 0,
  mainbgcolor: 'rgba(0, 0, 0, 0)',
  mainbgpaddingx: 0,
  mainbgpaddingy: 0,
  mainbgborderradius: 0,
  logobgcolor: 'rgba(0, 0, 0, 0)',
  logobgpaddingx: 0,
  logobgpaddingy: 0,
  logobgborderradius: 0,
  textgap: 0,
  icontextgap: 20,
};

const LogoContext = createContext<{
  logoSettings: typeof defaultLogoSettings;
  setLogoSettings: React.Dispatch<React.SetStateAction<typeof defaultLogoSettings>>;
}>({
  logoSettings: defaultLogoSettings,
  setLogoSettings: () => {},
});

export const LogoProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoSettings, setLogoSettings] = useState(defaultLogoSettings);
  return (
    <LogoContext.Provider value={{ logoSettings, setLogoSettings }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
