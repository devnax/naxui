import { useMemo } from 'react'
import { ThemeComponentsProps } from '../../styles/theme/types'
import useSX from '../useSX'
import { useTheme, ThemeReference } from '../../styles/theme'
import CSS_PROP_LIST from './CSS_PROP_LIST'
import { ObjectType, UsePropsType, UsePropsReturnType } from './types'
export * from './types'

const useProps = <T extends ObjectType>(props: Partial<UsePropsType<T>>, component?: keyof ThemeComponentsProps): UsePropsReturnType => {
   const theme = useTheme()
   let { sx, hover, className, ...rest } = props

   const formate = useMemo(() => {
      const referance: any = ThemeReference()

      let variants: any;
      if (component) {
         const compProps = theme.componenets[component]
         rest = { ...compProps?.props, ...rest }
         variants = compProps?.variants
      }

      let _variantsProps: any = {}
      const _css: any = {}
      const _props: any = {}
      for (let propname in rest) {
         let val = (rest as any)[propname]
         if (typeof val === "string" && referance[val]) {
            val = referance[val]
         }
         if (variants && variants[propname]) {
            const vprops = variants[propname][val] || {}
            _variantsProps = { ..._variantsProps, ...vprops }
         }
         if (CSS_PROP_LIST.includes(propname)) {
            _css[propname] = val
         } else {
            _props[propname] = val
         }
      }

      // Formate variant props
      for (let propname in _variantsProps) {
         let val = _variantsProps[propname]
         if (CSS_PROP_LIST.includes(propname)) {
            _css[propname] = val
         } else {
            _props[propname] = val
         }
      }
      return {
         css: _css,
         props: _props
      }
   }, [props])

   const _css: any = {
      ...formate.css,
      ...sx
   }
   if (hover) {
      _css["&:hover"] = hover
   }
   const csscls = useSX(_css)

   return {
      props: rest,
      css: formate.css,
      className: `${csscls} ${className || ""}`.trim()
   }
}
export default useProps




