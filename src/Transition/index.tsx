'use client'
import React, { ReactElement, cloneElement, Children, useEffect } from 'react';
import { UseTransitionsVariantsTypes, UseTransitionsVariantCallback, useTransitions, UseTransitionsProps } from 'naxui-manager';

export type TransitionProps = UseTransitionsProps & {
    children?: ReactElement;
    in?: boolean;
    type?: UseTransitionsVariantsTypes | UseTransitionsVariantCallback;
}

const _Transition = ({ children, type, in: _in, ...rest }: TransitionProps, ref: React.Ref<any>) => {

    const [_ref, cls] = useTransitions(type || "fade", _in, { duration: 400, ...rest })

    useEffect(() => {
        if (ref) ref = _ref
    }, [])
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Transion")

    const first: any = Children.toArray(children).shift();
    return cloneElement(first, {
        classNames: [cls],
        ref: _ref
    });
}

const Transition = React.forwardRef(_Transition) as typeof _Transition
export default Transition