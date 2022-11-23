import { CSSObject } from 'naxcss';
import { useMemo } from 'react'
import { alpha } from '../theme';


interface VariantsType {
   [key: string]: CSSObject<any> | any
}

const useVariants = <v extends keyof VariantsType>(key: v, variants: VariantsType) => {
   return useMemo(() => variants[key], [variants])
}
export default useVariants


export type ColorVariantType =
   | "primary"
   | "primary.soft"
   | "secondary"
   | "secondary.soft"
   | "warning"
   | "warning.soft"
   | "success"
   | "success.soft"
   | "error"
   | "error.soft"

export const useColorVariants = (key: ColorVariantType): { main: string; color: string; text: string, light: string } => {
   return useVariants(key, {
      primary: {
         main: "primary",
         color: "primary",
         text: "primary.text",
         light: alpha("primary", .2)
      },
      "primary.soft": {
         main: "primary",
         color: alpha("primary", .1),
         text: "primary",
         light: alpha("primary", .2)
      },
      secondary: {
         main: "secondary",
         color: "secondary",
         text: "secondary.text",
         light: alpha("secondary", .2)
      },
      "secondary.soft": {
         main: "secondary",
         color: alpha("secondary", .1),
         text: "secondary",
         light: alpha("secondary", .2)
      },
      success: {
         main: "success",
         color: "success",
         text: "success.text",
         light: alpha("success", .2)
      },
      "success.soft": {
         main: "success",
         color: alpha("success", .1),
         text: "success",
         light: alpha("success", .2)
      },
      warning: {
         main: "warning",
         color: "warning",
         text: "warning.text",
         light: alpha("warning", .2)
      },
      "warning.soft": {
         main: "warning",
         color: alpha("warning", .1),
         text: "warning",
         light: alpha("warning", .2)
      },
      error: {
         main: "error",
         color: "error",
         text: "error.text",
         light: alpha("error", .2)
      },
      "error.soft": {
         main: "error",
         color: alpha("error", .1),
         text: "error",
         light: alpha("error", .2)
      }
   }) as any
}


export type RadiusVariantKeys = "square" | "rounded" | "circle"

export const useCornerVariants = (key: RadiusVariantKeys) => {
   return useVariants(key, {
      square: {
         radius: 0
      },
      rounded: {
         radius: 1
      },
      circle: {
         radius: 5
      }
   })
}


export type BackgroundVariantType = "filled" | "outlined" | "normal"


export const useVariantBackground = (key: BackgroundVariantType, def?: {}) => {
   return useVariants(key, {
      filled: {
         bgColor: "background.paper",
         color: "text",
         border: 0,
         borderColor: "transparent"
      },
      outlined: {
         bgColor: "transparent",
         color: "text",
         border: "1px solid",
         borderColor: "divider.light"
      },
      normal: {
         bgColor: "transparent",
         color: "text",
         border: 0,
         borderColor: "transparent"
      }
   }) || def
}