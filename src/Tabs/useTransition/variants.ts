import { UseTransitionElementProps } from "."

export const fade = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
}

export const fadeDown = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateY(-20px)`,
            opacity: 0
        },
        to: {
            transform: `translateY(0)`,
            opacity: 1
        }
    }
}

export const fadeUp = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateY(20px)`,
            opacity: 0
        },
        to: {
            transform: `translateY(0)`,
            opacity: 1
        }
    }
}

export const fadeRight = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateX(-20px)`,
            opacity: 0
        },
        to: {
            transform: `translateX(0)`,
            opacity: 1
        }
    }
}

export const fadeLeft = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateX(20px)`,
            opacity: 0
        },
        to: {
            transform: `translateX(0)`,
            opacity: 1
        }
    }
}

export const grow = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: "scale(.8, .6)",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    }
}


export const zoom = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: "scale(.8)",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    }
}

export const zoomOver = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: "scale(1.2)",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    }
}

export const collapsVerticle = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            height: 0 + "px",
            overflow: "hidden"
        },
        to: {
            height: (_arg?.height || "auto") + "px",
            overflow: "hidden"
        }
    }
}


export const collapsHorizental = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            width: 0 + "px",
            overflow: "hidden"
        },
        to: {
            width: (_arg?.width || "auto") + "px",
            overflow: "hidden"
        }
    }
}




