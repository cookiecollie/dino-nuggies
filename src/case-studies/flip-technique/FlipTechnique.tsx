import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { getDeltas } from "./flipUtils"

export const FlipTechhnique = () => {
    const squareRef = useRef<HTMLDivElement>(null)

    const [trigger, setTrigger] = useState(false)
    const cacheFirst = useRef<DOMRect | null>(null)

    const handleClick = () => {
        if (squareRef.current) {
            setTrigger(!trigger)
        }
    }

    useEffect(() => {
        if (squareRef.current)
            cacheFirst.current = squareRef.current.getBoundingClientRect()
    }, [trigger])

    useLayoutEffect(() => {
        if (squareRef.current && cacheFirst.current) {
            const boundsFirst = cacheFirst.current
            const boundsLast = squareRef.current.getBoundingClientRect()

            const deltas = getDeltas(boundsFirst, boundsLast)

            squareRef.current.style.transform = `translate(${deltas.x}px, ${deltas.y}px)`

            requestAnimationFrame(() => {
                squareRef.current!.style.transform = ""
            })
        }
    }, [!trigger])

    return (
        <>
            <button onClick={handleClick}>Trigger</button>

            <div className="relative">
                <div
                    className="cs-square"
                    ref={squareRef}
                    data-flip={trigger ? "last" : "first"}
                />
            </div>
        </>
    )
}
