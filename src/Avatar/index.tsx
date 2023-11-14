'use client'
import React, { useState } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import PersonIcon from 'naxui-icons/round/Person'

export type AvatarProps<T extends TagComponenntType = "img"> = TagProps<T> & {
    src?: string;
    size?: number;
}

const _Avatar = <T extends TagComponenntType = "img">({ children, size, src, alt, ...rest }: AvatarProps<T>, ref: any) => {
    const [faild, setFaild] = useState<boolean>()
    size = size || 36

    if (faild === false || !src) {
        let t = alt?.charAt(0).toUpperCase() || (children || <PersonIcon />)
        return (
            <Tag
                baseClass='avatar'
                component="div"
                src={src}
                {...rest}
                sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "color.paper",
                    radius: size,
                    fontSize: size - 12,
                    width: size,
                    height: size,
                    userSelect: "none",
                    '& svg': {
                        fontSize: size - 8,
                        opacity: .6
                    },
                    ...((rest as any).sx || {})
                }}
                ref={ref}
            >{t}</Tag>
        )
    }
    return (
        <Tag
            baseClass='avatar'
            component="img"
            radius={size}
            width={size}
            height={size}
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

const Avatar = React.forwardRef(_Avatar) as typeof _Avatar
export default Avatar


