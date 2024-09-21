'use client'

export type UseUIVariantTypes = "filled" | "outlined" | "soft" | "text"
export type UseUIVariantColorTypes = "default" | "brand" | "accent" | "info" | "success" | "error" | "warning"

const useUIVariant = (type?: UseUIVariantTypes, color?: UseUIVariantColorTypes): object => {
    type = type ?? "filled"

    switch (type) {
        case "filled":
            return {
                bgcolor: `${color}`,
                color: `${color}.text`,
                hover: {
                    bgcolor: `${color}.secondary`,
                    color: `${color}.primary`
                }
            }
        case "soft":
            return {
                bgcolor: `${color}.soft`,
                color: `${color}`,
                hover: {
                    bgcolor: `${color}.soft`,
                    color: `${color}`,
                }
            }
        case "outlined":
            return {
                bgcolor: "transparent",
                border: 1,
                borderColor: `${color}`,
                color: color === "default" ? `${color}.text` : `${color}`,
                hover: {
                    bgcolor: `${color}.soft`,
                    color: color === "default" ? `${color}.text` : `${color}`
                }
            }
        case "text":
            return {
                bgcolor: `transparent`,
                color: color === "default" ? `${color}.text` : `${color}`,
                hover: {
                    bgcolor: color === "default" ? `default` : `${color}.soft`,
                    color: color === "default" ? `${color}.text` : `${color}`
                }
            }
    }
}

export default useUIVariant