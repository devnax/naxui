import { ThemeComponentsProps } from './Components'
export * from './Components'
export type ThemeName = string;

export type Color = {
   light: string;
   dark: string;
   main: string;
   text: string;
}

export interface ThemeColorsProps {
   background: Color;
   primary: Color;
   secondary: Color;
   success: Color;
   error: Color;
   warning: Color;
   info: Color;
   text: Color;
   divider: Color;
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

export type TextStyleProps = {
   fontSize?: number;
   fontWeight?: number;
   fontFamily?: string;
   color?: string;
}

interface ThemeTextProps {
   title: TextStyleProps;
   subtitle: TextStyleProps;
   pragraph: TextStyleProps;
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
   text: ThemeTextProps;
   colors: ThemeColorsProps;
   shadow: ThemeShadoeProps;
   space: (n: number) => number;
   componenets: ThemeComponentsProps;
}