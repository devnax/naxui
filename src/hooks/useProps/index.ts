import { useMemo } from 'react'
import { ThemeComponentsProps } from '../../styles/theme/types'
import useSX from '../useSX'
import { useTheme, ThemeReference } from '../../styles/theme'
import CSS_PROP_LIST from './CSS_PROP_LIST'
import { ObjectType, UsePropsType, UsePropsReturnType } from './types'
import { isObject } from 'tiny-utils'
export * from './types'


const useProps = <T extends ObjectType>(props: Partial<UsePropsType<T>>, themeCompName?: keyof ThemeComponentsProps): UsePropsReturnType => {
   const theme = useTheme()
   let { sx, hover, className, baseClass, component, ...rest } = props

   const formate = useMemo(() => {
      const referance: any = ThemeReference()

      let variants: any;
      if (themeCompName) {
         const compProps = theme.componenets[themeCompName]
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
            if (isObject(val)) {
               _variantsProps = { ..._variantsProps, ...val }
               continue
            }
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
         if (typeof val === "string" && referance[val]) {
            val = referance[val]
         }
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
   formate.props.className = `${csscls} ${baseClass || ""} ${className || ""}`.trim()

   return {
      component,
      props: formate.props,
      css: formate.css,
   }
}
export default useProps




