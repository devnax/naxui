import { alpha } from 'naxui-manager'

export type UseUIVariantTypes = "filled" | "outlined" | "text"
export type UseUIVariantColorTypes = "default" | "primary" | "secondary" | "success" | "error" | "warning"

const useUIVariant = (type?: UseUIVariantTypes, color?: UseUIVariantColorTypes, softness?: number): object => {
    color = color || "default"
    type = type || "filled"
    let mainColor: any = color
    let textColor: any = `${color}.text`
    if (color === 'default') {
        mainColor = "background.paper"
        textColor = "text.primary"
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
                    borderColor: alpha(color === 'default' ? textColor : mainColor, softness),
                    color: color === 'default' ? textColor : mainColor,
                }
            }
            return {
                bgcolor: "transparent",
                border: `1px solid`,
                borderColor: color === 'default' ? textColor : mainColor,
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