import { useMemo } from "react"
import { alpha } from "naxui-manager";
let _d: CSSStyleDeclaration;

const useBlurCss = (blur?: number) => {
    return useMemo(() => {
        if (typeof window === 'undefined') {
            return { bgcolor: alpha("color.paper", .8) }
        }
        const d = _d || (_d = window.document.createElement("div").style)
        return d['backdropFilter'] !== undefined ? { backdropFilter: `blur(${blur}px)` } : { bgcolor: alpha("color.paper", .8) }
    }, [blur])
}


export default useBlurCss