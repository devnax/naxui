import * as CSS from 'csstype'
import { CSSObject } from 'naxcss'
import { ComponentType } from 'react';
import { BreakPointsType } from '../../styles/theme';
import { ColorsRefTypes, BreakpointRefTypes, ShadowRefTyeps } from '../../styles/theme/types/referenceTypes';

type ValutType<T extends keyof CSS.Properties> = CSS.Properties[T] | BreakPointsType | number




export type PropsFormateType = {
   bgColor?: ValutType<'background'> | ColorsRefTypes;
   bgImage?: ValutType<'backgroundImage'>;
   bgSize?: ValutType<'backgroundSize'>;
   bgPosition?: ValutType<'backgroundPosition'>;
   bgRepeat?: ValutType<'backgroundRepeat'>;
   bg?: ValutType<'background'> | ColorsRefTypes;
   p?: ValutType<'padding'>;
   pt?: ValutType<'padding'>;
   pr?: ValutType<'padding'>;
   pb?: ValutType<'padding'>;
   pl?: ValutType<'padding'>;
   px?: ValutType<'padding'>;
   py?: ValutType<'margin'>;
   m?: ValutType<'margin'>;
   mt?: ValutType<'margin'>;
   mr?: ValutType<'margin'>;
   mb?: ValutType<'margin'>;
   ml?: ValutType<'margin'>;
   mx?: ValutType<'margin'>;
   my?: ValutType<'margin'>;
   size?: ValutType<'width'>;
   radius?: ValutType<'borderRadius'>;
   shadow?: ValutType<'boxShadow'> | ShadowRefTyeps;
   w?: ValutType<"width">;
   h?: ValutType<"height">;
   maxw?: ValutType<"width"> | BreakpointRefTypes;
   minw?: ValutType<"width"> | BreakpointRefTypes;
   maxh?: ValutType<"height">;
   minh?: ValutType<"height">;
   flexBox?: boolean;
   direction?: ValutType<"flexDirection">;
   flexRow?: boolean;
   flexColumn?: boolean;
   flexWraped?: boolean;
   justifyStart?: boolean;
   justifyEnd?: boolean;
   justifyCenter?: boolean;
   justifyBetween?: boolean;
   justifyAround?: boolean;
   justifyEvenly?: boolean;
   itemsStart?: boolean;
   itemsEnd?: boolean;
   itemsCenter?: boolean;
   itemsStretch?: boolean;
   itemsBetween?: boolean;
   itemsAround?: boolean;
   contentStart?: boolean;
   contentEnd?: boolean;
   contentCenter?: boolean;
   contentStretch?: boolean;
   contentBetween?: boolean;
   contentAround?: boolean;


   color?: ValutType<'color'> | ColorsRefTypes;
   width?: ValutType<'width'> | BreakpointRefTypes;
   height?: ValutType<'height'> | BreakpointRefTypes;
   border?: ValutType<'border'>;
   borderColor?: ValutType<'backgroundColor'> | ColorsRefTypes;
   cursor?: ValutType<'cursor'>;
   userSelect?: ValutType<"userSelect">;
   opacity?: ValutType<"opacity">;

   fontFamily?: ValutType<"fontFamily">;
   fontSize?: ValutType<"fontSize">;
   fontWeight?: ValutType<"fontWeight">;
   lineHeight?: ValutType<"lineHeight">;
   letterSpacing?: ValutType<"letterSpacing">;
   textAlign?: ValutType<"textAlign">;
   fontStyle?: ValutType<"fontStyle">;

   minWidth?: ValutType<"minWidth"> | BreakpointRefTypes;
   maxWidth?: ValutType<"maxWidth"> | BreakpointRefTypes;
   minHeight?: ValutType<"minHeight">;
   maxHeight?: ValutType<"maxHeight">;
   display?: ValutType<"display">;
   verticalAlign?: ValutType<"verticalAlign">;
   overflow?: ValutType<"overflow">;
   overflowX?: ValutType<"overflowX">;
   overflowY?: ValutType<"overflowY">;

   alignItems?: ValutType<'alignItems'>;
   alignContent?: ValutType<'alignContent'>;
   justifyItems?: ValutType<'justifyItems'>;
   justifyContent?: ValutType<'justifyContent'>;
   flexWrap?: ValutType<'flexWrap'>;
   flexDirection?: ValutType<'flexDirection'>;
   flex?: ValutType<'flex'>;
   flexGrow?: ValutType<'flexGrow'>;
   flexShrink?: ValutType<'flexShrink'>;
   flexBasis?: ValutType<'flexBasis'>;
   justifySelf?: ValutType<'justifySelf'>;
   alignSelf?: ValutType<'alignSelf'>;
   order?: ValutType<'order'>;

   position?: ValutType<"position">;
   zIndex?: ValutType<"zIndex">;
   top?: ValutType<"top">;
   right?: ValutType<"right">;
   bottom?: ValutType<"bottom">;
   left?: ValutType<"left">;
   visibility?: ValutType<"visibility">;
}


export interface UsePropsReturnType {
   css: Partial<PropsFormateType>;
   props: { [key: string]: any };
   component?: keyof HTMLElementTagNameMap | ComponentType;
}
export type ObjectType = { [key: string]: any }

export type UsePropsType<T extends ObjectType> = Partial<PropsFormateType> & T & {
   sx?: CSSObject<{}>;
   hover?: CSSObject<{}>;
   className?: string;
   baseClass?: string;
   component?: keyof HTMLElementTagNameMap | ComponentType
}
