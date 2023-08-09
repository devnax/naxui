'use client'
export const getOrigin = (placed: string) => {
    let _origin: any = "top"
    switch (placed) {
        case "bottom":
            _origin = "top"
            break;
        case "bottom-left":
            _origin = "top left"
            break;
        case "bottom-right":
            _origin = "top right"
            break;
        case "top":
            _origin = "bottom"
            break;
        case "top-left":
            _origin = "bottom left"
            break;
        case "top-right":
            _origin = "bottom right"
            break;
        case "right":
            _origin = "left"
            break;
        case "right-bottom":
            _origin = "bottom left"
            break;
        case "right-top":
            _origin = "top left"
            break;
        case "left":
            _origin = "right"
            break;
        case "left-bottom":
            _origin = "bottom right"
            break;
        case "left-top":
            _origin = "top right"
            break;
    }
    return _origin
}