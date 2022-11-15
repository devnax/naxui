import { useMemo, HTMLAttributes } from 'react'
import * as CSS from 'csstype'
import { AliasesPops, CSSObject } from 'naxcss'
import useSX from './useSX'

export type PropsFormateType = AliasesPops & {
   width: CSS.Properties['width'];
   height: CSS.Properties['height'];
   border: CSS.Properties['border'];
   borderColor: CSS.Properties['backgroundColor'];
   cursor: CSS.Properties['cursor'];
   userSelect: CSS.Properties["userSelect"];
   opacity: CSS.Properties["opacity"];

   fontFamily: CSS.Properties["fontFamily"];
   fontSize: CSS.Properties["fontSize"];
   fontWeight: CSS.Properties["fontWeight"];
   lineHeight: CSS.Properties["lineHeight"];
   letterSpacing: CSS.Properties["letterSpacing"];
   textAlign: CSS.Properties["textAlign"];
   fontStyle: CSS.Properties["fontStyle"];

   minWidth: CSS.Properties["minWidth"];
   maxWidth: CSS.Properties["maxWidth"];
   minHeight: CSS.Properties["minHeight"];
   maxHeight: CSS.Properties["maxHeight"];
   display: CSS.Properties["display"];
   verticalAlign: CSS.Properties["verticalAlign"];
   overflow: CSS.Properties["overflow"];
   overflowX: CSS.Properties["overflowX"];
   overflowY: CSS.Properties["overflowY"];

   alignItems: CSS.Properties['alignItems'];
   alignContent: CSS.Properties['alignContent'];
   justifyItems: CSS.Properties['justifyItems'];
   justifyContent: CSS.Properties['justifyContent'];
   flexWrap: CSS.Properties['flexWrap'];
   flexDirection: CSS.Properties['flexDirection'];
   flex: CSS.Properties['flex'];
   flexGrow: CSS.Properties['flexGrow'];
   flexShrink: CSS.Properties['flexShrink'];
   flexBasis: CSS.Properties['flexBasis'];
   justifySelf: CSS.Properties['justifySelf'];
   alignSelf: CSS.Properties['alignSelf'];
   order: CSS.Properties['order'];

   position: CSS.Properties["position"];
   zIndex: CSS.Properties["zIndex"];
   top: CSS.Properties["top"];
   right: CSS.Properties["right"];
   bottom: CSS.Properties["bottom"];
   left: CSS.Properties["left"];
   visibility: CSS.Properties["visibility"];

} | { [key: string]: any }


interface Return {
   css: Partial<PropsFormateType>;
   props: { [key: string]: any };
   className: string;
}

export interface DefaultPropsType<T extends HTMLElement> extends HTMLAttributes<T> {
   sx?: CSSObject;
   hover?: CSSObject;
}

const cssProperties = [
   "bgcolor",
   "bgimage",
   "bgsize",
   "bgposition",
   "bgrepeat",
   "bg",
   "p",
   "pt",
   "pr",
   "pb",
   "pl",
   "px",
   "py",
   "m",
   "mt",
   "mr",
   "mb",
   "ml",
   "mx",
   "my",
   "size",
   "radius",
   "shadow",
   "width",
   "height",
   "border",
   "borderColor",
   "cursor",
   "userSelect",
   "opacity",

   "fontFamily",
   "fontSize",
   "fontWeight",
   "lineHeight",
   "letterSpacing",
   "textAlign",
   "fontStyle",

   "minWidth",
   "maxWidth",
   "minHeight",
   "maxHeight",
   "display",
   "verticalAlign",
   "overflow",
   "overflowX",
   "overflowY",

   "alignItems",
   "alignContent",
   "justifyItems",
   "justifyContent",
   "flexWrap",
   "flexDirection",
   "flex",
   "flexGrow",
   "flexShrink",
   "flexBasis",
   "justifySelf",
   "alignSelf",
   "order",

   "position",
   "zIndex",
   "top",
   "right",
   "bottom",
   "left",
   "visibility"
]

const useProps = <T extends HTMLElement>(props: Partial<DefaultPropsType<T> & PropsFormateType>): Return => {

   const { sx, hover, ...rest } = props

   const formate = useMemo(() => {
      const _css: any = {}
      const _props: any = {}
      for (let pk in rest) {
         if (cssProperties.includes(pk)) {
            _css[pk] = (rest as any)[pk]
         } else {
            _props[pk] = (rest as any)[pk]
         }
      }
      return {
         css: _css,
         props: _props
      }
   }, Object.values(props))
   const _css: any = {
      ...formate.css,
      ...sx
   }
   if (hover) {
      _css["&:hover"] = hover
   }
   const className = useSX(_css)

   return {
      ...formate,
      className
   }
}
export default useProps




