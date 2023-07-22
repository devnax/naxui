import React, { forwardRef } from 'react'
import { Tag, TagProps, TagComponenntType } from 'naxui-manager'

export type ListProps<T extends TagComponenntType = "ul"> = TagProps<T>

const List = <T extends TagComponenntType = "ul">({ children, sx, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            component='ul'
            baseClass='list'
            m={0}
            p={0}
            listStyle="none"
            sx={{
                '& > *': {
                    mb: .4
                },
                ...(sx || {} as any)
            }}
            {...rest}
            ref={ref}
        >
            {children}
        </Tag>
    )
}

export default forwardRef(List) as typeof List