import { alpha } from 'naxui-manager'

export type UseUIVariantTypes = "filled" | "outlined" | "text"
export type UseUIVariantColorTypes = "default" | "primary" | "secondary" | "success" | "error" | "warning"

const useUIVariant = (type?: UseUIVariantTypes, color?: UseUIVariantColorTypes, softness?: number): object => {
    color = color || "default"
    type = type || "filled"
    let mainColor: any = "color." + color
    let textColor: any = `color.${color}.text`
    if (color === 'default') {
        mainColor = "color.paper"
        textColor = "color.text"
    }

    switch (type) {
        case "filled":
            if (softness !== undefined) {
                return {
                    bgcolor: alpha(mainColor, softness),
                    color: color === 'default' ? textColor : (softness < .5 ? mainColor : textColor),
                }
            }
            return {
                bgcolor: mainColor,
                color: textColor,
            }

        case "outlined":
            if (softness !== undefined) {
                return {
                    bgcolor: "transparent",
                    border: `1px solid`,
                    borderColor: alpha(color === 'default' ? 'color.divider' : mainColor, softness),
                    color: color === 'default' ? textColor : mainColor,
                }
            }
            return {
                bgcolor: "transparent",
                border: `1px solid`,
                borderColor: color === 'default' ? 'color.divider' : mainColor,
                color: color === 'default' ? textColor : mainColor,
            }
        case "text":
            return {
                bgcolor: "transparent",
                color: color === 'default' ? textColor : mainColor
            }
    }
}

export default useUIVariant