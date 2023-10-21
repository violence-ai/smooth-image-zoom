import {Styles} from "./Styles";

export interface Options {
    styles?: Styles
    maxSizePercent?: number
}

export interface OptionsRequired {
    styles: Styles
    maxSizePercent: number
}