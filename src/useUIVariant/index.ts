'use client'

export type UseUIVariantTypes = "filled" | "outlined" | "soft" | "text"
export type UseUIVariantColorTypes = "paper" | "primary" | "secondary" | "info" | "success" | "error" | "warning"

const useUIVariant = (type?: UseUIVariantTypes, color?: UseUIVariantColorTypes): object => {
    type = type ?? "filled"

    switch (type) {
        case "filled":
            return {
                bgcolor: `color.${color}`,
                color: `color.${color}.text`,
                hover: {
                    bgcolor: `color.${color}.light`,
                    color: `color.${color}.text`
                }
            }
        case "soft":
            return {
                bgcolor: `color.${color}.soft`,
                color: `color.${color}`,
                hover: {
                    bgcolor: `color.${color}.soft`,
                    color: `color.${color}`,
                }
            }
        case "outlined":
            return {
                border: 1,
                borderColor: `color.${color}`,
                color: `color.${color}`,
                hover: {
                    bgcolor: `color.${color}.soft`,
                    color: `color.${color}`
                }
            }
        case "text":
            return {
                bgcolor: `transparent`,
                color: `color.${color}`,
                hover: {
                    bgcolor: `color.${color}.soft`,
                    color: `color.${color}`
                }
            }
    }
}

export default useUIVariant