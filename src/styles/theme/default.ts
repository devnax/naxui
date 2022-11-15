import { ThemeProps } from "./types"

const defaultTheme: ThemeProps = {
   breakpoints: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1024,
      xl: 1200
   },
   text: {
      title: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      subtitle: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      pragraph: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      button: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      h1: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      h2: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      h3: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      h4: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      h5: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
      h6: {
         fontFamily: "Inter",
         fontSize: 20,
         fontWeight: 600,
         color: "#333"
      },
   },
   colors: {
      background: {
         default: "#fff",
         paper: "#eee",
      },
      primary: {
         light: "#5CD85A",
         dark: "#10A83D",
         main: "#32CD30",
         text: '#fff',
      },
      secondary: {
         light: "#ba68c8",
         dark: "#7b1fa2",
         main: '#9c27b0',
         text: '#fff',
      },
      success: {
         light: "#4caf50",
         dark: "#1b5e20",
         main: "#2e7d32",
         text: '#fff',
      },
      error: {
         light: "#ef5350",
         dark: "#c62828",
         main: '#d32f2f',
         text: '#fff',
      },
      warning: {
         light: "#ff9800",
         dark: "#e65100",
         main: "#ed6c02",
         text: '#fff',
      },
      info: {
         light: "#03a9f4",
         dark: "#01579b",
         main: "#0288d1",
         text: '#fff',
      },
      text: {
         light: "",
         dark: "",
         main: "",
         text: '#fff',
      },
      divider: {
         light: "",
         dark: "",
         main: "",
         text: '#fff',
      },
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
   space: (n: number) => 8 * n,
}

export default defaultTheme