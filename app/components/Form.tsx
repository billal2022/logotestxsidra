'use client';
import React, { useState } from 'react';
import GlobalSettings from './GlobalSettings';
import IconSettings from './IconSettings';
import MainSettings from './MainSettings';
import LogoPreview from './logo/LogoPreview';
import AccentSettings from './AccentSettings';
import { faIcons } from './custom components/faIcons';
import { mdiIcons } from './custom components/mdiIcons';
import WebFont from 'webfontloader';
import LogoList from './logolist';
import { IoGlobeOutline, IoImagesOutline, IoAlbumsOutline, IoColorPaletteOutline, IoSettingsOutline } from 'react-icons/io5';
import { TbCircleLetterB ,TbCircleLetterA} from "react-icons/tb";
import { FaIcons } from "react-icons/fa";
import ColorPatternSettings from './custom components/colorpatterns';
import { ModularBusinessCardStudio } from './businesscard/bussiness';
import LogoDisplay from './logo/logodisplay'



const colorPatterns = [
  {
    name: "Aerospace",
    colors: [
      { r: 0.00, g: 0.12, b: 0.24 }, // Oxford Blue
      { r: 0.87, g: 0.87, b: 0.87 }, // Gainsboro
      { r: 0.53, g: 0.81, b: 0.98 }, // Light Sky Blue
      { r: 0.70, g: 0.13, b: 0.13 }  // Firebrick
    ]
  },
  {
    name: "Professional",
    colors: [
      { r: 0.00, g: 0.16, b: 0.36 }, // Navy
      { r: 0.71, g: 0.80, b: 0.86 }, // Light Slate Gray
      { r: 0.87, g: 0.90, b: 0.94 }, // Gainsboro
      { r: 0.20, g: 0.28, b: 0.37 }  // Dark Slate
    ]
  },
  {
    name: "Minimalist",
    colors: [
      { r: 0.93, g: 0.94, b: 0.95 }, // White Smoke
      { r: 0.66, g: 0.66, b: 0.66 }, // Silver
      { r: 0.18, g: 0.18, b: 0.18 }, // Jet
      { r: 0.11, g: 0.11, b: 0.11 }  // Onyx
    ]
  },
  {
    name: "Vibrant",
    colors: [
      { r: 0.80, g: 0.00, b: 0.00 }, // Red
      { r: 0.98, g: 0.80, b: 0.18 }, // Mustard
      { r: 0.04, g: 0.52, b: 0.89 }, // Blue (RYB)
      { r: 0.00, g: 0.60, b: 0.00 }  // Green
    ]
  },
  {
    name: "Pastel",
    colors: [
      { r: 0.99, g: 0.89, b: 0.77 }, // Peach Puff
      { r: 0.73, g: 0.56, b: 0.56 }, // Rosy Brown
      { r: 0.80, g: 0.88, b: 0.97 }, // Light Steel Blue
      { r: 0.86, g: 0.82, b: 0.90 }  // Thistle
    ]
  },
  {
    name: "Earthy Tones",
    colors: [
      { r: 0.35, g: 0.16, b: 0.14 }, // Dark brown
      { r: 0.91, g: 0.90, b: 0.88 }, // Very light gray
      { r: 0.75, g: 0.75, b: 0.72 },
      { r: 0.20, g: 0.09, b: 0.06 } 
    ]
  },
  {
    name: "Monochrome",
    colors: [
      { r: 0.2, g: 0.2, b: 0.2 },  // Dark gray
      { r: 0.95, g: 0.95, b: 0.95 },// Very light gray
      { r: 0.5, g: 0.5, b: 0.5 },  // Medium gray
      { r: 0.1, g: 0.1, b: 0.1 }   // Almost black
    ]
  },
  {
    name: "Cool Blues",
    colors: [
      { r: 0.0, g: 0.2, b: 0.4 },   // Navy blue
      { r: 0.9, g: 0.9, b: 1.0 },   // Pale blue
      { r: 0.0, g: 0.5, b: 0.7 },   // Cerulean
      { r: 0.04, g: 0.1, b: 0.2 }   // Dark blue
    ]
  },
  {
    name: "Natural Greens",
    colors: [
      { r: 0.0, g: 0.3, b: 0.1 },   // Dark green
      { r: 0.9, g: 1.0, b: 0.9 },   // Very light green
      { r: 0.2, g: 0.5, b: 0.2 },   // Forest green
      { r: 0.05, g: 0.15, b: 0.05 } // Deep green
    ]
  },
  {
    name: "Warm Reds and Oranges",
    colors: [
      { r: 0.8, g: 0.1, b: 0.1 },   // Crimson
      { r: 1.0, g: 0.92, b: 0.8 },  // Off white
      { r: 0.9, g: 0.4, b: 0.1 },   // Bright orange
      { r: 0.4, g: 0.05, b: 0.0 }   // Maroon
    ]
  },
  {
    name: "Subdued Purples",
    colors: [
      { r: 0.3, g: 0.0, b: 0.3 },   // Deep purple
      { r: 0.95, g: 0.85, b: 0.95 },// Lavender blush
      { r: 0.5, g: 0.2, b: 0.5 },   // Medium purple
      { r: 0.1, g: 0.0, b: 0.1 }    // Very dark purple
    ]
  },
  {
    name: "Tech Startup",
    colors: [
      { r: 0.00, g: 0.47, b: 0.75 }, // Strong Blue
      { r: 0.98, g: 0.98, b: 0.98 }, // Almost White
      { r: 0.13, g: 0.13, b: 0.13 }, // Almost Black
      { r: 0.00, g: 0.80, b: 0.40 }  // Jade
    ]
  },
  {
    name: "Luxury Real Estate",
    colors: [
      { r: 0.33, g: 0.42, b: 0.18 }, // Dark Olive Green
      { r: 0.85, g: 0.85, b: 0.78 }, // Platinum
      { r: 0.15, g: 0.15, b: 0.15 }, // Eerie Black
      { r: 0.72, g: 0.53, b: 0.04 }  // Dark Goldenrod
    ]
  },
  {
    name: "Artisanal Crafts",
    colors: [
      { r: 0.60, g: 0.40, b: 0.20 }, // Brown Sugar
      { r: 0.95, g: 0.92, b: 0.86 }, // Pearl
      { r: 0.33, g: 0.25, b: 0.21 }, // Dark Liver
      { r: 0.78, g: 0.70, b: 0.60 }  // Khaki
    ]
  },
  {
    name: "Innovative Engineering",
    colors: [
      { r: 0.11, g: 0.38, b: 0.55 }, // Indigo Dye
      { r: 0.95, g: 0.95, b: 0.95 }, // White Smoke
      { r: 0.58, g: 0.65, b: 0.65 }, // Cadet Blue
      { r: 0.93, g: 0.36, b: 0.00 }  // Persimmon
    ]
  },
  {
    name: "Sustainable Energy",
    colors: [
      { r: 0.00, g: 0.50, b: 0.50 }, // Teal
      { r: 0.94, g: 0.97, b: 0.87 }, // Mint Cream
      { r: 0.13, g: 0.55, b: 0.13 }, // Forest Green
      { r: 1.00, g: 0.84, b: 0.00 }  // Gold
    ]
  },
  {
    name: "Gourmet Food",
    colors: [
      { r: 0.55, g: 0.00, b: 0.00 }, // Dark Red
      { r: 0.98, g: 0.94, b: 0.90 }, // Linen
      { r: 0.20, g: 0.20, b: 0.20 }, // Rich Black
      { r: 0.75, g: 0.65, b: 0.48 }  // Dark Tan
    ]
  },
  {
    name: "Modern Architecture",
    colors: [
      { r: 0.34, g: 0.34, b: 0.34 }, // Jet
      { r: 0.97, g: 0.97, b: 0.97 }, // Cultured
      { r: 0.66, g: 0.66, b: 0.66 }, // Gray
      { r: 0.00, g: 0.59, b: 0.53 }  // Persian Green
    ]
  },
  {
    name: "Boutique Hotel",
    colors: [
      { r: 0.29, g: 0.00, b: 0.51 }, // Indigo
      { r: 0.93, g: 0.91, b: 0.88 }, // Alabaster
      { r: 0.58, g: 0.44, b: 0.86 }, // Medium Purple
      { r: 0.85, g: 0.65, b: 0.23 }  // Goldenrod
    ]
  },
  {
    name: "Fitness & Wellness",
    colors: [
      { r: 0.00, g: 0.73, b: 0.58 }, // Mint
      { r: 1.00, g: 1.00, b: 1.00 }, // White
      { r: 0.20, g: 0.20, b: 0.20 }, // Rich Black
      { r: 0.93, g: 0.51, b: 0.93 }  // Violet
    ]
  },

  {
    name: "Organic Products",
    colors: [
      { r: 0.34, g: 0.42, b: 0.15 }, // Dark Olive Green
      { r: 0.96, g: 0.96, b: 0.86 }, // Beige
      { r: 0.68, g: 0.85, b: 0.68 }, // Dark Sea Green
      { r: 0.80, g: 0.52, b: 0.25 }  // Peru
    ]
  },
  {
    name: "Digital Marketing",
    colors: [
      { r: 0.20, g: 0.60, b: 0.86 }, // Bright Cerulean
      { r: 0.98, g: 0.98, b: 0.98 }, // Cultured
      { r: 0.13, g: 0.13, b: 0.13 }, // Eerie Black
      { r: 1.00, g: 0.41, b: 0.71 }  // Hot Pink
    ]
  }
];

