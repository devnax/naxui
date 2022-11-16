import { css, CSSObject } from 'naxcss'
import { useTheme } from '../styles/theme'

const useSX = (_css: CSSObject) => {
   const theme = useTheme()
   return css(_css, {
      breakpoints: theme.breakpoints
   })
}

export default useSX