export type ThemeName = string;

export type Color = {
   light: string;
   dark: string;
   main: string;
   text: string;
}

export interface ColorsProps {
   background: {
      default: string;
      paper: string;
   };
   primary: Color;
   secondary: Color;
   success: Color;
   error: Color;
   warning: Color;
   info: Color;
   text: Color;
   divider: Color;
}


export type TextStyleProps = {
   fontSize: number;
   fontWeight: number;
   fontFamily: string;
   color: string;
}

export interface ThemeProps {
   breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
   };
   text: {
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
   };
   colors: ColorsProps;
   shadow: {
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
   space: (n: number) => number;
}