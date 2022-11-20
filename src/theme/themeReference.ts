import { getTheme } from '.';
import { BreakpointRefTypes, TextRefTypes, ColorsRefTypes, ShadowRefTyeps } from './types'


type Refs = BreakpointRefTypes & TextRefTypes & ColorsRefTypes & ShadowRefTyeps


const themeReference = () => {
   const theme = getTheme()

   return {
      "breakpoints.xs": theme.breakpoints.xs,
      "breakpoints.sm": theme.breakpoints.sm,
      "breakpoints.md": theme.breakpoints.md,
      "breakpoints.lg": theme.breakpoints.lg,
      "breakpoints.xl": theme.breakpoints.xl,

      "body": theme.typography.body,
      "subtitle": theme.typography.subtitle,
      "button": theme.typography.button,
      "h1": theme.typography.h1,
      "h2": theme.typography.h2,
      "h3": theme.typography.h3,
      "h4": theme.typography.h4,
      "h5": theme.typography.h5,
      "h6": theme.typography.h6,

      "background": theme.colors.background.default,
      "background.paper": theme.colors.background.paper,

      "primary": theme.colors.primary.main,
      "primary.main": theme.colors.primary.main,
      "primary.light": theme.colors.primary.light,
      "primary.dark": theme.colors.primary.dark,
      "primary.text": theme.colors.primary.text,

      "secondary": theme.colors.secondary.main,
      "secondary.main": theme.colors.secondary.main,
      "secondary.light": theme.colors.secondary.light,
      "secondary.dark": theme.colors.secondary.dark,
      "secondary.text": theme.colors.secondary.text,

      "success": theme.colors.success.main,
      "success.main": theme.colors.success.main,
      "success.light": theme.colors.success.light,
      "success.dark": theme.colors.success.dark,
      "success.text": theme.colors.success.text,

      "error": theme.colors.error.main,
      "error.main": theme.colors.error.main,
      "error.light": theme.colors.error.light,
      "error.dark": theme.colors.error.dark,
      "error.text": theme.colors.error.text,

      "warning": theme.colors.warning.main,
      "warning.main": theme.colors.warning.main,
      "warning.light": theme.colors.warning.light,
      "warning.dark": theme.colors.warning.dark,
      "warning.text": theme.colors.warning.text,

      "text": theme.colors.text.primary,
      "text.secondary": theme.colors.text.secondary,
      "text.disabled": theme.colors.text.disabled,

      "divider": theme.colors.divider.main,
      "divider.main": theme.colors.divider.main,
      "divider.light": theme.colors.divider.light,
      "divider.dark": theme.colors.divider.dark,

      "grey.1": theme.colors.grey[1],
      "grey.2": theme.colors.grey[2],
      "grey.3": theme.colors.grey[3],
      "grey.4": theme.colors.grey[4],
      "grey.5": theme.colors.grey[5],
      "grey.6": theme.colors.grey[6],
      "grey.7": theme.colors.grey[7],
      "grey.8": theme.colors.grey[8],
      "grey.9": theme.colors.grey[9],
      "grey.10": theme.colors.grey[10],

      "shadow.1": theme.shadow[1],
      "shadow.2": theme.shadow[2],
      "shadow.3": theme.shadow[3],
      "shadow.4": theme.shadow[4],
      "shadow.5": theme.shadow[5],
      "shadow.6": theme.shadow[6],
      "shadow.7": theme.shadow[7],
      "shadow.8": theme.shadow[8],
      "shadow.9": theme.shadow[9],
      "shadow.10": theme.shadow[10],

   }
}



export const getThemeRef = (key: Refs | string, def?: any) => {
   const ref: any = themeReference()
   return ref[key] || def
}

export default themeReference