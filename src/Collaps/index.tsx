'use client'
import React, { useEffect } from 'react';
import { Tag, TagProps, TagComponenntType, useTransitions, UseTransitionsProps, classNames } from 'naxui-manager';

export type CollapsProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    in?: boolean,
    slotProps?: {
        transition?: UseTransitionsProps
    }
}

const _Collaps = <T extends TagComponenntType = "div">({ children, in: In, slotProps, ...rest }: CollapsProps<T>, ref: any) => {

    const [_ref, cls] = useTransitions("collapsVerticle", In || false, {
        easing: "easeOut",
        ...slotProps?.transition
    })

    useEffect(() => {
        if (ref) {
            ref.current = _ref.current
        }
    }, [])

    return (
        <Tag
            {...rest}
            baseClass='collaps'
            className={classNames(cls, (rest as any)?.className)}
            ref={_ref}
        >{children}</Tag>
    )
}

const Collaps = React.forwardRef(_Collaps) as typeof _Collaps
export default Collaps


