export interface IconType {
    name: string;
    library: 'FontAwesome' | 'MDI';
    icon: any;
  }



  export interface IconType {
    name: string;
    library: 'FontAwesome' | 'MDI';
    icon: any;
  }
  
  export interface CardElement {
    id: string;
    type: 'text' | 'image' | 'shape' | 'qrcode' | 'icon' | 'logo';
    props: {
      scale: number;
      iconSize?: number;
      content: string;
      x: number;
      y: number;
      width?: number;
      height?: number;
      fontSize?: number;
      fontFamily?: string;
      fontWeight?: string;
      fontStyle?: string;
      textDecoration?: string;
      color?: string;
      backgroundColor?: string;
      borderRadius?: number;
      src?: string;
      qrBackground?: string;
      size?: number;
      rotation?: number;
      opacity?: number;
      letterSpacing?: number;
      offsetColor?: string;
      offsetX?: number;
      offsetY?: number;
      blur?: number;
      icon?: IconType;
      iconPosition?: 'left' | 'right';
      iconSpacing?: number;
      iconColor?: string;
    };
  }
  
  
  export interface CardState {
    elements: CardElement[];
    layout: 'portrait' | 'landscape';
    backgroundImage: string | null;
    backgroundColor: string;
    overlayColor: string;
    overlayOpacity: number;
  }
  export interface ColorPattern {
    name: string;
    colors: {
      r: number;
      g: number;
      b: number;
    }[];
  }
  
  