import React, { RefObject } from 'react';
import Icon from '@mdi/react';

import QRCode from 'qrcode.react';
import { CardElement } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface CardPreviewProps {
  elements: CardElement[];
  backgroundImage: string | null;
  backgroundColor: string;
  overlayColor: string;
  overlayOpacity: number;
  cardRef: RefObject<HTMLDivElement>;
  handleInteractionStart: (e: React.MouseEvent | React.TouchEvent, id: string) => void;
  selectedElement: string | null;
  dragging: boolean;
  wavyBackgroundSVG?: string | null;
  LogoDisplay: React.ComponentType<any>;
  logoScale: number;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  elements,
  backgroundImage,
  backgroundColor,
  overlayColor,
  overlayOpacity,
  cardRef,
  handleInteractionStart,
  selectedElement,
  dragging,
  wavyBackgroundSVG,
  LogoDisplay,
  logoScale
}) => {
  
  const renderElement = (element: CardElement) => {
    const commonStyle = {
      transform: `rotate(${element.props.rotation || 0}deg)`,
      opacity: element.props.opacity || 1,
    };
    if (element.type === 'logo') {
      return (
        <div style={{
          position: 'absolute',
          left: `${element.props.x}%`,
          top: `${element.props.y}%`,
          transform: `scale(${element.props.scale})`,
          transformOrigin: 'top left',
        }}>
          <LogoDisplay />
        </div>
      );
    }
    
    const renderIcon = () => {
      if (!element.props.icon) return null;
      const iconSize = element.props.iconSize || element.props.fontSize || 16;
      const iconColor = element.props.iconColor || element.props.color || '#000000';
      return element.props.icon.library === 'FontAwesome' ? (
        <FontAwesomeIcon 
          icon={element.props.icon.icon} 
          style={{ fontSize: `${iconSize}px`, color: iconColor }}
        />
      ) : (
        <Icon 
          path={element.props.icon.icon} 
          size={iconSize / 24} 
          color={iconColor}
        />
      );
    };

    switch (element.type) {
      case 'text':
        const iconPosition = element.props.iconPosition || 'left';
        return (
          <div style={{ display: 'flex', alignItems: 'center', ...commonStyle }}>
            {iconPosition === 'left' && renderIcon()}
            <span style={{ marginLeft: iconPosition === 'left' ? `${element.props.iconSpacing || 0}px` : 0 }}>
              <p
                style={{
                  fontSize: `${element.props.fontSize}px`,
                  fontFamily: element.props.fontFamily,
                  fontWeight: element.props.fontWeight,
                  fontStyle: element.props.fontStyle,
                  textDecoration: element.props.textDecoration,
                  color: element.props.color,
                  letterSpacing: `${element.props.letterSpacing}px`,
                  whiteSpace: 'nowrap',
                  textShadow: `${element.props.offsetX}px ${element.props.offsetY}px ${element.props.blur}px ${element.props.offsetColor}`,
                }}
              >
                {element.props.content}
              </p>
            </span>
            {iconPosition === 'right' && (
              <span style={{ marginLeft: `${element.props.iconSpacing || 0}px` }}>
                {renderIcon()}
              </span>
            )}
          </div>
        );
      case 'icon':
        return renderIcon();
      case 'image':
        return <img src={element.props.src} alt="Card element" style={{ ...commonStyle, width: `${element.props.size}px`, height: 'auto', objectFit: 'contain' }} />;
      case 'shape':
        return <div style={{ ...commonStyle, backgroundColor: element.props.color, width: `${element.props.size}px`, height: `${element.props.size}px`, borderRadius: `${element.props.borderRadius}px` }} />;
      case 'qrcode':
        return (
          <div style={commonStyle}>
            <QRCode
              value={element.props.content}
              size={element.props.size}
              level="Q"
              includeMargin={true}
              bgColor={element.props.qrBackground || '#ffffff'}
              fgColor={element.props.color}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const backgroundStyle = () => {
    if (backgroundImage) {
      if (backgroundImage.trim().startsWith('<svg')) {
        return `url("data:image/svg+xml,${encodeURIComponent(backgroundImage)}")`;
      } else {
        return `url("${backgroundImage}")`;
      }
    }
    return 'none';
  };

  return (
    <div
      ref={cardRef}
      className="w-[3.5in] h-[2in] bg-white shadow-lg relative"
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: backgroundStyle(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {backgroundImage && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
            pointerEvents: 'none',
          }}
        />
      )}
      {elements.map(element => (
        <div
          key={element.id}
          onMouseDown={(e) => handleInteractionStart(e, element.id)}
          onTouchStart={(e) => handleInteractionStart(e, element.id)}
          className={`absolute cursor-move ${dragging && selectedElement === element.id ? 'pointer-events-none' : ''}`}
          style={{
            left: `${element.props.x}%`,
            top: `${element.props.y}%`,
            transition: dragging ? 'none' : 'all 0.2s ease-out',
          }}
        >
          {renderElement(element)}
        </div>
      ))}
    </div>
  );
};

export default CardPreview;
