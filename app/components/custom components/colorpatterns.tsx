import React from 'react';

interface ColorPattern {
  name: string;
  colors: { r: number; g: number; b: number }[];
}

interface ColorPatternSettingsProps {
  colorPatterns: ColorPattern[];
  selectedPattern: ColorPattern;
  onPatternChange: (pattern: ColorPattern) => void;
}

const ColorPatternSettings: React.FC<ColorPatternSettingsProps> = ({
  colorPatterns,
  selectedPattern,
  onPatternChange,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Color Patterns</h2>
      <div className="grid grid-cols-2 gap-4">
        {colorPatterns.map((pattern) => (
          <button
            key={pattern.name}
            className={`p-2 rounded-md border ${
              selectedPattern.name === pattern.name
                ? 'border-blue-500'
                : 'border-gray-300'
            }`}
            onClick={() => onPatternChange(pattern)}
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium ">{pattern.name}</span>
              <div className="flex">
                {pattern.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full ml-1"
                    style={{
                      backgroundColor: `rgb(${color.r * 255}, ${color.g * 255}, ${
                        color.b * 255
                      })`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="h-8 w-full rounded-sm overflow-hidden flex">
              {pattern.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1"
                  style={{
                    backgroundColor: `rgb(${color.r * 255}, ${color.g * 255}, ${
                      color.b * 255
                    })`,
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPatternSettings;