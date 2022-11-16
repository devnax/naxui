import * as CSS from 'csstype'
import { CSSObject } from 'naxcss'
import { ThemeBreakPointsType } from '../../styles/theme';
import { ColorsRefTypes, BreakpointRefTypes, ShadowRefTyeps } from '../../styles/theme/types/referenceTypes';

type BreakPoint = Partial<{ [key in keyof ThemeBreakPointsType]: number }>
type ValutType<T extends keyof CSS.Properties> = CSS.Properties[T] | BreakPoint | number


export type PropsFormateType = {
   bgcolor: ValutType<'background'> | ColorsRefTypes;
   bgimage: ValutType<'background'>;
   bgsize: ValutType<'backgroundSize'>;
   bgposition: ValutType<'backgroundPosition'>;
   bgrepeat: ValutType<'backgroundRepeat'>;
   bg: ValutType<'background'> | ColorsRefTypes;
   p: ValutType<'padding'>;
   pt: ValutType<'padding'>;
   pr: ValutType<'padding'>;
   pb: ValutType<'padding'>;
   pl: ValutType<'padding'>;
   px: ValutType<'padding'>;
   py: ValutType<'margin'>;
   m: ValutType<'margin'>;
   mt: ValutType<'margin'>;
   mr: ValutType<'margin'>;
   mb: ValutType<'margin'>;
   ml: ValutType<'margin'>;
   mx: ValutType<'margin'>;
   my: ValutType<'margin'>;
   radius: ValutType<'borderRadius'>;
   shadow: ShadowRefTyeps | ValutType<'boxShadow'>;

   color: ValutType<'color'> | ColorsRefTypes;
   width: BreakpointRefTypes | ValutType<'width'>;
   height: BreakpointRefTypes | ValutType<'height'>;
   border: ValutType<'border'>;
   borderColor: ValutType<'backgroundColor'> | ColorsRefTypes;
   cursor: ValutType<'cursor'>;
   userSelect: ValutType<"userSelect">;
   opacity: ValutType<"opacity">;

   fontFamily: ValutType<"fontFamily">;
   fontSize: ValutType<"fontSize">;
   fontWeight: ValutType<"fontWeight">;
   lineHeight: ValutType<"lineHeight">;
   letterSpacing: ValutType<"letterSpacing">;
   textAlign: ValutType<"textAlign">;
   fontStyle: ValutType<"fontStyle">;

   minWidth: ValutType<"minWidth">;
   maxWidth: ValutType<"maxWidth">;
   minHeight: ValutType<"minHeight">;
   maxHeight: ValutType<"maxHeight">;
   display: ValutType<"display">;
   verticalAlign: ValutType<"verticalAlign">;
   overflow: ValutType<"overflow">;
   overflowX: ValutType<"overflowX">;
   overflowY: ValutType<"overflowY">;

   alignItems: ValutType<'alignItems'>;
   alignContent: ValutType<'alignContent'>;
   justifyItems: ValutType<'justifyItems'>;
   justifyContent: ValutType<'justifyContent'>;
   flexWrap: ValutType<'flexWrap'>;
   flexDirection: ValutType<'flexDirection'>;
   flex: ValutType<'flex'>;
   flexGrow: ValutType<'flexGrow'>;
   flexShrink: ValutType<'flexShrink'>;
   flexBasis: ValutType<'flexBasis'>;
   justifySelf: ValutType<'justifySelf'>;
   alignSelf: ValutType<'alignSelf'>;
   order: ValutType<'order'>;

   position: ValutType<"position">;
   zIndex: ValutType<"zIndex">;
   top: ValutType<"top">;
   right: ValutType<"right">;
   bottom: ValutType<"bottom">;
   left: ValutType<"left">;
   visibility: ValutType<"visibility">;
   cl: CSS.Properties["background"] | ColorsRefTypes | BreakPoint
}


export interface UsePropsReturnType {
   css: Partial<PropsFormateType>;
   props: { [key: string]: any };
   className: string;
}
export type ObjectType = { [key: string]: any }

export type UsePropsType<T extends ObjectType> = Partial<PropsFormateType> & T & {
   sx?: CSSObject;
   hover?: CSSObject;
   className?: string;
}
