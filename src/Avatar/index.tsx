'use client'
import React, { useState } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import PersonIcon from 'naxui-icons/round/Person'

export type AvatarProps<T extends TagComponenntType = "img"> = TagProps<T> & {
    src: string;
    size?: number;
}

const Avatar = <T extends TagComponenntType = "img">({ children, size, src, alt, ...rest }: AvatarProps<T>, ref: any) => {
    const [faild, setFaild] = useState<boolean>()
    size = size || 36

    if (faild === false) {
        let t = alt?.charAt(0).toUpperCase() || (children || <PersonIcon />)
        return (
            <Tag
                baseClass='avatar'
                component="div"
                display="inline-flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={"background.dark"}
                fontSize={size - 12}
                radius={size}
                width={size}
                height={size}
                src={src}
                {...rest}
                sx={{
                    '& svg': {
                        fontSize: size - 8,
                        opacity: .6
                    }
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

export default React.forwardRef(Avatar) as typeof Avatar


