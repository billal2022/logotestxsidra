import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@mdi/react';
import { faIcons } from './custom components/faIcons';
import { mdiIcons } from './custom components/mdiIcons';
import CustomDropdown from './custom components/CustomDropdown';

interface IconType {
  name: string;
  library: 'FontAwesome' | 'MDI';
  icon: any;
}

interface IconSettingsProps {
  icon: IconType;
  setIcon: (icon: IconType) => void;
  iconSize: number;
  setIconSize: (size: number) => void;
  iconColor: string;
  setIconColor: (color: string) => void;
  offsetColorlogo: string;
  setoffsetColorlogo: (color: string) => void;
  offsetX: number;
  setOffsetX: (offset: number) => void;
  offsetY: number;
  setOffsetY: (offset: number) => void;
  blur: number;
  setBlur: (blur: number) => void;
  logobgcolor: string;
  setLogobgcolor: (color: string) => void;
  logobgpaddingx: number;
  setLogobgpaddingx: (padding: number) => void;
  logobgpaddingy: number;
  setLogobgpaddingy: (padding: number) => void;
  logobgborderradius: number;
  setLogobgborderradius: (radius: number) => void;
}

const IconSettings: React.FC<IconSettingsProps> = ({
  icon,
  setIcon,
  iconSize,
  setIconSize,
  iconColor,
  setIconColor,
  offsetColorlogo,
  setoffsetColorlogo,
  offsetX,
  setOffsetX,
  offsetY,
  setOffsetY,
  blur,
  setBlur,
  logobgcolor,
  setLogobgcolor,
  logobgpaddingx,
  setLogobgpaddingx,
  logobgpaddingy,
  setLogobgpaddingy,
  logobgborderradius,
  setLogobgborderradius,
}) => {
  const handleTurnOffOffset = () => {
    setOffsetX(0);
    setOffsetY(0);
    setBlur(0);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const combinedIcons = useMemo(() => [...faIcons, ...mdiIcons], []);

  const filteredIcons = useMemo(
    () => combinedIcons.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm, combinedIcons]
  );

  const handleMakeTransparent = () => {
    setLogobgcolor('rgba(0, 0, 0, 0)');
  };

  const renderDivider = () => (
    <hr className="my-6 border-t border-gray-200" />
  );

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Icon Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600 mb-2">Icon</label>
        <CustomDropdown 
          icons={filteredIcons} 
          onChange={setIcon} 
          iconSize={iconSize} 
          iconColor={iconColor}
        />
        <div className="mt-2 flex items-center space-x-2 bg-gray-50 p-2">
          {icon.library === 'FontAwesome' ? (
            <FontAwesomeIcon icon={icon.icon} style={{ fontSize: `${iconSize}px`, color: iconColor, filter: `drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${offsetColorlogo})` }} />
          ) : (
            <Icon path={icon.icon} size={iconSize / 24} color={iconColor} style={{ filter: `drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${offsetColorlogo})` }} />
          )}
          <span className="text-sm text-gray-600">{icon.name}</span>
        </div>
      </div>

      {renderDivider()}

      {/* Icon Size */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600 mb-2">Size</label>
        <div className="flex items-center space-x-4">
          <input 
            type="number" 
            className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            min="12" 
            max="100" 
            step="2" 
            value={iconSize} 
            onChange={(e) => setIconSize(Number(e.target.value))}
          />
          <span className="text-sm text-gray-600">{iconSize}px</span>
        </div>
      </div>

      {renderDivider()}

      {/* Logo Background Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Logo Background</h4>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Color</label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={logobgcolor === 'rgba(0, 0, 0, 0)' ? '#ffffff' : logobgcolor}
              onChange={(e) => setLogobgcolor(e.target.value)}
              className="w-full h-10 p-0 border-none cursor-pointer"
            />
            <button
              onClick={handleMakeTransparent}
              className="py-2 px-4 bg-gray-200 text-indigo-700 hover:bg-gray-300 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Make Transparent
            </button>
          </div>
          {logobgcolor === 'rgba(0, 0, 0, 0)' && (
            <p className="mt-1 text-sm text-gray-500">Background is currently transparent</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Padding (Inline)</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="50"
              value={logobgpaddingx}
              onChange={(e) => setLogobgpaddingx(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{logobgpaddingx}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Padding (Block)</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="50"
              value={logobgpaddingy}
              onChange={(e) => setLogobgpaddingy(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{logobgpaddingy}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Border Radius</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="50"
              value={logobgborderradius}
              onChange={(e) => setLogobgborderradius(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-sm text-gray-600">{logobgborderradius}px</span>
          </div>
        </div>
      </div>

      {renderDivider()}

      {/* Shadow Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Shadow</h4>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Offset X</label>
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Offset Y</label>
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Color</label>
          <input
            type="color"
            className="w-full h-10 p-0 border-none cursor-pointer"
            value={offsetColorlogo}
            onChange={(e) => setoffsetColorlogo(e.target.value)}
          />
        </div>

        <button
          onClick={handleTurnOffOffset}
          className="w-full py-2 px-4 bg-red-400 text-white hover:bg-red-500 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Turn Off Shadow
        </button>
      </div>

      {renderDivider()}

      {/* Icon Color */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600 mb-2">Icon Color</label>
        <input
          type="color"
          className="w-full h-10 p-0 border-none cursor-pointer"
          value={iconColor}
          onChange={(e) => setIconColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default IconSettings;