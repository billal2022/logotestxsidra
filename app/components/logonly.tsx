import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@mdi/react';

interface LogoOnlyProps {
  textgap: number;
  icontextgap: number;
  accentbgborderradius: number;
  accentbgcolor: string;
  accentbgpaddingx: number;
  accentbgpaddingy: number;
  logobgborderradius: number;
  logobgcolor: string;
  logobgpaddingx: number;
  logobgpaddingy: number;
  mainbgborderradius: number;
  mainbgcolor: string;
  mainbgpaddingx: number;
  mainbgpaddingy: number;
  icon3DDepth: number;
  is3DEffect: boolean;
  underlineaccent: boolean;
  underlinemain: boolean;
  borderRadius: string;
  borderRadiusType: 'px' | '%';
  blurlogo: number;
  offsetColorlogo: string;
  offsetXlogo: number;
  offsetYlogo: number;
  textAboveIcon: boolean;
  isTextLayoutHorizontal: boolean;
  icon: { library: string; icon: any };
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
  offsetColoraccent: string;
  offsetColormain: string;
  backgroundColorLogo: string;
  horizontalPadding: number;
  verticalPadding: number;
  offsetXmain: number;
  offsetYmain: number;
  blurMain: number;
  offsetXaccent: number;
  offsetYaccent: number;
  blurAccent: number;
}

export const LogoOnly: React.FC<LogoOnlyProps> = ({
  textgap,
  icontextgap,
  accentbgborderradius,
  accentbgcolor,
  accentbgpaddingx,
  accentbgpaddingy,
  logobgborderradius,
  logobgcolor,
  logobgpaddingx,
  logobgpaddingy,
  mainbgborderradius,
  mainbgcolor,
  mainbgpaddingx,
  mainbgpaddingy,
  icon3DDepth,
  is3DEffect,
  underlineaccent,
  underlinemain,
  borderRadius,
  borderRadiusType,
  blurlogo,
  offsetColorlogo,
  offsetXlogo,
  offsetYlogo,
  textAboveIcon,
  isTextLayoutHorizontal,
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
  offsetColoraccent,
  offsetColormain,
  backgroundColorLogo,
  horizontalPadding,
  verticalPadding,
  offsetXmain,
  offsetYmain,
  blurMain,
  offsetXaccent,
  offsetYaccent,
  blurAccent
}) => {
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
    <div style={{
      paddingInline: logobgpaddingx,
      paddingBlock: logobgpaddingy,
      background: logobgcolor,
      borderRadius: logobgborderradius,
    }}>
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
          <FontAwesomeIcon icon={icon.icon} />
        ) : (
          <Icon path={icon.icon} size={iconSize / 24} />
        )}
      </div>
    </div>
  );

  const renderText = () => (
    <div 
      className={`flex ${isTextLayoutHorizontal ? 'flex-row' : 'flex-col'} items-center justify-center text-center`}
      style={{ whiteSpace: 'nowrap', gap: textgap }}
    >
      <div style={{
        background: mainbgcolor,
        paddingInline: mainbgpaddingx,
        paddingBlock: mainbgpaddingy,
        borderRadius: mainbgborderradius,
      }}>
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
            lineHeight: 1,
            padding: '0.1em 0',
          }}
        >
          {text}
        </span>
      </div>
      {accentText && (
        <div style={{
          background: accentbgcolor,
          paddingInline: accentbgpaddingx,
          paddingBlock: accentbgpaddingy,
          borderRadius: accentbgborderradius,
        }}>
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
              lineHeight: 1,
              padding: '0.1em 0',
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
      className={`flex ${
        layoutHorizontal ? 'flex-row' : 'flex-col'
      } ${
        layoutDirection === 'ltr' ? '' : 'flex-row-reverse'
      } justify-center items-center`}
      style={{
        gap: icontextgap,
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