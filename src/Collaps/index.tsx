'use client'
import React, { useEffect } from 'react';
import { Tag, TagProps, TagComponenntType, useTransitions, UseTransitionsProps, classNames } from 'naxui-manager';

export type CollapsProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    in?: boolean,
    transitionProps?: UseTransitionsProps
}

const _Collaps = <T extends TagComponenntType = "div">({ children, in: In, transitionProps, ...rest }: CollapsProps<T>, ref: any) => {
    const [_ref, cls] = useTransitions("collapsVerticle", In || false, {
        easing: "easeOut",
        ...transitionProps
    })

    useEffect(() => {
        if (ref) {
            ref.current = _ref.current
        }
    }, [])

    return (
        <Tag baseClass='collaps' {...rest} className={classNames(cls, (rest as any)?.className)} ref={_ref}>{children}</Tag>
    )
}

const Collaps = React.forwardRef(_Collaps) as typeof _Collaps
export default Collaps


