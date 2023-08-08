import * as React from 'react'
import { CSSProps } from 'naxcss'
import { alpha } from 'naxui-manager'
import { getValue } from 'naxui-manager'

export type UseVariantVariants<V> = "text" | "containe" | "outline" | V
export type UseVariantColors = "primary" | "secondary" | "success" | "error" | "warning"
export type UseVariantCallback<V> = (variant: UseVariantVariants<V>, color?: UseVariantColors) => CSSProps | void

const useVariant = <V = "">(variant: UseVariantVariants<V>, color?: UseVariantColors, callback?: UseVariantCallback<V>) => {
    return React.useMemo(() => {
        const cname = color || "primary";
        const mainColor = getValue(cname, "bgcolor", {})
        let css: any = {
            bgcolor: mainColor,
            color: getValue(`${cname}.text`, "color", {}),
            hover: { bgcolor: getValue(`${cname}.dark`, "bgcolor", {}) }
        }

        switch (variant) {
            case "outline":
                css = {
                    border: 1,
                    borderColor: mainColor,
                    color: mainColor,
                    hover: {
                        bgcolor: alpha(cname, .2)
                    }
                }
                break;
            case "text":
                css = {
                    color: mainColor,
                    hover: {
                        bgcolor: alpha(cname, .2)
                    }
                }
                break;
        }
        if (callback) {
            let _css = callback(variant, color)
            if (_css) {
                css = _css
            }
        }
        return css
    }, [variant, color])
}



export default useVariant