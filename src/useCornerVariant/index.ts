'use client'
export type UseCornerVariantTypes = "square" | "rounded" | "circle"

const useCornerVariant = (type?: UseCornerVariantTypes): object => {
    switch (type) {
        case 'square':
            return {
                radius: 0
            }
        case 'rounded':
            return {
                radius: 1
            }
        case 'circle':
            return {
                radius: 100
            }
    }
    return {}
}

export default useCornerVariant