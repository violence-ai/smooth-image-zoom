export type CSSStyle = {
    [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key]
}

export function setCSSStyles(el: HTMLElement, styles: CSSStyle) {
    for ( const prop in styles ) {
        const value = styles[prop]
        if ( value !== undefined ) {
            el.style[prop] = value
        }
    }
}