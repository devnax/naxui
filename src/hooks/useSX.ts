import { css, CSSObject } from 'naxcss'
import { useTheme } from '../theme'
import { BreakPointsType } from '../theme';

const useSX = (_css: CSSObject<{}>) => {
   const theme = useTheme()
   return css<BreakPointsType>(_css, {
      breakpoints: { ...theme.breakpoints },
      classPrefix: "nui-"
   })
}

export default useSX