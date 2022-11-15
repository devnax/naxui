import { CSSObject } from "naxcss"
import { HTMLAttributes } from "react"

export interface UseDefaultPropsType<T extends HTMLElement> extends HTMLAttributes<T> {
   sx: CSSObject
}

const useDefaultProps = <T extends HTMLElement>(props: UseDefaultPropsType<T>) => {

}


export default useDefaultProps