import { ThemeProps } from "../types"
import ThemeComponents from './components'
import typography from './typography'
import colors from './colors'

const defaultTheme: ThemeProps = {
   space: (n: number) => 8 * n,
   componenets: ThemeComponents,
   typography,
   colors,
   breakpoints: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1200
   },
   shadow: {
      1: "0 1px 2px 0 rgb(0 0 0 / 0.05);",
      2: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
      3: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
      4: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      5: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
      6: "0 25px 50px -12px rgb(0 0 0 / 0.25);",
      7: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      8: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
      9: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
      10: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px"
   },

   radius: {
      1: 8,
      2: 12,
      3: 16,
      4: 20,
      5: 24
   }

}

export default defaultTheme