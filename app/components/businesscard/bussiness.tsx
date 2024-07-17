"use client";
import React, { useState, useRef, useCallback, useEffect, createContext, useContext } from 'react';
import html2canvas from 'html2canvas';
import CardPreview from './cardpreview';
import CardEditor from './busniesssettings';
import { CardElement } from '../types';
import { generateCreativeProfessionalBackground, svgTemplates } from './svgbg';
import domtoimage from 'dom-to-image';


const uniqueId = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const useHistory = <T,>(initialState: T) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<T[]>([initialState]);

  const setState = (action: T | ((prevState: T) => T)) => {
    const newState = typeof action === 'function' ? (action as Function)(history[index]) : action;
    if (index < history.length - 1) {
      setHistory(history.slice(0, index + 1));
    }
    setHistory(prevHistory => [...prevHistory, newState]);
    setIndex(prevIndex => prevIndex + 1);
  };

  const undo = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const redo = useCallback(() => setIndex(i => Math.min(history.length - 1, i + 1)), [history.length]);

  return [history[index], setState, undo, redo] as const;
};

interface IconType {
  name: string;
  library: 'FontAwesome' | 'MDI';
  icon: React.ComponentType;

}

interface CardSide {
  elements: CardElement[];
  backgroundImage: string | null;
  backgroundColor: string;
  overlayColor: string;
  overlayOpacity: number;
}

interface BusinessCardState {
  front: CardSide;
  back: CardSide;
  language: 'english' | 'arabic';

}

interface BusinessCardContextType {
  state: BusinessCardState;
  setState: (action: BusinessCardState | ((prevState: BusinessCardState) => BusinessCardState)) => void;
  undo: () => void;
  redo: () => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  activeSide: 'front' | 'back';
  setActiveSide: (side: 'front' | 'back') => void;
}

interface ColorPattern {
  name: string;
  colors: {
    r: number;
    g: number;
    b: number;
  }[];
}

interface ModularBusinessCardStudioProps {
  mode: 'preview' | 'editor';
  colorPattern: ColorPattern;
  LogoDisplay: React.ComponentType<any>; // Add this line

}

const BusinessCardContext = createContext<BusinessCardContextType | null>(null);

const BusinessCardProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [state, setState, undo, redo] = useHistory<BusinessCardState>({
    front: {
      elements: [],
      backgroundImage: null,
      backgroundColor: '#ffffff',
      overlayColor: '#000000',
      overlayOpacity: 0
    },
    back: {
      elements: [],
      backgroundImage: null,
      backgroundColor: '#ffffff',
      overlayColor: '#000000',
      overlayOpacity: 0
    },
    language: 'english'
  });
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

  return (
    <BusinessCardContext.Provider value={{ state, setState, undo, redo, selectedElement, setSelectedElement, activeSide, setActiveSide }}>
      {children}
    </BusinessCardContext.Provider>
  );
};

const useBusinessCard = () => {
  const context = useContext(BusinessCardContext);
  if (!context) {
    throw new Error('useBusinessCard must be used within a BusinessCardProvider');
  }
  return context;
};

