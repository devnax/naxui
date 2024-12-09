import React from 'react'
import { ThemeProvider as RootThemeProvider, ThemeProviderProps as RootThemeProviderProps } from 'naxui-manager'
import { RenderComponents } from './RenderRoot'

export type ThemeProviderProps = RootThemeProviderProps & {

}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {

    return (
        <RootThemeProvider {...props}
            renderIsRoot={<RenderComponents />}
        >
            {children}
        </RootThemeProvider>
    )
}

export default ThemeProvider