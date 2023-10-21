/**
 * @param smallerWindowSize - меньший размер окна браузера
 * @param percentageSizeLimit - ограничение размера в процентах (процент от smallerWindowSize)
 * @param a - если в @smallerWindowSize указана ширина окна, значит здесь указать ширину картинки, иначе высоту
 * @param b - ширина/высота картинки - противоположная параметру @a
 */
export default function calc(smallerWindowSize: number, percentageSizeLimit: number, a: number, b: number) {
    // определим максимальный размер от меньшей стороны окна (по проценту)
    let maxSize = Math.floor((smallerWindowSize / 100) * percentageSizeLimit)

    // если натуральный размер стороны картинки больше максимального, то установим максимальный размер
    // иначе установим натуральный размер стороны картинки
    const sizeA = a > maxSize ? maxSize : a // подогнать

    // другую сторону подгоняем автоматически (уменьшаем ширину пропорционально в процентах)
    const cutPx = a > sizeA ? a - sizeA : 0
    const cutPxInPercent = cutPx / (a / 100)
    const sizeB = b - ((b / 100) * cutPxInPercent)

    return { sizeA, sizeB }
}