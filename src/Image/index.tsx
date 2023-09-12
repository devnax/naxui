'use client'
import React, { ReactElement, useState } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type ImageProps<T extends TagComponenntType = "img"> = TagProps<T> & {
    errorView?: ReactElement
}

const _Image = <T extends TagComponenntType = "img">({ children, src, alt, errorView, ...rest }: ImageProps<T>, ref: any) => {
    const [faild, setFaild] = useState<boolean>()

    if (faild === false) {
        let t = errorView || alt?.charAt(0).toUpperCase() || children
        return (
            <Tag
                baseClass='image'
                component="div"
                display="inline-flex"
                justifyContent="center"
                alignItems="center"
                src={src}
                {...rest}

                ref={ref}
            >{t}</Tag>
        )
    }
    return (
        <Tag
            baseClass='Image'
            component="img"
            objectFit="cover"
            alt={alt}
            src={src}
            {...rest}
            onError={(e) => {
                setFaild(false)
                rest.onError && rest.onError(e as any)
            }}
            ref={ref}
        />
    )
}

const Image = React.forwardRef(_Image) as typeof _Image
export default Image


