import {CSSStyle} from "../functions/setCSSStyles";

enum StylesProps {
    root = 'root',
    overlay = 'overlay',
    overlayHide = 'overlayHide',
    overlayShow = 'overlayShow',
    img = 'img',
}

export type Styles = {
    [keyof in StylesProps]: CSSStyle
}