import { ThemeName, ThemeProps } from "./types"
import defaultTheme from "./default"
import { isObject } from "tiny-utils"
import { useEffect, useId, useState } from "react"
import ThemeReference from './ThemeReference'

export { ThemeReference }

export * from './types'

let ACTIVE_THEME_NAME: any = null
const themeFactory = new Map<ThemeName, ThemeProps>()
const DISPATCHES: { [key: string]: () => void } = {}

const merge = (main: ThemeProps, partial: Partial<ThemeProps>): ThemeProps => {
   const m: any = main
   const o: any = partial
   for (let key in o) {
      if (isObject(o[key])) {
         m[key] = merge(m[key], o[key])
      } else {
         m[key] = o[key]
      }
   }
   return m
}

export const setTheme = (name: ThemeName) => {
   ACTIVE_THEME_NAME = name
   for (let key in DISPATCHES) {
      DISPATCHES[key]()
   }
}

export const createTheme = (name: ThemeName, partial: Partial<ThemeProps>) => {
   themeFactory.set(name, merge({ ...defaultTheme }, partial))
}

export const getTheme = (name?: ThemeName | null): ThemeProps => {
   return themeFactory.get(name || ACTIVE_THEME_NAME) || defaultTheme
}

export const useTheme = (name?: ThemeName): ThemeProps => {
   const id = useId()
   const [, dispatch] = useState(0)
   useEffect(() => {
      DISPATCHES[id] = () => dispatch(Math.random())
      return () => {
         if (DISPATCHES[id]) {
            delete DISPATCHES[id]
         }
      }
   }, [])
   return themeFactory.get(name || ACTIVE_THEME_NAME) || defaultTheme
}