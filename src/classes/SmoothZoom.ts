import {Options, OptionsRequired} from "../types/Options";
import {setCSSStyles} from "../functions/setCSSStyles";
import {styles} from "../options/styles";
import pause from "../functions/pause";

export default class SmoothZoom {

    static defaultOptions: OptionsRequired = {
        styles: styles,
        maxSizePercent: 100,
    }

    private readonly root: HTMLElement
    private readonly options: Options | undefined

    private _originalImage: HTMLImageElement | undefined
    private _elOverlay: HTMLElement | undefined
    private _image: HTMLImageElement | undefined
    private documentClick: EventListener | undefined

    get originalImage() {
        if (!this._originalImage) throw Error('Original image not found')
        return this._originalImage
    }

    get elOverlay() {
        if (!this._elOverlay) throw Error('Overlay not found')
        return this._elOverlay
    }

    get image() {
        if (!this._image) throw Error('Image not found')
        return this._image
    }

    set originalImage(newValue) {
        this._originalImage = newValue
    }

    set elOverlay(newValue) {
        this._elOverlay = newValue
    }

    set image(newValue) {
        this._image = newValue
    }

    constructor(options?: Options) {
        this.options = options
        this.root = this.createRootElement()
    }

    // инициализация (при старте страницы)
    public init() {
        // присвоить обработчик зума при клике всем тегам <img> имеющим class 'smooth-image-zoom'
        document.addEventListener("click", this.open.bind(this))
    }

    public destroy() {
        this.root.remove()
        document.removeEventListener("click", this.open.bind(this))
    }

    private createRootElement(): HTMLElement {
        // создаем базовый root-контейнер
        const el = document.createElement('div')
        // задаем стили базовому root-контейнеру
        setCSSStyles(el, this.getOptions().styles.root)
        // добавим root-элемент на страницу в body
        document.body.prepend(el)
        return el
    }

    // клик по картинке
    private open(e: Event) {
        let img: HTMLImageElement
        if ( !(e.target instanceof HTMLImageElement && e.target.tagName === 'IMG' && e.target.classList.contains('smooth-image-zoom')) ) {
            return
        }
        img = e.target

        // сохраним ссылку на оригинальную картинку
        this.originalImage = img

        // скроем отображение оригинальной картинки
        this.originalImage.style.visibility = 'hidden'

        // создадим оверлей
        this.elOverlay = document.createElement('div')
        setCSSStyles(this.elOverlay, this.getOptions().styles.overlay)
        setCSSStyles(this.elOverlay, this.getOptions().styles.overlayHide)

        // создадим копию картинки, которую будем увеличивать
        this.image = document.createElement('img')
        this.image.src = this.originalImage.src
        setCSSStyles(this.image, this.getOptions().styles.img)

        // установим позицию/размер на оригинальную картинку
        this.setPositionAndSizesToOriginalImage()

        // перезапишем содержимое root-контейнера
        this.root.innerHTML = ''
        this.root.appendChild(this.elOverlay)
        this.root.appendChild(this.image)

        // создадим события сворачивающие зумированную картинку
        this.elOverlay.addEventListener("click", this.close.bind(this))
        this.image.addEventListener("click", this.close.bind(this))

        // дождемся рендера
        requestAnimationFrame(() => {
            if (!this.elOverlay) throw Error('Overlay not found')
            // включим стиль появления оверлея
            setCSSStyles(this.elOverlay, this.getOptions().styles.overlayShow)
            // начнем зумирование картинки
            this.zoomImage()
        })
    }

    // сворачивание картинки обратно
    private async close() {
        // применим стиль скрытия оверлея
        setCSSStyles(this.elOverlay, this.getOptions().styles.overlayHide)

        // установим позицию/размер на оригинальную картинку
        this.setPositionAndSizesToOriginalImage()

        const animationTimeMs = this.getAnimationTimeMS(this.image)

        // ждем завершения анимации
        await pause(animationTimeMs)

        // удаляем оверлей и картинку
        this.elOverlay.remove()
        this.image.remove()

        // возвращаем отображение оригинальной картинке
        this.originalImage.style.visibility = ''
    }

    private getAnimationTimeMS(img: HTMLImageElement): number {
        const values: number[] = []
        const transition: string[] = img.style.transition.split(',')
        transition.forEach(item => {
            if (/^ *(all|width|height|top|left)?/.test(item)) {
                const m = /(\d+)ms/.exec(item)
                const m2 = /(\d+(\.\d+)?)s/.exec(item)
                if (m && m[1]) {
                    values.push( parseInt(m[1]) )
                }
                else if (m2 && m2[1]) {
                    values.push( parseInt(m2[1]) * 1000 )
                }
            }
        })
        return Math.max(...values)
    }

    private setPositionAndSizesToOriginalImage() {
        const positions = this.originalImage.getBoundingClientRect()
        this.image.style.width = `${this.originalImage.clientWidth}px`
        this.image.style.height = `${this.originalImage.clientHeight}px`
        this.image.style.top = `${positions.top}px`
        this.image.style.left = `${positions.left}px`
    }

    private zoomImage() {
        if ( !this.image ) throw Error('Image not found')

        const windowW = window.innerWidth
        const windowH = window.innerHeight
        const naturalWidth = this.image.naturalWidth
        const naturalHeight = this.image.naturalHeight

        // если ширина натуральной картинки больше высоты, то оттаклвиаемся от ширины, иначе от высоты
        const basedOnWidth = naturalWidth > naturalHeight

        // получаем размер ведущей стороны окна
        const windowSizeSize = basedOnWidth ? windowW : windowH

        // определяем какая сторона (ширина/высота) является ведущей
        // "А" - ведущая сторона
        const a = basedOnWidth ? naturalWidth : naturalHeight
        const b = basedOnWidth ? naturalHeight : naturalWidth

        // определим максимальный размер ведущей стороны (по проценту)
        const maxSize = Math.floor((windowSizeSize / 100) * this.getOptions().maxSizePercent)

        // ограничим максимальный размер ведущей стороны, если он превышает допустимый максимум
        const aSize = a > maxSize ? maxSize : a

        // сторону B подгоняем автоматически (уменьшаем размер пропорционально в процентах)
        const cutPx = a > aSize ? a - aSize : 0
        const cutPxInPercent = cutPx / (a / 100)
        const bSize = b - ((b / 100) * cutPxInPercent)

        const w = aSize
        const h = bSize

        const top = (windowH - h) / 2
        const left = (windowW - w) / 2

        this.image.style.width = `${w}px`
        this.image.style.height = `${h}px`
        this.image.style.top = `${top}px`
        this.image.style.left = `${left}px`
    }

    public getOptions(): OptionsRequired {
        return {
            styles: this.options?.styles ?? SmoothZoom.defaultOptions.styles,
            maxSizePercent: this.options?.maxSizePercent ?? SmoothZoom.defaultOptions.maxSizePercent,
        }
    }
}