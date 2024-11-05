'use client'
export type UseCornerTypes = "square" | "rounded" | "circle"

const useCorner = (type?: UseCornerTypes): object => {
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

export default useCorner