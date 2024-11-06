'use client'
import React, { useRef } from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type FormProps<T extends TagComponentType = "form"> = TagProps<T> & {

}


const _Form = <T extends TagComponentType = "form">({ children, ...rest }: FormProps<T>, ref: React.Ref<any>) => {
    let formRef: any = ref || useRef()

    const cloneAllChildren: any = (childs: any) => {
        return React.Children.map(childs, (child: any) => {
            let c: any = child;
            if (React.isValidElement(child) && c.props.name) {
                const form = formRef.current
                const formData = new FormData(form);
                return React.cloneElement(child, {
                    onChange: (e: any) => {
                        console.log(formData.get(c.props.name));
                    },
                    value: formData.get(c.props.name),
                    children: cloneAllChildren(c.props.children),
                } as any);
            }
            return child;
        });
    };

    return (
        <Tag
            component="form"

            {...rest}
            onSubmit={(e) => {
                e.preventDefault()
                const form = formRef.current

                const formData = new FormData(form);

                formData.forEach((value, key) => {
                    console.log(key + ": " + value);
                });
            }}
            sxr={{
                bgcolor: "default",
                p: 2,
                maxWidth: 400,
                radius: 1,
            }}
            baseClass='form'
            ref={formRef}
        >
            {cloneAllChildren(children)}
        </Tag>
    )
}

const Form = React.forwardRef(_Form) as typeof _Form
export default Form

