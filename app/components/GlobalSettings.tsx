import React, { useState } from 'react';

interface GlobalSettingsProps {
  layoutHorizontal: boolean;
  setLayoutHorizontal: (value: boolean) => void;
  layoutDirection: 'ltr' | 'rtl';
  setLayoutDirection: (value: 'ltr' | 'rtl') => void;
  backgroundColorLogo: string;
  setBackgroundColorLogo: (value: string) => void;
  transparentBackground: boolean;
  setTransparentBackground: (value: boolean) => void;
  horizontalPadding: number;
  setHorizontalPadding: (value: number) => void;
  verticalPadding: number;
  setVerticalPadding: (value: number) => void;
  textLayout: boolean;
  setTextLayout: (value: boolean) => void;
  setTextAboveIcon: (value: boolean) => void;
  borderRadius: string;
  setBorderRadius: (value: string) => void;
  borderRadiusType: 'px' | '%';
  setBorderRadiusType: (value: 'px' | '%') => void;
  is3DEffect: boolean;
  setIs3DEffect: (value: boolean) => void;
  icon3DDepth: number;
  setIcon3DDepth: (value: number) => void;  
  textgap: number;
  setTextgap: (value: number) => void;
  icontextgap: number;
  setIcontextgap: (value: number) => void;
}

const GlobalSettings: React.FC<GlobalSettingsProps> = ({
  layoutHorizontal,
  setLayoutHorizontal,
  layoutDirection,
  setLayoutDirection,
  backgroundColorLogo,
  setBackgroundColorLogo,
  transparentBackground,
  setTransparentBackground,
  horizontalPadding,
  setHorizontalPadding,
  verticalPadding,
  setVerticalPadding,
  textLayout,
  setTextLayout,
  setTextAboveIcon,
  borderRadius,
  setBorderRadius,
  borderRadiusType,
  setBorderRadiusType,
  is3DEffect,
  setIs3DEffect,
  icon3DDepth,
  setIcon3DDepth,
  textgap,
  setTextgap,
  icontextgap,
  setIcontextgap,
}) => {
  const [activeLayoutButton, setActiveLayoutButton] = useState('horizontalLeft');

  const toggleBackgroundTransparency = () => {
    setTransparentBackground(!transparentBackground);
    setBackgroundColorLogo(transparentBackground ? '#FFFFFF' : 'transparent');
  };

  const toggleTextLayout = () => {
    setTextLayout(!textLayout);
  };

  const setHorizontalLeft = () => {
    setLayoutHorizontal(true);
    setLayoutDirection('ltr');
    setActiveLayoutButton('horizontalLeft');
  };

  const setHorizontalRight = () => {
    setLayoutHorizontal(true);
    setLayoutDirection('rtl');
    setActiveLayoutButton('horizontalRight');
  };

  const setVerticalTop = () => {
    setLayoutHorizontal(false);
    setTextAboveIcon(true);
    setActiveLayoutButton('verticalTop');
  };

  const setVerticalBottom = () => {
    setLayoutHorizontal(false);
    setTextAboveIcon(false);
    setActiveLayoutButton('verticalBottom');
  };

  const getButtonClass = (buttonId: string) => {
    return `w-full py-2 px-4 text-sm font-medium transition-colors duration-200 ${
      activeLayoutButton === buttonId
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
    }`;
  };

  const maxBorderRadius = borderRadiusType === 'px' ? 125 : 50;

  return (
    <div className="bg-white p-6 space-y-6">
      <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-700">Layout Settings</h4>
      <div className="grid grid-cols-2 gap-4">
          <button className={getButtonClass('horizontalLeft')} onClick={setHorizontalLeft}>
            Horizontal Layout, Text Left
          </button>
          <button className={getButtonClass('horizontalRight')} onClick={setHorizontalRight}>
            Horizontal Layout, Text Right
          </button>
          <button className={getButtonClass('verticalTop')} onClick={setVerticalTop}>
            Vertical Layout, Text Top
          </button>
          <button className={getButtonClass('verticalBottom')} onClick={setVerticalBottom}>
            Vertical Layout, Text Bottom
          </button>
        </div>
      </div>

      <hr className="my-6 border-t border-gray-200" />

      <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-700">Appearance Settings</h4>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Border Radius</label>
          <select
            className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={borderRadiusType}
            onChange={(e) => setBorderRadiusType(e.target.value as 'px' | '%')}
          >
            <option value="px">Pixels (px)</option>
            <option value="%">Percent (%)</option>
          </select>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              max={maxBorderRadius}
              step="1"
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
            />
            <span className="text-sm text-gray-600">{borderRadius}{borderRadiusType}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">3D Effect</label>
          <button
            className={`w-full py-2 px-4 text-sm font-medium transition-colors duration-200 ${
              is3DEffect
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
            }`}
            onClick={() => setIs3DEffect(!is3DEffect)}
          >
            {is3DEffect ? '3D Effect Enabled' : '3D Effect Disabled'}
          </button>
        </div>

        {is3DEffect && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">3D Effect Depth</label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
                max="10"
                step="1"
                value={icon3DDepth}
                onChange={(e) => setIcon3DDepth(Number(e.target.value))}
              />
              <span className="text-sm text-gray-600">{icon3DDepth}</span>
            </div>
          </div>
        )}
      </div>

      <hr className="my-6 border-t border-gray-200" />

      <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-700">Text and Icon Settings</h4>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Text Layout Orientation</label>
          <button
            className={`w-full py-2 px-4 text-sm font-medium transition-colors duration-200 ${
              textLayout
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
            }`}
            onClick={toggleTextLayout}
          >
            {textLayout ? 'Horizontal' : 'Vertical'}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Text Gap</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              max="50"
              step="1"
              value={textgap}
              onChange={(e) => setTextgap(Number(e.target.value))}
            />
            <span className="text-sm text-gray-600">{textgap}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Icon-Text Gap</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              max="50"
              step="1"
              value={icontextgap}
              onChange={(e) => setIcontextgap(Number(e.target.value))}
            />
            <span className="text-sm text-gray-600">{icontextgap}px</span>
          </div>
        </div>
      </div>

      <hr className="my-6 border-t border-gray-200" />

      <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-700">Background Settings</h4>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Background Color for Logo</label>
          <input
            type="color"
            className="w-full h-10 p-0 border-none cursor-pointer"
            value={backgroundColorLogo}
            onChange={(e) => setBackgroundColorLogo(e.target.value)}
            disabled={transparentBackground}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Horizontal Padding</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              max="50"
              step="1"
              value={horizontalPadding}
              onChange={(e) => setHorizontalPadding(Number(e.target.value))}
            />
            <span className="text-sm text-gray-600">{horizontalPadding}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Vertical Padding</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              max="50"
              step="1"
              value={verticalPadding}
              onChange={(e) => setVerticalPadding(Number(e.target.value))}
            />
            <span className="text-sm text-gray-600">{verticalPadding}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Background Transparency</label>
          <button
            className={`w-full py-2 px-4 text-sm font-medium transition-colors duration-200 ${
              transparentBackground
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
            }`}
            onClick={toggleBackgroundTransparency}
          >
            {transparentBackground ? 'White Background' : 'Transparent'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;