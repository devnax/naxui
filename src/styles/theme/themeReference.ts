import { getTheme } from '.';

const themeReference = () => {
   const theme = getTheme()

   return {
      "breakpoints.xs": theme.breakpoints.xs,
      "breakpoints.sm": theme.breakpoints.sm,
      "breakpoints.md": theme.breakpoints.md,
      "breakpoints.lg": theme.breakpoints.lg,
      "breakpoints.xl": theme.breakpoints.xl,

      "title": theme.text.title,
      "subtitle": theme.text.subtitle,
      "pragraph": theme.text.pragraph,
      "button": theme.text.button,
      "h1": theme.text.h1,
      "h2": theme.text.h2,
      "h3": theme.text.h3,
      "h4": theme.text.h4,
      "h5": theme.text.h5,
      "h6": theme.text.h6,

      "background": theme.colors.background.main,
      "background.main": theme.colors.background.main,
      "background.light": theme.colors.background.light,
      "background.dark": theme.colors.background.dark,
      "background.text": theme.colors.background.text,

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

      "info": theme.colors.info.main,
      "info.main": theme.colors.info.main,
      "info.light": theme.colors.info.light,
      "info.dark": theme.colors.info.dark,
      "info.text": theme.colors.info.text,

      "text": theme.colors.text.main,
      "text.main": theme.colors.text.main,
      "text.light": theme.colors.text.light,
      "text.dark": theme.colors.text.dark,
      "text.text": theme.colors.text.text,

      "divider": theme.colors.divider.main,
      "divider.main": theme.colors.divider.main,
      "divider.light": theme.colors.divider.light,
      "divider.dark": theme.colors.divider.dark,
      "divider.divider": theme.colors.divider.text,


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

export default themeReference