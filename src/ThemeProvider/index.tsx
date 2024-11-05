import React, { useEffect, useId, useMemo } from 'react'
import { ThemeProvider as RootThemeProvider, ThemeProviderProps as RootThemeProviderProps } from 'naxui-manager'
import { LayerHandler } from '../Layer'

const providers: string[] = []
export type ThemeProviderProps = RootThemeProviderProps & {

}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    const id = useId()

    useMemo(() => {
        providers.push(id)
    }, [])

    useEffect(() => {
        return () => {
            providers.splice(providers.indexOf(id), 1)
        }
    }, [])

    const isRoot = providers[0] === id

    return (
        <RootThemeProvider {...props}>
            {isRoot && <>
                <LayerHandler />
            </>}
            {children}
        </RootThemeProvider>
    )
}

export default ThemeProvider