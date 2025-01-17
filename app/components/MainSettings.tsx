import React from 'react';
import SearchableFontDropdown from './custom components/SearchableFontDropdown';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      "Roboto", "Montserrat", "Open Sans", "Playfair Display", "Merriweather", "Roboto Slab",
      "Lobster", "Pacifico", "Arial", "Verdana", "Tahoma", "Courier New","BlackJackRegular"
    ]
  }
});

interface MainSettingsProps {
  text: string;
  onTextChange: (newText: string) => void;
  fontSize: number;
  onFontSizeChange: (newSize: number) => void;
  letterSpacing: number;
  onLetterSpacingChange: (newSpacing: number) => void;
  isBold: boolean;
  onBoldToggle: () => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  color: string;
  setColor: (color: string) => void;
  offsetColormain: string;
  setOffsetColormain: (value: string) => void;
  offsetX: number;
  setOffsetX: (value: number) => void;
  offsetY: number;
  setOffsetY: (value: number) => void;
  blur: number;
  setBlur: (value: number) => void;
  underlinetoggle: boolean;
  setunderlinetoggle: (value: boolean) => void;
  mainbgcolor: string;
  setMainbgcolor: (value: string) => void;
  mainbgpaddingx: number;
  setMainbgpaddingx: (value: number) => void;
  mainbgpaddingy: number;
  setMainbgpaddingy: (value: number) => void;
  mainbgborderradius: number;
  setMainbgborderradius: (value: number) => void;
}

const MainSettings: React.FC<MainSettingsProps> = ({
  text,
  onTextChange,
  fontSize,
  onFontSizeChange,
  letterSpacing,
  onLetterSpacingChange,
  isBold,
  onBoldToggle,
  fontFamily,
  setFontFamily,
  color,
  setColor,
  offsetColormain,
  setOffsetColormain,
  offsetX,
  setOffsetX,
  offsetY,
  setOffsetY,
  blur,
  setBlur,
  underlinetoggle,
  setunderlinetoggle,
  mainbgcolor,
  setMainbgcolor,
  mainbgpaddingx,
  setMainbgpaddingx,
  mainbgpaddingy,
  setMainbgpaddingy,
  mainbgborderradius,
  setMainbgborderradius,
}) => {
  const handleTurnOffOffset = () => {
    setOffsetX(0);
    setOffsetY(0);
    setBlur(0);
  };
  const toggleunderline = () => {
    setunderlinetoggle(!underlinetoggle);
  };
  const handleMakeTransparent = () => {
    setMainbgcolor('rgba(0, 0, 0, 0)');
  };

  const renderDivider = () => (
    <hr className="my-6 border-t border-gray-200" />
  );

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Text Content */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Text Content</h4>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            style={{ fontFamily, fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}
            className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {renderDivider()}

      {/* Font Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Font Settings</h4>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Font Family</label>
          <SearchableFontDropdown
            fonts={[
              'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Times New Roman',
              'Georgia', 'Garamond', 'Courier New', 'Brush Script MT', 'Lobster', 'Pacifico',
              'Roboto', 'Montserrat', 'Open Sans', 'Playfair Display', 'Merriweather', 'Roboto Slab'
            ]}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Size</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="10"
              max="100"
              value={fontSize}
              onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{fontSize}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Letter Spacing</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="20"
              value={letterSpacing}
              onChange={(e) => onLetterSpacingChange(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{letterSpacing}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Text Weight</label>
          <button
            onClick={onBoldToggle}
            className={`w-full py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
              isBold 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
            }`}
          >
            {isBold ? 'Bold' : 'Normal'}
          </button>
        </div>
      </div>

      {renderDivider()}

      {/* Color Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Color Settings</h4>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Text Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-0 border-none cursor-pointer"
          />
        </div>
      </div>

      {renderDivider()}

      {/* Background Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Background Settings</h4>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Background Color</label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={mainbgcolor === 'rgba(0, 0, 0, 0)' ? '#ffffff' : mainbgcolor}
              onChange={(e) => setMainbgcolor(e.target.value)}
              className="w-full h-10 p-0 border-none cursor-pointer"
            />
            <button
              onClick={handleMakeTransparent}
              className="py-2 px-4 bg-gray-200 text-indigo-700 hover:bg-gray-300 transition-colors duration-200 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Make Transparent
            </button>
          </div>
          {mainbgcolor === 'rgba(0, 0, 0, 0)' && (
            <p className="mt-1 text-sm text-gray-500">Background is currently transparent</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Horizontal Padding</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="50"
              value={mainbgpaddingx}
              onChange={(e) => setMainbgpaddingx(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{mainbgpaddingx}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Vertical Padding</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="50"
              value={mainbgpaddingy}
              onChange={(e) => setMainbgpaddingy(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{mainbgpaddingy}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Corner Roundness</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="50"
              value={mainbgborderradius}
              onChange={(e) => setMainbgborderradius(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{mainbgborderradius}px</span>
          </div>
        </div>
      </div>

      {renderDivider()}

      {/* Shadow Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Shadow Settings</h4>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Horizontal Offset</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="-50"
              max="50"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{offsetX}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Vertical Offset</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="-50"
              max="50"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{offsetY}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Blur</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="30"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{blur}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Shadow Color</label>
          <input
            type="color"
            className="w-full h-10 p-0 border-none cursor-pointer"
            value={offsetColormain}
            onChange={(e) => setOffsetColormain(e.target.value)}
          />
        </div>

        <button
          onClick={handleTurnOffOffset}
          className="w-full py-2 px-4 bg-red-400 text-white hover:bg-red-500 transition-colors duration-200 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Remove Shadow
        </button>
      </div>
    </div>
  );
};

export default MainSettings;