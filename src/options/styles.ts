import {Styles} from "../types/Styles";

export const styles: Styles = {
    root: {
        position: 'fixed',
    },

    overlay: {
        position: 'fixed',
        background: '#000',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '9999',
        transition: '500ms ease',
    },

    overlayHide: {
        opacity: '0'
    },

    overlayShow: {
        opacity: '0.7'
    },

    img: {
        position: 'fixed',
        zIndex: '10000',
        transition: '500ms ease-in-out',
    },
}