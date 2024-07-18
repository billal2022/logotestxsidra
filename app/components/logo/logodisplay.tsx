'use client';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@mdi/react';
import domtoimage from 'dom-to-image';
import { useLogoContext } from '../logocontext';

interface LogoPreviewProps {
  icon: { library: string, icon: any };
  iconSize: number;
  iconColor: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  isBold: boolean;
  color: string;
  accentText: string;
  accentFontFamily: string;
  accentFontSize: number;
  accentLetterSpacing: number;
  isAccentBold: boolean;
  accentColor: string;
  layoutHorizontal: boolean;
  layoutDirection: 'ltr' | 'rtl';
  offsetXmain: number;
  offsetYmain: number;
  blurMain: number;
  offsetColormain: string;
  offsetXlogo: number;
  offsetYlogo: number;
  blurlogo: number;
  offsetColorlogo: string;
  offsetXaccent: number;
  offsetYaccent: number;
  offsetColoraccent: string;
  blurAccent: number;
  backgroundColorLogo: string;
  horizontalPadding: number;
  verticalPadding: number;
  isTextLayoutHorizontal: boolean;
  textAboveIcon: boolean;
  randomizeLogo: () => void;
  borderRadius: string;
  borderRadiusType: 'px' | '%';
  underlineaccent: boolean;
  underlinemain: boolean;
  is3DEffect: boolean;
  icon3DDepth: number;
  accentbgcolor:string;
  accentbgpaddingx:number;
  accentbgpaddingy:number;
  accentbgborderradius:number;
  mainbgcolor:string;
  mainbgpaddingx:number;
  mainbgpaddingy:number;
  mainbgborderradius:number;
logobgcolor:string; 
logobgpaddingx:number;
logobgpaddingy:number;
logobgborderradius:number;
textgap:number;
icontextgap:number;
}

