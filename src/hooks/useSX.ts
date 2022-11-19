import { css, CSSObject } from 'naxcss'
import { useTheme } from '../styles/theme'
import { BreakPointsType } from '../styles/theme';

const useSX = (_css: CSSObject<{}>) => {
   const theme = useTheme()
   return css<BreakPointsType>(_css, {
      breakpoints: { ...theme.breakpoints },
      classPrefix: "nui-"
   })
}

export default useSX