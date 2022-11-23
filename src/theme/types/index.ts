import { ThemeComponentsProps } from './Components'
export * from './Components'
export * from './referenceTypes'
export type ThemeName = string;

export type Color = {
   light: string;
   dark: string;
   main: string;
   text: string;
}

export interface ThemeColorsProps {
   background: {
      paper: string;
      default: string;
   };
   grey: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
   };
   primary: Color;
   secondary: Color;
   success: Color;
   error: Color;
   warning: Color;
   text: {
      primary: string;
      secondary: string;
      disabled: string;
   };
   divider: Omit<Color, 'text'>;
}


export interface ThemeShadoeProps {
   1: string;
   2: string;
   3: string;
   4: string;
   5: string;
   6: string;
   7: string;
   8: string;
   9: string;
   10: string;
}

export interface ThemeRadiusProps {
   1: number;
   2: number;
   3: number;
   4: number;
   5: number;
}

export type TextStyleProps = {
   fontSize?: string | number;
   fontWeight?: number;
   fontFamily?: string;
   color?: string;
   lineHeight?: string | number;
   letterSpacing?: string | number;
}

export interface ThemeTypographyProps {
   body: TextStyleProps;
   subtitle: TextStyleProps;
   button: TextStyleProps;
   h1: TextStyleProps;
   h2: TextStyleProps;
   h3: TextStyleProps;
   h4: TextStyleProps;
   h5: TextStyleProps;
   h6: TextStyleProps;
}

export interface ThemeBreakPointsType {
   xs: number;
   sm: number;
   md: number;
   lg: number;
   xl: number;
};

export interface ThemeProps {
   breakpoints: ThemeBreakPointsType;
   typography: ThemeTypographyProps;
   colors: ThemeColorsProps;
   shadow: ThemeShadoeProps;
   space: (n: number) => number;
   componenets: ThemeComponentsProps;
   radius: ThemeRadiusProps
}


export type BreakPointsType = Partial<{ [key in keyof ThemeBreakPointsType]: number }>
