type Args = {
    contentHeight: number
}


export const Zoom = (_args: Args) => {
    return {
        in: {
            from: {
                scale: 0,
                opacity: 0,
            },
            to: {
                scale: 1,
                opacity: 1,
            }
        },
        out: {
            from: {
                scale: 1,
                opacity: 1,
            },
            to: {
                scale: 0,
                opacity: 0,
            }
        }
    }
}

export const ZoomOver = (_args: Args) => {
    return {
        in: {
            from: {
                scale: 1.5,
                opacity: 0,
            },
            to: {
                scale: 1,
                opacity: 1,
            }
        },
        out: {
            from: {
                scale: 1,
                opacity: 1,
            },
            to: {
                scale: 1.5,
                opacity: 0,
            }
        }
    }
}


export const Collapse = ({ contentHeight }: Args) => {
    return {
        in: {
            from: {
                height: 0 + "px",
                overflow: "hidden"
            },
            to: {
                height: contentHeight + "px",
                overflow: "hidden"
            }
        },
        out: {
            from: {
                height: contentHeight + "px",
                overflow: "hidden"
            },
            to: {
                height: 0 + "px",
                overflow: "hidden"
            }
        }
    }
}

export const SlideDown = ({ contentHeight }: Args) => {
    return {
        in: {
            from: {
                y: -(contentHeight + 100),
                opacity: 0
            },
            to: {
                y: 0,
                opacity: 1
            }
        },
        out: {
            from: {
                y: 0,
                opacity: 1
            },
            to: {
                y: -(contentHeight + 100),
                opacity: 0
            }
        }
    }
}

export const SlideUp = ({ contentHeight }: Args) => {
    return {
        in: {
            from: {
                y: contentHeight + 100,
                opacity: 0
            },
            to: {
                y: 0,
                opacity: 1
            }
        },
        out: {
            from: {
                y: 0,
                opacity: 1
            },
            to: {
                y: contentHeight + 100,
                opacity: 0
            }
        }
    }
}

export const SlideLeft = ({ contentHeight }: Args) => {
    return {
        in: {
            from: {
                x: -(contentHeight + 100),
                opacity: 0
            },
            to: {
                x: 0,
                opacity: 1
            }
        },
        out: {
            from: {
                x: 0,
                opacity: 1
            },
            to: {
                x: -(contentHeight + 100),
                opacity: 0
            }
        }
    }
}

export const SlideRight = ({ contentHeight }: Args) => {
    return {
        in: {
            from: {
                x: contentHeight + 100,
                opacity: 0
            },
            to: {
                x: 0,
                opacity: 1
            }
        },
        out: {
            from: {
                x: 0,
                opacity: 1
            },
            to: {
                x: contentHeight + 100,
                opacity: 0
            }
        }
    }
}