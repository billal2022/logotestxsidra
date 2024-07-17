"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Icon from '@mdi/react';
import domtoimage from 'dom-to-image';
import { useLogoContext } from '../logocontext';

interface LogoPreviewProps {
  icon: { library: 'FontAwesome' | 'MDI'; icon: IconDefinition | string };
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
  offsetColormain: string;
  blurMain: number;
  offsetXaccent: number;
  offsetYaccent: number;
  offsetColoraccent: string;
  blurAccent: number;
  offsetXlogo: number;
  offsetYlogo: number;
  offsetColorlogo: string;
  blurlogo: number;
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
  accentbgcolor: string;
  mainbgcolor: string;
  logobgcolor: string;
  accentbgpaddingx: number;
  accentbgpaddingy: number;
  mainbgpaddingx: number;
  mainbgpaddingy: number;
  logobgpaddingx: number;
  logobgpaddingy: number;
  accentbgborderradius: number;
  mainbgborderradius: number;
  logobgborderradius: number;
  textgap: number;
  icontextgap: number;
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
  icontextgap,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const iconPreviewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState<number>(1);
  const [isScaled, setIsScaled] = useState<boolean>(false);

  const { addLogo, editLogo, currentLogoIndex } = useLogoContext();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('logo');

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          const containerWidth = entry.contentRect.width;
          const logoWidth = previewRef.current?.offsetWidth || 0;

          if (logoWidth > containerWidth) {
            const newScale = containerWidth / logoWidth;
            setScale(newScale);
            setIsScaled(true);
          } else {
            setScale(1);
            setIsScaled(false);
          }
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const generate3DEffect = (depth: number, baseColor: string): string => {
    if (!is3DEffect) return '';

    const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
      }),
    ];

    const effect = shadowColors
      .slice(0, depth)
      .map((color, index) => `drop-shadow(0px ${index * 0.5}px 0px ${color})`)
      .join(' ');

    return effect + ' drop-shadow(0px 2px 2px #474747)';
  };

  const handleDownload = (ref: React.RefObject<HTMLDivElement>, filename: string): void => {
    if (ref.current) {
      const scale = 5;
      const options = {
        width: ref.current.clientWidth * scale,
        height: ref.current.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${ref.current.clientWidth}px`,
          height: `${ref.current.clientHeight}px`,
        },
      };

      domtoimage.toBlob(ref.current, options).then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      });
    }
  };

  const handleSave = (): void => {
    if (previewRef.current) {
      const scale = 5;
      const options = {
        width: previewRef.current.clientWidth * scale,
        height: previewRef.current.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${previewRef.current.clientWidth}px`,
          height: `${previewRef.current.clientHeight}px`,
        },
      };

      domtoimage.toPng(previewRef.current, options).then((dataUrl: string) => {
        if (currentLogoIndex !== null) {
          editLogo(currentLogoIndex, dataUrl);
        } else {
          addLogo(dataUrl);
        }
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 2000);
      });
    }
  };

  const renderIcon = (): JSX.Element => (
    <div
      className="p-2"
      style={{
        paddingInline: logobgpaddingx,
        paddingBlock: logobgpaddingy,
        background: logobgcolor,
        borderRadius: logobgborderradius,
      }}
    >
      <div
        className="text-center"
        style={{
          color: iconColor,
          fontSize: `${iconSize}px`,
          filter: is3DEffect
            ? generate3DEffect(icon3DDepth, offsetColorlogo)
            : `drop-shadow(${offsetXlogo}px ${offsetYlogo}px ${blurlogo}px ${offsetColorlogo})`,
        }}
      >
        {icon.library === 'FontAwesome' ? (
          <FontAwesomeIcon icon={icon.icon as IconDefinition} />
        ) : (
          <Icon path={icon.icon as string} size={iconSize / 24} />
        )}
      </div>
    </div>
  );

  const renderText = (): JSX.Element => (
    <div
      className={`flex ${
        isTextLayoutHorizontal ? 'flex-row' : 'flex-col'
      } items-center justify-center text-center space-y-2 sm:space-y-0 sm:space-x-2`}
      style={{ whiteSpace: 'nowrap', gap: textgap }}
    >
      <div
        className="p-2"
        style={{
          background: mainbgcolor,
          paddingInline: mainbgpaddingx,
          paddingBlock: mainbgpaddingy,
          borderRadius: mainbgborderradius,
        }}
      >
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
        <div
          className="p-2 mt-2 sm:mt-0"
          style={{
            background: accentbgcolor,
            paddingInline: accentbgpaddingx,
            paddingBlock: accentbgpaddingy,
            borderRadius: accentbgborderradius,
          }}
        >
          <span
            className={`${underlineaccent ? 'underline' : ''} break-words inline-block`}
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
    <div className="flex flex-col w-full self-stretch">
      <div className="container mx-auto p-2 sm:p-4 flex-grow">
        <div className="bg-gray-50 rounded-lg shadow-inner p-4 sm:p-8 content-center w-full h-full">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-4 md:space-x-12">
            <div className="flex flex-col items-center w-full sm:w-auto" ref={containerRef}>
              <div
                ref={previewRef}
                className={`flex ${
                  layoutHorizontal ? 'flex-row' : 'flex-col'
                } ${
                  layoutDirection === 'ltr' ? '' : 'flex-row-reverse'
                } justify-center items-center bg-white rounded-lg shadow-md p-4 sm:p-6`}
                style={{
                  gap: icontextgap,
                  backgroundColor: backgroundColorLogo,
                  padding: `${verticalPadding}px ${horizontalPadding}px`,
                  borderRadius: `${borderRadius}${borderRadiusType}`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                {textAboveIcon && renderText()}
                {renderIcon()}
                {!textAboveIcon && renderText()}
              </div>
 
              {backgroundColorLogo === 'transparent' && (
                <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                  The background is transparent
                </p>
              )}
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 font-medium">Full Logo</p>
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto">
              <div
                ref={iconPreviewRef}
                className="flex justify-center items-center bg-white rounded-lg shadow-md p-4 sm:p-6"
                style={{
                  backgroundColor: backgroundColorLogo,
                  padding: `${verticalPadding}px ${horizontalPadding}px`,
                  borderRadius: `${borderRadius}${borderRadiusType}`,
                }}
              >
                {renderIcon()}
              </div>
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 font-medium">Icon Only</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'logo' && (
        <div className="bg-gray-100 border-t border-gray-200 py-2 sm:py-4">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
              <button
                onClick={handleSave}
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save Logo
              </button>
              <button
                onClick={() => handleDownload(previewRef, 'logo-preview.png')}
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Download Full Logo
              </button>
              <button
                onClick={() => handleDownload(iconPreviewRef, 'logo-icon.png')}
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Download Icon
              </button>
              <button
                onClick={randomizeLogo}
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Randomize Logo
              </button>
            </div>
          </div>
        </div>
      )}

      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded shadow-lg text-sm sm:text-base">
          Logo saved successfully!
        </div>
      )}
    </div>
  );
};

export default LogoPreview;