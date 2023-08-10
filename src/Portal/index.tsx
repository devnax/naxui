'use client'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useProps, TagProps, TagComponenntType } from 'naxui-manager';
export type PortalProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    appendTo?: HTMLElement;
    container?: HTMLElement;
}

const Portal = <T extends TagComponenntType = "div">({ children, component, appendTo, container, ...rest }: PortalProps<T>, ref?: React.Ref<any>) => {
    const [_container, setContainer] = useState<HTMLElement | undefined>(container)
    let props = useProps(rest)

    useEffect(() => {
        appendTo = appendTo || document.body
        let _con: HTMLElement = _container || document.createElement(component as any || "div");
        appendTo.appendChild(_con);
        for (let prop in props) {
            _con.setAttribute(prop, props[prop])
        }
        if (!_container) {
            setContainer(_con)
        }
        if (ref) {
            (ref as any).current = _con
        }
        return () => {
            (appendTo as any).removeChild(_con);
        }
    }, [])

    if (!_container) return <></>

    return ReactDOM.createPortal(
        children,
        _container,
    );
}

export default React.forwardRef(Portal) as typeof Portal