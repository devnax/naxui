'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type ImageProps<T extends TagComponenntType = "img"> = TagProps<T>

const Image = <T extends TagComponenntType = "img">(props: ImageProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag baseClass='image' {...props} component="img" ref={ref} />
    )
}
export default React.forwardRef(Image) as typeof Image

