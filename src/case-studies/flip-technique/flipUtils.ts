export const getDeltas = (boundsFirst: DOMRect, boundsLast: DOMRect) => {
    const deltas: Omit<DOMRect, "toJSON"> = {
        top: boundsFirst.top - boundsLast.top,
        bottom: boundsFirst.bottom - boundsLast.bottom,
        left: boundsFirst.left - boundsLast.left,
        right: boundsFirst.right - boundsLast.right,
        height: boundsFirst.height - boundsLast.height,
        width: boundsFirst.width - boundsLast.width,
        x: boundsFirst.x - boundsLast.x,
        y: boundsFirst.y - boundsLast.y,
    }

    return deltas
}
