const initial = {
    opacity: 0
};

const animate = {
    opacity: 1
};

const exit = {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.2 }
};


// High to Low
const steps: any = {
    zoom: [0, .2, .4, .6, .8],
    zoomOver: [1.06, 1.05, 1.04, 1.03, 1.02, 1.01],
    fadeIn: [0, .2, .4, .6, .8],
    fadeInUp: [50, 44, 34, 24, 12],
}

const getStep = (t: string, n = 1) => steps[t][(n || 1) - 1]

const zoom = (step = 1) => ({
    initial: { ...initial, scale: getStep("zoom", step) },
    animate: { ...animate, scale: 1 },
    exit: { ...exit, scale: getStep("zoom", step) }
})

const zoomOver = (step = 1) => ({
    initial: { ...initial, scale: getStep("zoomOver", step) },
    animate: { ...animate, scale: 1 },
    exit: { ...exit, scale: getStep("zoomOver", step) }
})

const fadeIn = (step = 1) => ({
    initial: { opacity: getStep("fadeIn", step) },
    animate: { opacity: 1 },
    exit: {
        ...exit,
        opacity: getStep("fadeIn", step)
    }
})

const fadeInUp = (step = 1) => ({
    initial: { ...initial, y: -(getStep("fadeInUp", step)) },
    animate: { ...animate, y: 0 },
    exit: { ...exit, y: -(getStep("fadeInUp", step)) }
})

const fadeInDown = (step = 1) => ({
    initial: { ...initial, y: getStep("fadeInUp", step) },
    animate: { ...animate, y: 0 },
    exit: { ...exit, y: getStep("fadeInUp", step) }
})

const fadeInLeft = (step = 1) => ({
    initial: { ...initial, x: -(getStep("fadeInUp", step)) },
    animate: { ...animate, x: 0 },
    exit: { ...exit, x: -(getStep("fadeInUp", step)) }
})

const fadeInRight = (step = 1) => ({
    initial: { ...initial, x: getStep("fadeInUp", step) },
    animate: { ...animate, x: 0 },
    exit: { ...exit, x: getStep("fadeInUp", step) }
})

const variants = {
    zoom,
    zoomOver,
    fadeIn,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    fadeInUp
};

export default variants;
