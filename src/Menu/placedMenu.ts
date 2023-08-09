'use client'

export const placements = [
    "top",
    "top-left",
    "top-right",
    "bottom",
    "bottom-left",
    "bottom-right",
    "right",
    "right-top",
    "right-bottom",
    "left",
    "left-top",
    "left-bottom"
] as const


export type PlacementTypes = typeof placements[number]

const isOffScreen = (menu: HTMLElement, { width, height }: Props['menuSize']) => {
    const { left, top } = menu.getBoundingClientRect()
    return (
        left + width > window.innerWidth
        || left < 0
        || top + height > window.innerHeight
        || top < 0
    )
};

type Props = {
    place: PlacementTypes,
    menu: HTMLElement,
    menuSize: { width: number, height: number },
    targetBoundary: DOMRect
}


let setStyles = ({ place, menu, menuSize, targetBoundary }: Props) => {
    const width = menuSize.width
    const height = menuSize.height

    const _styles = {
        "top": () => {
            menu.style.top = `${targetBoundary.top - height}px`
            menu.style.left = `${(targetBoundary.left + (targetBoundary.width / 2)) - (width / 2)}px`
        },
        "top-left": () => {
            menu.style.top = `${targetBoundary.top - height}px`
            menu.style.left = `${targetBoundary.left}px`
        },
        "top-right": () => {
            menu.style.top = `${targetBoundary.top - height}px`
            menu.style.left = `${targetBoundary.right - width}px`
        },
        "bottom": () => {
            menu.style.top = `${targetBoundary.bottom}px`
            menu.style.left = `${(targetBoundary.left + (targetBoundary.width / 2)) - (width / 2)}px`
        },
        "bottom-left": () => {
            menu.style.top = `${targetBoundary.bottom}px`
            menu.style.left = `${targetBoundary.left}px`
        },
        "bottom-right": () => {
            menu.style.top = `${targetBoundary.bottom}px`
            menu.style.left = `${targetBoundary.right - width}px`
        },
        "right": () => {
            menu.style.left = `${targetBoundary.right}px`
            menu.style.top = `${(targetBoundary.top + (targetBoundary.height / 2)) - (height / 2)}px`
        },
        "right-top": () => {
            menu.style.top = `${targetBoundary.top}px`
            menu.style.left = `${targetBoundary.right}px`
        },
        "right-bottom": () => {
            menu.style.top = `${targetBoundary.bottom - height}px`
            menu.style.left = `${targetBoundary.right}px`
        },
        "left": () => {
            menu.style.left = `${targetBoundary.left - width}px`
            menu.style.top = `${(targetBoundary.top + (targetBoundary.height / 2)) - (height / 2)}px`
        },
        "left-top": () => {
            menu.style.top = `${targetBoundary.top}px`
            menu.style.left = `${targetBoundary.left - width}px`
        },
        "left-bottom": () => {
            menu.style.top = `${targetBoundary.bottom - height}px`
            menu.style.left = `${targetBoundary.left - width}px`
        }
    }
    _styles[place] && _styles[place]()
}

export const placedMenu = ({ place, menu, menuSize, targetBoundary }: Props) => {
    setStyles({ place, menu, menuSize, targetBoundary })
    if (isOffScreen(menu, menuSize)) {
        for (let i = 0; i < placements.length; i++) {
            let _place = placements[i]
            setStyles({ place: _place, menu, menuSize, targetBoundary })
            if (!isOffScreen(menu, menuSize)) {
                return _place
            }
        }
    }
    return name
}