WebFont.load({
  google: {
    families: [
      "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
      "Georgia", "Garamond", "Courier New", "Brush Script MT", "Lobster", "Pacifico",
      "Roboto", "Montserrat", "Open Sans", "Playfair Display", "Merriweather", "Roboto Slab"
    ]
  }
});

const fonts = [
  "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
  "Georgia", "Garamond", "Courier New", "Brush Script MT", "Lobster", "Pacifico",
  "Roboto", "Montserrat", "Open Sans", "Playfair Display", "Merriweather", "Roboto Slab"
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
const getRandomColor = (): string => {
  const pattern = getRandomElement(colorPatterns);
  const color = getRandomElement(pattern.colors);
  return rgbToHex(Math.floor(color.r * 255), Math.floor(color.g * 255), Math.floor(color.b * 255));
};
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
// Function to calculate the luminance of an RGB color
const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Function to calculate contrast ratio between two colors
const contrastRatio = (lum1: number, lum2: number) => {
  const bright = Math.max(lum1, lum2);
  const dark = Math.min(lum1, lum2);
  return (bright + 0.05) / (dark + 0.05);
};

const getRandomColorWithContrast = (bgColorHex: string) => {
  let contrast = 0;
  let newColor = '';
  while (contrast < 3) {  // Minimum contrast ratio; increase for more contrast
    newColor = getRandomColor();
    const bgLum = luminance(parseInt(bgColorHex.slice(1, 3), 16), parseInt(bgColorHex.slice(3, 5), 16), parseInt(bgColorHex.slice(5, 7), 16));
    const colorLum = luminance(parseInt(newColor.slice(1, 3), 16), parseInt(newColor.slice(3, 5), 16), parseInt(newColor.slice(5, 7), 16));
    contrast = contrastRatio(bgLum, colorLum);
  }
  return newColor;
};

const Form: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('logo');

  const [selectedColorPattern, setSelectedColorPattern] = useState(colorPatterns[0]);
  const [textgap, setTextgap] = useState(0);
  const [icontextgap, setIcontextgap] = useState(20);

  const [logobgcolor, setLogobgcolor] = useState('rgba(0, 0, 0, 0)');
  const [logobgpaddingx, setLogobgpaddingx] = useState(0);
  const [logobgpaddingy, setLogobgpaddingy] = useState(0);
  const [logobgborderradius, setLogobgborderradius] = useState(0);

  // For MainSettings
  const [mainbgcolor, setMainbgcolor] = useState('rgba(0, 0, 0, 0)');
  const [mainbgpaddingx, setMainbgpaddingx] = useState(0);
  const [mainbgpaddingy, setMainbgpaddingy] = useState(0);
  const [mainbgborderradius, setMainbgborderradius] = useState(0);

  // For AccentSettings
  const [accentbgcolor, setAccentbgcolor] = useState('rgba(0, 0, 0, 0)');
  const [accentbgpaddingx, setAccentbgpaddingx] = useState(0);
  const [accentbgpaddingy, setAccentbgpaddingy] = useState(0);
  const [accentbgborderradius, setAccentbgborderradius] = useState(0);

  const [borderRadius, setBorderRadius] = useState('10');
  const [icon3DDepth, seticon3DDepth] = useState(6);
  const [is3DEffect, setis3DEffect] = useState(false);
  const [borderRadiusType, setBorderRadiusType] = useState<'px' | '%'>('px');
  const [transparentBackground, setTransparentBackground] = useState(false);

  const [underlinetogglemain, setunderlinetogglemain] = useState(false);
  const [underlinetoggleaccent, setunderlinetoggleaccent] = useState(false);
  const [textLayoutHorizontal, setTextLayoutHorizontal] = useState(false);
  const [textAboveIcon, setTextAboveIcon] = useState(true);

  const [text, setText] = useState('Logo');
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(5);
  const [isBold, setIsBold] = useState(false);
  const [fontFamily, setFontFamily] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [icon, setIcon] = useState(faIcons[16]);
  const [iconSize, setIconSize] = useState(100);
  const [iconColor, setIconColor] = useState('#F6FAFF');
  
  const [accentText, setAccentText] = useState('Create your future');
  const [accentFontSize, setAccentFontSize] = useState(26);
  const [accentLetterSpacing, setAccentLetterSpacing] = useState(0);
  const [isAccentBold, setIsAccentBold] = useState(false);
  const [accentFontFamily, setAccentFontFamily] = useState('');
  const [accentColor, setAccentColor] = useState('#FFFFFF');
  const [layoutHorizontal, setLayoutHorizontal] = useState(true);
  const [layoutDirection, setLayoutDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [offsetXmain, setOffsetXmain] = useState(0);
  const [offsetYmain, setOffsetYmain] = useState(0);
  const [blurMain, setBlurMain] = useState(3);
  const [offsetColormain, setOffsetColormain] = useState("#242424");
  const [offsetXaccent, setOffsetXaccent] = useState(0);
  const [offsetYaccent, setOffsetYaccent] = useState(0);
  const [blurAccent, setBlurAccent] = useState(3);
  const [offsetColoraccent, setOffsetColoraccent] = useState("#242424");

    const [offsetXlogo, setOffsetXlogo] = useState(5);
  const [offsetYlogo, setOffsetYlogo] = useState(5);
  const [blurlogo, setBlurlogo] = useState(5);
  const [offsetColorlogo, setOffsetColorlogo] = useState("#242424");
  const [backgroundColorLogo, setBackgroundColorLogo] = useState("#00054d");
  const [horizontalPadding, setHorizontalPadding] = useState(15);
  const [verticalPadding, setVerticalPadding] = useState(0);

  const [activeTab, setActiveTab] = useState('global');

  const handleTextChange = (newText: string) => setText(newText);
  const handleFontSizeChange = (newSize: number) => setFontSize(newSize);
  const handleLetterSpacingChange = (newSpacing: number) => setLetterSpacing(newSpacing);
  const handleBoldToggle = () => setIsBold(!isBold);
  const handleAccentTextChange = (newText: string) => setAccentText(newText);
  const handleAccentFontSizeChange = (newSize: number) => setAccentFontSize(newSize);
  const handleAccentLetterSpacingChange = (newSpacing: number) => setAccentLetterSpacing(newSpacing);
  const handleAccentBoldToggle = () => setIsAccentBold(!isAccentBold);

  const randomizeLogo = () => {
    const backgroundColor = getRandomColor(); // Get a random background color first
    setBackgroundColorLogo(backgroundColor);
  
    setText(getRandomElement([ 'Logo',]));
    setFontFamily(getRandomElement(fonts));
    setFontSize(getRandomNumber(35, 60));
    setLetterSpacing(getRandomNumber(0, 5));
    setIsBold(Math.random() > 0.5);
    setColor(getRandomColorWithContrast(backgroundColor)); // Ensure text color contrasts with background
    const randomIcon = getRandomElement([...faIcons, ...mdiIcons]);
    setIcon(randomIcon);
    setIconSize(getRandomNumber(50, 100));
    setIconColor(getRandomColorWithContrast(backgroundColor)); // Ensure icon color contrasts with background
    
    setAccentText(getRandomElement(['']));
    setAccentFontFamily(getRandomElement(fonts));
    setAccentFontSize(getRandomNumber(35, 60));
    setAccentLetterSpacing(getRandomNumber(0, 5));
    setIsAccentBold(Math.random() > 0.5);
    setAccentColor(getRandomColorWithContrast(backgroundColor)); // Ensure accent color contrasts with background
  
    setHorizontalPadding(getRandomNumber(10, 20));
    setVerticalPadding(getRandomNumber(2, 6));
    setLayoutHorizontal(Math.random() > 0.5);
    setLayoutDirection(Math.random() > 0.5 ? 'ltr' : 'rtl');


  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTab = (tabName: string) => {
    if (window.innerWidth <= 1024) { // mobile breakpoint
      if (activeTab === tabName) {
        setIsSidebarOpen(!isSidebarOpen);
      } else {
        setActiveTab(tabName);
        setIsSidebarOpen(true);
      }
    } else {
      setActiveTab(tabName);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const tabConfig = [
    { name: 'global', icon: <IoGlobeOutline size={28} /> },
    { name: 'icon', icon: <FaIcons size={28} /> },
    { name: 'main', icon: <TbCircleLetterA size={28} /> },
    { name: 'accent', icon: <TbCircleLetterB size={28} /> },
    { name: 'color patterns', icon: <IoColorPaletteOutline size={28} /> },
    { name: 'saved logos', icon: <IoAlbumsOutline size={28} /> },
  ];
  const businessCardTabConfig = [
    { name: 'settings', icon: <IoSettingsOutline size={28} /> },
    { name: 'color patterns', icon: <IoColorPaletteOutline size={28} /> },
  ];
  const currentTabConfig = activeMainTab === 'logo' ? tabConfig : businessCardTabConfig;

  const handleColorPatternChange = (pattern: typeof colorPatterns[0]) => {
    setSelectedColorPattern(pattern);
    // Apply the selected color pattern to your logo
    setBackgroundColorLogo(rgbToHex(
      Math.floor(pattern.colors[0].r * 255),
      Math.floor(pattern.colors[0].g * 255),
      Math.floor(pattern.colors[0].b * 255)
    ));
    setColor(rgbToHex(
      Math.floor(pattern.colors[1].r * 255),
      Math.floor(pattern.colors[1].g * 255),
      Math.floor(pattern.colors[1].b * 255)
    ));
    setIconColor(rgbToHex(
      Math.floor(pattern.colors[2].r * 255),
      Math.floor(pattern.colors[2].g * 255),
      Math.floor(pattern.colors[2].b * 255)
    ));
    setAccentColor(rgbToHex(
      Math.floor(pattern.colors[3].r * 255),
      Math.floor(pattern.colors[3].g * 255),
      Math.floor(pattern.colors[3].b * 255)
    ));
  };  

  

  const LogoDisplayWrapper: React.FC<any> = (props) => {
    return  <LogoDisplay
    textgap={textgap}
    icontextgap={icontextgap}
    accentbgborderradius={accentbgborderradius}
    accentbgcolor={accentbgcolor}
    accentbgpaddingx={accentbgpaddingx}
    accentbgpaddingy={accentbgpaddingy}
    logobgborderradius={logobgborderradius}
    logobgcolor={logobgcolor}
    logobgpaddingx={logobgpaddingx}
    logobgpaddingy={logobgpaddingy}
    mainbgborderradius={mainbgborderradius}
    mainbgcolor={mainbgcolor}
    mainbgpaddingx={mainbgpaddingx}
    mainbgpaddingy={mainbgpaddingy}
    icon3DDepth={icon3DDepth}
    is3DEffect={is3DEffect}
    underlineaccent={underlinetoggleaccent}
    underlinemain={underlinetogglemain}
    borderRadius={borderRadius}
    borderRadiusType={borderRadiusType}
    blurlogo={blurlogo}
    offsetColorlogo={offsetColorlogo}
    offsetXlogo={offsetXlogo}
    offsetYlogo={offsetYlogo}
    textAboveIcon={textAboveIcon}
    isTextLayoutHorizontal={textLayoutHorizontal}
    icon={icon}
    iconSize={iconSize}
    iconColor={iconColor}
    text={text}
    fontFamily={fontFamily}
    fontSize={fontSize}
    letterSpacing={letterSpacing}
    isBold={isBold}
    color={color}
    accentText={accentText}
    accentFontFamily={accentFontFamily}
    accentFontSize={accentFontSize}
    accentLetterSpacing={accentLetterSpacing}
    isAccentBold={isAccentBold}
    accentColor={accentColor}
    layoutHorizontal={layoutHorizontal}
    layoutDirection={layoutDirection}
    offsetColoraccent={offsetColoraccent}
    offsetColormain={offsetColormain}
    backgroundColorLogo={backgroundColorLogo}
    horizontalPadding={horizontalPadding}
    verticalPadding={verticalPadding}
    randomizeLogo={randomizeLogo}
    offsetXmain={offsetXmain}
    offsetYmain={offsetYmain}
    blurMain={blurMain}
    offsetXaccent={offsetXaccent}
    offsetYaccent={offsetYaccent}
    blurAccent={blurAccent}
  />;
  };
  
  return (
    <div className="flex flex-col w-full h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <div className="bg-white w-full border-b border-gray-200">
        <ul className="flex justify-between items-center px-4 md:px-0 overflow-x-auto">
          {currentTabConfig.map(tab => (
            <li key={tab.name} className="flex-1 min-w-max">
              <button
                onClick={() => toggleTab(tab.name)}
                className={`flex flex-col items-center text-sm font-bold py-3 px-4 focus:outline-none gap-3 w-full
                  ${activeTab === tab.name ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600'}
                  hover:bg-blue-50 transition-colors duration-150`}
              >
                {tab.icon}
                <span>{`${tab.name.charAt(0).toUpperCase()}${tab.name.slice(1)}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex flex-grow overflow-hidden relative">
        {/* Sidebar */}
        <div className={`bg-white w-full lg:w-96 p-4 overflow-auto shadow-lg transition-all duration-300 
          ${isSidebarOpen || window.innerWidth > 1024 ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-20 lg:z-0`}>
          {/* Close button for mobile */}
          {window.innerWidth <= 1024 && (
            <button
              onClick={closeSidebar}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {activeMainTab === 'logo' && (
            <>
              {activeTab === 'global' && (
                <GlobalSettings
                  textgap={textgap}
                  setTextgap={setTextgap}
                  icontextgap={icontextgap}
                  setIcontextgap={setIcontextgap}
                  icon3DDepth={icon3DDepth}
                  is3DEffect={is3DEffect}
                  setIcon3DDepth={seticon3DDepth}
                  setIs3DEffect={setis3DEffect}
                  borderRadius={borderRadius}
                  setBorderRadius={setBorderRadius}
                  borderRadiusType={borderRadiusType}
                  setBorderRadiusType={setBorderRadiusType}
                  layoutHorizontal={layoutHorizontal}
                  setLayoutHorizontal={setLayoutHorizontal}
                  layoutDirection={layoutDirection}
                  setLayoutDirection={setLayoutDirection}
                  setTextAboveIcon={setTextAboveIcon}
                  backgroundColorLogo={backgroundColorLogo}
                  setBackgroundColorLogo={setBackgroundColorLogo}
                  transparentBackground={transparentBackground}
                  setTransparentBackground={setTransparentBackground}
                  horizontalPadding={horizontalPadding}
                  setHorizontalPadding={setHorizontalPadding}
                  verticalPadding={verticalPadding}
                  setVerticalPadding={setVerticalPadding}
                  textLayout={textLayoutHorizontal}
                  setTextLayout={setTextLayoutHorizontal}
                />
              )}
              {activeTab === 'icon' && (
                <IconSettings
                  logobgcolor={logobgcolor}
                  setLogobgcolor={setLogobgcolor}
                  logobgpaddingx={logobgpaddingx}
                  logobgpaddingy={logobgpaddingy}
                  setLogobgpaddingx={setLogobgpaddingx}
                  setLogobgpaddingy={setLogobgpaddingy}
                  logobgborderradius={logobgborderradius}
                  setLogobgborderradius={setLogobgborderradius}
                  icon={icon}
                  setIcon={setIcon}
                  iconSize={iconSize}
                  setIconSize={setIconSize}
                  iconColor={iconColor}
                  setIconColor={setIconColor}
                  offsetColorlogo={offsetColorlogo}
                  setoffsetColorlogo={setOffsetColorlogo}
                  offsetX={offsetXlogo}
                  setOffsetX={setOffsetXlogo}
                  offsetY={offsetYlogo}
                  setOffsetY={setOffsetYlogo}
                  blur={blurlogo}
                  setBlur={setBlurlogo}
                />
              )}
              {activeTab === 'main' && (
                <MainSettings
                  mainbgcolor={mainbgcolor}
                  setMainbgcolor={setMainbgcolor}
                  mainbgpaddingx={mainbgpaddingx}
                  setMainbgpaddingx={setMainbgpaddingx}
                  mainbgpaddingy={mainbgpaddingy}
                  setMainbgpaddingy={setMainbgpaddingy}
                  mainbgborderradius={mainbgborderradius}
                  setMainbgborderradius={setMainbgborderradius}
                  underlinetoggle={underlinetogglemain}
                  setunderlinetoggle={setunderlinetogglemain}
                  text={text}
                  onTextChange={handleTextChange}
                  fontSize={fontSize}
                  onFontSizeChange={handleFontSizeChange}
                  letterSpacing={letterSpacing}
                  onLetterSpacingChange={handleLetterSpacingChange}
                  isBold={isBold}
                  onBoldToggle={handleBoldToggle}
                  fontFamily={fontFamily}
                  setFontFamily={setFontFamily}
                  color={color}
                  setColor={setColor}
                  offsetColormain={offsetColormain}
                  setOffsetColormain={setOffsetColormain}
                  offsetX={offsetXmain}
                  setOffsetX={setOffsetXmain}
                  offsetY={offsetYmain}
                  setOffsetY={setOffsetYmain}
                  blur={blurMain}
                  setBlur={setBlurMain}
                />
              )}
              {activeTab === 'accent' && (
                <AccentSettings
                  underlinetoggle={underlinetoggleaccent}
                  setunderlinetoggle={setunderlinetoggleaccent}
                  accentbgcolor={accentbgcolor}
                  setAccentbgcolor={setAccentbgcolor}
                  accentbgpaddingx={accentbgpaddingx}
                  setAccentbgpaddingx={setAccentbgpaddingx}
                  accentbgpaddingy={accentbgpaddingy}
                  setAccentbgpaddingy={setAccentbgpaddingy}
                  accentbgborderradius={accentbgborderradius}
                  setAccentbgborderradius={setAccentbgborderradius}
                  offsetColoraccent={offsetColoraccent}
                  setOffsetColoraccent={setOffsetColoraccent}
                  text={accentText}
                  onTextChange={handleAccentTextChange}
                  fontSize={accentFontSize}
                  onFontSizeChange={handleAccentFontSizeChange}
                  letterSpacing={accentLetterSpacing}
                  onLetterSpacingChange={handleAccentLetterSpacingChange}
                  isBold={isAccentBold}
                  onBoldToggle={handleAccentBoldToggle}
                  fontFamily={accentFontFamily}
                  setFontFamily={setAccentFontFamily}
                  color={accentColor}
                  setColor={setAccentColor}
                  blur={blurAccent}
                  offsetX={offsetXaccent}
                  offsetY={offsetYaccent}
                  setBlur={setBlurAccent}
                  setOffsetX={setOffsetXaccent}
                  setOffsetY={setOffsetYaccent}
                />
              )}
              {activeTab === 'color patterns' && (
                <ColorPatternSettings
                  colorPatterns={colorPatterns}
                  selectedPattern={selectedColorPattern}
                  onPatternChange={handleColorPatternChange}
                />
              )}
              {activeTab === 'saved logos' && <LogoList />}
            </>
          )}
          {activeMainTab === 'businessCard' && (
            <>
              {activeTab === 'color patterns' && (
                <ColorPatternSettings
                  colorPatterns={colorPatterns}
                  selectedPattern={selectedColorPattern}
                  onPatternChange={handleColorPatternChange}
                />
              )}
              {activeTab === 'settings' && (
                <div className="flex-1 space-y-6">
                  <ModularBusinessCardStudio mode="editor" colorPattern={selectedColorPattern} LogoDisplay={LogoDisplayWrapper} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="content flex-grow bg-gray-50 flex flex-col items-center justify-start overflow-hidden">
          <div className="w-full border-b mb-4">
            <div className="container">
              <div className="flex justify-between items-center px-4 md:px-0 overflow-x-auto bg-white">
                <button
                  className={`flex-1 px-4 py-2 focus:outline-none ${activeMainTab === 'logo' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                  onClick={() => {
                    setActiveMainTab('logo');
                    setActiveTab('global');
                  }}
                >
                  Logo Preview
                </button>
                <button
                  className={`flex-1 px-4 py-2 focus:outline-none ${activeMainTab === 'businessCard' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                  onClick={() => {
                    setActiveMainTab('businessCard');
                    setActiveTab('settings');
                  }}
                >
                  Business Card Editor
                </button>
              </div>
            </div>
          </div>
          <div className="content flex-grow bg-gray-50 flex items-center justify-start w-full overflow-scroll">
            <div className="relative z-0 w-full flex items-start justify-start h-full">
              {activeMainTab === 'logo' ? (
                <LogoPreview
                  textgap={textgap}
                  icontextgap={icontextgap}
                  accentbgborderradius={accentbgborderradius}
                  accentbgcolor={accentbgcolor}
                  accentbgpaddingx={accentbgpaddingx}
                  accentbgpaddingy={accentbgpaddingy}
                  logobgborderradius={logobgborderradius}
                  logobgcolor={logobgcolor}
                  logobgpaddingx={logobgpaddingx}
                  logobgpaddingy={logobgpaddingy}
                  mainbgborderradius={mainbgborderradius}
                  mainbgcolor={mainbgcolor}
                  mainbgpaddingx={mainbgpaddingx}
                  mainbgpaddingy={mainbgpaddingy}
                  icon3DDepth={icon3DDepth}
                  is3DEffect={is3DEffect}
                  underlineaccent={underlinetoggleaccent}
                  underlinemain={underlinetogglemain}
                  borderRadius={borderRadius}
                  borderRadiusType={borderRadiusType}
                  blurlogo={blurlogo}
                  offsetColorlogo={offsetColorlogo}
                  offsetXlogo={offsetXlogo}
                  offsetYlogo={offsetYlogo}
                  textAboveIcon={textAboveIcon}
                  isTextLayoutHorizontal={textLayoutHorizontal}
                  icon={icon}
                  iconSize={iconSize}
                  iconColor={iconColor}
                  text={text}
                  fontFamily={fontFamily}
                  fontSize={fontSize}
                  letterSpacing={letterSpacing}
                  isBold={isBold}
                  color={color}
                  accentText={accentText}
                  accentFontFamily={accentFontFamily}
                  accentFontSize={accentFontSize}
                  accentLetterSpacing={accentLetterSpacing}
                  isAccentBold={isAccentBold}
                  accentColor={accentColor}
                  layoutHorizontal={layoutHorizontal}
                  layoutDirection={layoutDirection}
                  offsetColoraccent={offsetColoraccent}
                  offsetColormain={offsetColormain}
                  backgroundColorLogo={backgroundColorLogo}
                  horizontalPadding={horizontalPadding}
                  verticalPadding={verticalPadding}
                  randomizeLogo={randomizeLogo}
                  offsetXmain={offsetXmain}
                  offsetYmain={offsetYmain}
                  blurMain={blurMain}
                  offsetXaccent={offsetXaccent}
                  offsetYaccent={offsetYaccent}
                  blurAccent={blurAccent}
                />
              ) : (
                <ModularBusinessCardStudio mode="preview" colorPattern={selectedColorPattern} LogoDisplay={LogoDisplayWrapper} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;