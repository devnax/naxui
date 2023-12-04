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

const isOffScreen = (menu: HTMLElement) => {
    const { x, y, width, height } = menu.getBoundingClientRect()
    return x < 0 || y < 0 || x + width > window.innerWidth || y + height > window.innerHeight
};

type Props = {
    place: PlacementTypes,
    menu: HTMLElement,
    target: HTMLElement
}


let setStyles = ({ place, menu, target }: Props) => {

    const { height, width } = menu.getBoundingClientRect()
    const targetBoundary = target.getBoundingClientRect()
    let targetTop = targetBoundary.top + window.scrollY
    let targetBottom = targetBoundary.bottom + window.scrollY
    let targetLeft = targetBoundary.left + window.scrollX
    let targetRight = targetBoundary.right + window.scrollX

    const _styles = {
        "top": () => {
            menu.style.top = `${targetTop - height}px`
            menu.style.left = `${(targetLeft + (targetBoundary.width / 2)) - (width / 2)}px`
        },
        "top-left": () => {
            menu.style.top = `${targetTop - height}px`
            menu.style.left = `${targetLeft}px`
        },
        "top-right": () => {
            menu.style.top = `${targetTop - height}px`
            menu.style.left = `${targetRight - width}px`
        },
        "bottom": () => {
            menu.style.top = `${targetBottom}px`
            menu.style.left = `${(targetLeft + (targetBoundary.width / 2)) - (width / 2)}px`
        },
        "bottom-left": () => {
            menu.style.top = `${targetBottom}px`
            menu.style.left = `${targetLeft}px`
        },
        "bottom-right": () => {
            menu.style.top = `${targetBottom}px`
            menu.style.left = `${targetRight - width}px`
        },
        "right": () => {
            menu.style.top = `${(targetTop + (targetBoundary.height / 2)) - (height / 2)}px`
            menu.style.left = `${targetRight}px`
        },
        "right-top": () => {
            menu.style.top = `${targetTop}px`
            menu.style.left = `${targetRight}px`
        },
        "right-bottom": () => {
            menu.style.top = `${(targetTop + targetBoundary.height) - height}px`
            menu.style.left = `${targetRight}px`
        },
        "left": () => {
            menu.style.left = `${targetLeft - width}px`
            menu.style.top = `${(targetTop + (targetBoundary.height / 2)) - (height / 2)}px`
        },
        "left-top": () => {
            menu.style.top = `${targetTop}px`
            menu.style.left = `${targetLeft - width}px`
        },
        "left-bottom": () => {
            menu.style.top = `${targetBottom - height}px`
            menu.style.left = `${targetLeft - width}px`
        }
    }
    _styles[place] && _styles[place]()
}

export const placedMenu = ({ place, menu, target }: Props) => {
    setStyles({ place, menu, target })
    if (isOffScreen(menu)) {
        let found_placement = false
        for (let i = 0; i < placements.length; i++) {
            let _place = placements[i]
            setStyles({ place: _place, menu, target })
            if (!isOffScreen(menu)) {
                found_placement = true
                return _place
            }
        }
        if (!found_placement) {
            setStyles({ place, menu, target })
        }
    }
    return place
}