const ModularBusinessCardStudio: React.FC<ModularBusinessCardStudioProps> = ({ mode, colorPattern, LogoDisplay }) => {
  const { state, setState, undo, redo, selectedElement, setSelectedElement, activeSide, setActiveSide } = useBusinessCard();
  const [selectedTemplate, setSelectedTemplate] = useState(svgTemplates[0].id);

  const {  language } = state;
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [logoScale, setLogoScale] = useState(0.3);
  const updateLogoScale = (scale: number) => {
    setLogoScale(scale);
  };

  useEffect(() => {
    const selectedSvgTemplate = svgTemplates.find(template => template.id === selectedTemplate);
    if (selectedSvgTemplate) {
      const newBackground = generateCreativeProfessionalBackground(colorPattern, selectedSvgTemplate);
    setState(prevState => {
      const updateElementsWithNewColors = (elements: CardElement[]) => {
        const [bgColor] = colorPattern.colors;
        
        const isLightColor = (color: { r: number, g: number, b: number }) => {
          const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
          return luminance > 0.5;
        };
      
        const determineTextColor = (bgColor: { r: number, g: number, b: number }) => {
          return isLightColor(bgColor) ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
        };
      
        const defaultColor = determineTextColor(bgColor);
        const outlineColor = isLightColor(bgColor) ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
      
        return elements.map(element => {
          if (element.type === 'text' || element.type === 'shape' || element.type === 'qrcode') {
            return {
              ...element,
              props: {
                ...element.props,
                color: defaultColor,
                offsetColor: outlineColor,
                offsetX: 0,
                offsetY: 0,
                blur: 4,
                letterSpacing: 0.5,
                opacity: 1,
                textDecoration: `4px 0 0 ${outlineColor}`,
              },
            };
          }
          return element;
        });
      };


      const frontElements = prevState.front.elements.length > 0
        ? updateElementsWithNewColors(prevState.front.elements)
        : createDefaultCardElements(colorPattern, 'front', prevState.language);
  
      const backElements = prevState.back.elements.length > 0
        ? updateElementsWithNewColors(prevState.back.elements)
        : createDefaultCardElements(colorPattern, 'back', prevState.language);
  
      return {
        ...prevState,
        front: {
          ...prevState.front,
          elements: frontElements,
          backgroundImage: newBackground,
          backgroundColor: `rgb(${Math.round(colorPattern.colors[0].r * 255)}, ${Math.round(colorPattern.colors[0].g * 255)}, ${Math.round(colorPattern.colors[0].b * 255)})`,
        },
        back: {
          ...prevState.back,
          elements: backElements,
          backgroundImage: newBackground,
          backgroundColor: `rgb(${Math.round(colorPattern.colors[0].r * 255)}, ${Math.round(colorPattern.colors[0].g * 255)}, ${Math.round(colorPattern.colors[0].b * 255)})`,
        }
      };
    });
 } }, [colorPattern, language,selectedTemplate]);

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value);
  };


  const createDefaultCardElements = (colorPattern: ColorPattern, side: 'front' | 'back', lang: 'english' | 'arabic'): CardElement[] => {
    const [bgColor] = colorPattern.colors;
  
    // Convert RGB to HSL
    const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s, l = (max + min) / 2;
  
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [h, s, l];
    };
  
    const [hue, saturation, lightness] = rgbToHsl(bgColor.r, bgColor.g, bgColor.b);
  
    // Determine text and outline colors based on background
    const determineColors = (): { textColor: string, outlineColor: string } => {
      if (lightness > 0.8) {
        // Very light background
        return { textColor: 'rgb(0, 0, 0)', outlineColor: 'rgba(255, 255, 255, 0.5)' };
      } else if (lightness < 0.2) {
        // Very dark background
        return { textColor: 'rgb(255, 255, 255)', outlineColor: 'rgba(0, 0, 0, 0.5)' };
      } else if (saturation < 0.15) {
        // Low saturation (close to grayscale)
        return lightness > 0.5 
          ? { textColor: 'rgb(0, 0, 0)', outlineColor: 'rgba(255, 255, 255, 0.5)' }
          : { textColor: 'rgb(255, 255, 255)', outlineColor: 'rgba(0, 0, 0, 0.5)' };
      } else {
        // Colorful background
        const complementaryHue = (hue + 0.5) % 1;
        const textHsl = `hsl(${complementaryHue * 360}, 100%, ${lightness > 0.5 ? 0 : 100}%)`;
        const outlineHsl = `hsla(${complementaryHue * 360}, 100%, ${lightness > 0.5 ? 100 : 0}%, 0.5)`;
        return { textColor: textHsl, outlineColor: outlineHsl };
      }
    };
  
    const { textColor, outlineColor } = determineColors();
    
    const createTextElement = (content: string, x: number, y: number, fontSize: number, fontWeight: string = 'normal', fontStyle: string = 'normal'): CardElement => ({
      id: uniqueId(),
      type: 'text',
      props: {
        content,
        x,
        y,
        fontSize,
        fontWeight,
        fontStyle,
        color: textColor,
        fontFamily: 'Arial, sans-serif',
        scale: 1,
        offsetColor: outlineColor,
        offsetX: 0,
        offsetY: 0,
        blur: 4,
        letterSpacing: 0.5,
        opacity: 1,
        textDecoration: `4px 0 0 ${outlineColor}`, // Stroke effect
      },
    });
  
    // Rest of the function remains the same...
    const defaultElements: CardElement[] = [
      {
        id: uniqueId(),
        type: 'logo',
        props: {
          x: 5,
          y: 5,
          width: 100,
          height: 100,
          scale: 0.3,
          content: ''
        },
      },
    ];
  
    if (side === 'front') {
      if (lang === 'english') {
        return [
          ...defaultElements,
          createTextElement('DANI MARTINEZ', 52, 6.2, 18, 'bold'),
          createTextElement('FINANCE MANAGER', 52, 18.64, 13, 'normal', 'italic'),
          createTextElement('123-456-7890', 5, 54, 11),
          createTextElement('hello@reallygreatsite.com', 5, 83, 11),
          createTextElement('www.reallygreatsite.com', 5, 63, 11),
          createTextElement('123 Anywhere St., Any City, ST 12345', 5, 73, 11),
        ];
      } else {
        return [
          ...defaultElements,
          createTextElement('داني مارتينيز', 64, 24, 20, 'bold'),
          createTextElement('مدير مالي', 75.3, 39, 16, 'normal', 'italic'),
          createTextElement('٧٨٩٠-٤٥٦-١٢٣', 75.8, 57.0417, 11),
          createTextElement('hello@reallygreatsite.com', 53, 83, 11),
          createTextElement('www.reallygreatsite.com', 56, 65, 11),
          createTextElement('١٢٣ شارع في أي مكان، أي مدينة، ١٢٣٤٥', 38, 73, 11),
        ];
      }
    } else {
      if (lang === 'english') {
        return [
          createTextElement('About Us', 5, 15, 18, 'bold'),
          createTextElement('We specialize in financial management and consulting.', 5, 30, 10),
        ];
      } else {
        return [
          createTextElement('معلومات عنا', 69, 13, 18, 'bold'),
          createTextElement('.نحن متخصصون في الإدارة المالية والاستشارات', 23.5, 30, 12),
        ];
      }
    }
  };


  const toggleLanguage = () => {
    setState(prevState => ({
      ...prevState,
      language: prevState.language === 'english' ? 'arabic' : 'english',
      front: {
        ...prevState.front,
        elements: createDefaultCardElements(colorPattern, 'front', prevState.language === 'english' ? 'arabic' : 'english'),
      },
      back: {
        ...prevState.back,
        elements: createDefaultCardElements(colorPattern, 'back', prevState.language === 'english' ? 'arabic' : 'english'),
      }
    }));
    setSelectedElement(null);  // Add this line to deselect the current element
  };
 
  const addElement = (type: CardElement['type']) => {
    const newElement: CardElement = {
        id: uniqueId(),
        type,
        props: {
          content: type === 'text' ? 'New Text' : '',
          x: 0,
          y: 0,
          width: type === 'text' ? undefined : 100,
          height: type === 'text' ? undefined : 100,
          fontSize: 16,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          color: '#000000',
          backgroundColor: type === 'shape' ? '#0066cc' : undefined,
          borderRadius: type === 'shape' ? 0 : undefined,
          src: type === 'image' ? 'https://via.placeholder.com/150' : undefined,
          qrBackground: '#ffffff',
          size: 100,
          rotation: 0,
          opacity: 1,
          letterSpacing: 0,
          offsetColor: 'transparent',
          offsetX: 0,
          offsetY: 0,
          blur: 0,
          iconPosition: 'left',
          iconSize: 21,
          iconColor: '#000000',
          scale: 0.3
        },
    };
    
    if (type === 'logo') {
      newElement.props = {
        ...newElement.props,
        width: 100,  // default width for logo
        height: 100, // default height for logo
      };
    }
     
  
    setState(prevState => ({
      ...prevState,
      [activeSide]: {
        ...prevState[activeSide],
        elements: [...prevState[activeSide].elements, newElement]
      }
    }));
    setSelectedElement(newElement.id);
  };
    const updateElement = (id: string, props: Partial<CardElement['props']>) => {
      setState(prevState => ({
        ...prevState,
        [activeSide]: {
          ...prevState[activeSide],
          elements: prevState[activeSide].elements.map(el => el.id === id ? { ...el, props: { ...el.props, ...props } } : el)
        }
      }));
    };
  
    const deleteElement = (id: string) => {
      setState(prevState => ({
        ...prevState,
        [activeSide]: {
          ...prevState[activeSide],
          elements: prevState[activeSide].elements.filter(el => el.id !== id)
        }
      }));
      setSelectedElement(null);
    };
  
    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
      e.preventDefault();
      const element = state[activeSide].elements.find(el => el.id === id);
      if (element) {
        const cardRect = cardRef.current?.getBoundingClientRect();
        if (cardRect) {
          let clientX, clientY;
          if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
          } else {
            clientX = e.clientX;
            clientY = e.clientY;
          }
          const offsetX = clientX - (cardRect.left + (element.props.x / 100) * cardRect.width);
          const offsetY = clientY - (cardRect.top + (element.props.y / 100) * cardRect.height);
          setDragOffset({ x: offsetX, y: offsetY });
        }
        setDragging(true);
        setSelectedElement(id);
      }
    };
  
    const handleInteractionMove = useCallback((e: MouseEvent | TouchEvent) => {
      if (dragging && selectedElement) {
        const cardRect = cardRef.current?.getBoundingClientRect();
        if (cardRect) {
          let clientX, clientY;
          if (e instanceof TouchEvent) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
          } else {
            clientX = e.clientX;
            clientY = e.clientY;
          }
          const x = ((clientX - cardRect.left - dragOffset.x) / cardRect.width) * 100;
          const y = ((clientY - cardRect.top - dragOffset.y) / cardRect.height) * 100;
          updateElement(selectedElement, { x: Math.max(0, Math.min(x, 100)), y: Math.max(0, Math.min(y, 100)) });
        }
      }
    }, [dragging, selectedElement, dragOffset, updateElement]);
  
    const handleInteractionEnd = useCallback(() => {
      setDragging(false);
    }, []);
  
    useEffect(() => {
      if (dragging) {
        window.addEventListener('mousemove', handleInteractionMove);
        window.addEventListener('mouseup', handleInteractionEnd);
        window.addEventListener('touchmove', handleInteractionMove);
        window.addEventListener('touchend', handleInteractionEnd);
      } else {
        window.removeEventListener('mousemove', handleInteractionMove);
        window.removeEventListener('mouseup', handleInteractionEnd);
        window.removeEventListener('touchmove', handleInteractionMove);
        window.removeEventListener('touchend', handleInteractionEnd);
      }
      return () => {
        window.removeEventListener('mousemove', handleInteractionMove);
        window.removeEventListener('mouseup', handleInteractionEnd);
        window.removeEventListener('touchmove', handleInteractionMove);
        window.removeEventListener('touchend', handleInteractionEnd);
      };
    }, [dragging, handleInteractionMove, handleInteractionEnd]);

    const exportToImage = async () => {
      const node = cardRef.current;
      if (node) {
        const scale = 5; // Increase resolution
        const style = {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${node.offsetWidth}px`,
          height: `${node.offsetHeight}px`,
        };
    
        const param = {
          height: node.offsetHeight * scale,
          width: node.offsetWidth * scale,
          quality: 1,
          style
        };
    
        try {
          let dataUrl;
          if (state[activeSide].backgroundImage && state[activeSide].backgroundImage.trim().startsWith('<svg')) {
            // If the background is an SVG, use html2canvas
            const canvas = await html2canvas(node, {
              scale: scale,
              useCORS: true,
              backgroundColor: null,
            });
            dataUrl = canvas.toDataURL('image/png');
          } else {
            // For other cases, use domtoimage
            dataUrl = await domtoimage.toPng(node, param);
          }
    
          const link = document.createElement('a');
          link.download = `business-card-${activeSide}.png`;
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.error('Error exporting image:', error);
        }
      }
    };
    return (
      <div className="w-full h-full">
        {mode === 'preview' ? (
          <div className="w-full h-full flex flex-col items-center justify-center ">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                onClick={() => setActiveSide('front')}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSide === 'front'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setActiveSide('back')}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSide === 'back'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
                }`}
              >
                Back
              </button>
              <div className=" w-px bg-gray-300 mx-2"></div>

              <button
                onClick={toggleLanguage}
                className="px-4 py-2 text-sm font-medium bg-gray-200 text-indigo-700 hover:bg-gray-300 transition-colors duration-200"
              >
                {language === 'english' ? 'Switch to Arabic' : 'Switch to English'}
              </button>
              <div className="divider w-px bg-gray-300 mx-2"></div>

              <select
                value={selectedTemplate}
                onChange={handleTemplateChange}
                className="px-4 py-2 text-sm font-medium bg-gray-200 text-indigo-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {svgTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.id}
                  </option>
                ))}
              </select>
            </div>
            <CardPreview
  logoScale={logoScale}
  elements={state[activeSide].elements}
  backgroundImage={state[activeSide].backgroundImage}
  backgroundColor={state[activeSide].backgroundColor}
  overlayColor={state[activeSide].overlayColor}
  overlayOpacity={state[activeSide].overlayOpacity}
  cardRef={cardRef}  // Make sure this prop is passed
  handleInteractionStart={handleInteractionStart}
  selectedElement={selectedElement}
  dragging={dragging}
  wavyBackgroundSVG={state[activeSide].backgroundImage}
  LogoDisplay={LogoDisplay}
/>
            <button
              onClick={exportToImage}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Export as Image
            </button>
          </div>
        ) : (
          <div className="w-full h-full">
            <CardEditor
              updateLogoScale={updateLogoScale}
              elements={state[activeSide].elements}
              backgroundImage={state[activeSide].backgroundImage}
              backgroundColor={state[activeSide].backgroundColor}
              overlayColor={state[activeSide].overlayColor}
              overlayOpacity={state[activeSide].overlayOpacity}
              addElement={addElement}
              updateElement={updateElement}
              deleteElement={deleteElement}
              setState={(action) => setState((prevState) => ({
                ...prevState,
                [activeSide]: action(prevState[activeSide])
              }))}
              undo={undo}
              redo={redo}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              colorPattern={colorPattern}
            />
          </div>
        )}
      </div>
    );
  }
  
  export const BusinessCardProvider = BusinessCardProviderComponent;
  export { ModularBusinessCardStudio };