const LogoPreview: React.FC<LogoPreviewProps> = ({
  icon,
  iconSize,
  iconColor,
  text,
  fontFamily,
  fontSize,
  letterSpacing,
  isBold,
  color,
  accentText,
  accentFontFamily,
  accentFontSize,
  accentLetterSpacing,
  isAccentBold,
  accentColor,
  layoutHorizontal,
  layoutDirection,
  offsetXmain,
  offsetYmain,
  offsetColormain,
  blurMain,
  offsetXaccent,
  offsetYaccent,
  offsetColoraccent,
  blurAccent,  
  offsetXlogo,
  offsetYlogo,
  offsetColorlogo,
  blurlogo,
  backgroundColorLogo,
  horizontalPadding,
  verticalPadding,
  isTextLayoutHorizontal,
  textAboveIcon,
  randomizeLogo,
  borderRadius,
  borderRadiusType,
  underlineaccent,
  underlinemain,
  is3DEffect,
  icon3DDepth,
  accentbgcolor,
  mainbgcolor,
  logobgcolor,  
  accentbgpaddingx,
  accentbgpaddingy,
  mainbgpaddingx,
  mainbgpaddingy,
  logobgpaddingx, 
  logobgpaddingy, 
   accentbgborderradius,
  mainbgborderradius,
  logobgborderradius,

  textgap,
  icontextgap
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const iconPreviewRef = useRef<HTMLDivElement>(null);

  const { addLogo, editLogo, currentLogoIndex } = useLogoContext();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [activeTab, setActiveTab] = useState('logo');

  const generate3DEffect = (depth: number, baseColor: string) => {
    if (!is3DEffect) return '';
  
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };
  
    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
  
    const baseRgb = hexToRgb(baseColor);
    if (!baseRgb) return '';
  
    const shadowColors = [
      baseColor,
      ...Array.from({ length: 6 }, (_, i) => {
        const factor = (i + 1) * 30;
        return rgbToHex(
          Math.max(baseRgb.r - factor, 0),
          Math.max(baseRgb.g - factor, 0),
          Math.max(baseRgb.b - factor, 0)
        );
      })
    ];
  
    const effect = shadowColors.slice(0, depth).map((color, index) => 
      `drop-shadow(0px ${index * 0.5}px 0px ${color})`
    ).join(' ');
  
    return effect + ' drop-shadow(0px 2px 2px #474747)';
  };



  const renderIcon = () => (
    <div style={{paddingInline:logobgpaddingx,paddingBlock:logobgpaddingy,background:logobgcolor,borderRadius:logobgborderradius,}}>


    <div
      style={{
        color: iconColor,
        fontSize: `${iconSize}px`,
        filter: is3DEffect 
          ? generate3DEffect(icon3DDepth, offsetColorlogo)
          : `drop-shadow(${offsetXlogo}px ${offsetYlogo}px ${blurlogo}px ${offsetColorlogo})`,
      }}
    >
      {icon.library === 'FontAwesome' ? (
        <FontAwesomeIcon icon={icon.icon}  />
      ) : (
        <Icon path={icon.icon} size={iconSize / 24} />
      )}
    </div>
    </div>
  );

  const renderText = () => (
    <div 
      className={`flex ${isTextLayoutHorizontal ? 'flex-row' : 'flex-col'} items-center justify-center text-center`}
      style={{ whiteSpace: 'nowrap',gap:textgap }} // Add this to prevent wrapping
    >
              <div style={{ background:mainbgcolor,
          paddingInline:mainbgpaddingx,
          paddingBlock:mainbgpaddingy,
          borderRadius:mainbgborderradius,}}>

      <span
        className={`${underlinemain ? 'underline' : ''} break-words inline-block`}
        style={{

          fontFamily,
          fontSize: `${fontSize}px`,
          letterSpacing: `${letterSpacing}px`,
          fontWeight: isBold ? 'bold' : 'normal',
          color,
          filter: is3DEffect 
          ? generate3DEffect(icon3DDepth, offsetColormain)
          : `drop-shadow(${offsetXmain}px ${offsetYmain}px ${blurMain}px ${offsetColormain})`,
          lineHeight: 1, // Set line-height to 1 to prevent extra spacing
          padding: '0.1em 0', // Add slight vertical padding to prevent cutting off descenders
        }}
        >
        {text}
      </span>
        </div>
      {accentText && (
        <div style={{ background:accentbgcolor,
          paddingInline:accentbgpaddingx,
          paddingBlock:accentbgpaddingy,
          borderRadius:accentbgborderradius,}}>

        <span
          className={`${underlineaccent ? 'underline' : ''} break-words inline-block ml-2`}
          style={{
           
            fontFamily: accentFontFamily,
            fontSize: `${accentFontSize}px`,
            letterSpacing: `${accentLetterSpacing}px`,
            fontWeight: isAccentBold ? 'bold' : 'normal',
            color: accentColor,
            filter: is3DEffect 
            ? generate3DEffect(icon3DDepth, offsetColoraccent)
            : `drop-shadow(${offsetXaccent}px ${offsetYaccent}px ${blurAccent}px ${offsetColoraccent})`,
            lineHeight: 1, // Set line-height to 1 to prevent extra spacing
            padding: '0.1em 0', // Add slight vertical padding to prevent cutting off descenders
          }}
          >
          {accentText}
        </span>
          </div>
      )}
    </div>
  );

  return (
    <div
      ref={previewRef}
      className={`flex ${
        layoutHorizontal ? 'flex-row gap-4' : 'flex-col gap-4'
      } ${
        layoutDirection === 'ltr' ? '' : 'flex-row-reverse'
      } justify-center items-center bg-white rounded-lg `}
      style={{
        gap:icontextgap,
        backgroundColor: backgroundColorLogo,
        padding: `${verticalPadding}px ${horizontalPadding}px`,
        borderRadius: `${borderRadius}${borderRadiusType}`,
      }}
    >
      {textAboveIcon && renderText()}
      {renderIcon()}
      {!textAboveIcon && renderText()}
    </div>

  );
};

export default LogoPreview;