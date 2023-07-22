import React, { forwardRef, ReactElement } from 'react'
import { Tag, TagProps, TagComponenntType } from 'naxui-manager'
import Text from '../Text';

export type ListItemProps<T extends TagComponenntType = "li"> = TagProps<T> & {
    active?: boolean;
    subtitle?: string | ReactElement;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
}


const ListItem = <T extends TagComponenntType = "li">({ children, active, startIcon, endIcon, subtitle, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {

    return (
        <Tag
            component='li'
            baseClass='list-item'
            typography='text'
            p={1}
            radius={.5}
            cursor="pointer"
            transition="all .3s"
            userSelect="none"
            bgcolor={active ? "primary.main" : "transparent"}
            color={active ? "primary.text" : "text.primary"}
            display="flex"
            flexDirection="row"
            alignItems="center"
            {...rest}
            hover={{
                bgcolor: active ? "primary.main" : "background.light",
                ...((rest as any).hover || {})
            }}
            ref={ref}
        >
            {startIcon && <Tag mr={1} component="span" display="inline-block" color={active ? "primary.text" : "text.secondary"}>{startIcon}</Tag>}
            <Tag flex={1} component="span">
                {typeof children === "string" ? <Text variant="text" color={active ? "primary.text" : "text.primary"}>{children}</Text> : children}
                {
                    subtitle && (typeof subtitle === 'string' ? <Text variant="subtext" fontSize={12.5}>{subtitle}</Text> : subtitle)
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" color={active ? "primary.text" : "text.secondary"}>{endIcon}</Tag>}
        </Tag>
    )
}

export default forwardRef(ListItem) as typeof ListItem