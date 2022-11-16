import { ThemeProps } from "../types"
import ThemeComponents from './components'
import text from './text'
import colors from './colors'

const defaultTheme: ThemeProps = {
   space: (n: number) => 8 * n,
   componenets: ThemeComponents,
   text,
   colors,
   breakpoints: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1024,
      xl: 1200
   },
   shadow: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
   },

}

export default defaultTheme