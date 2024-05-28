import {
    CSSProperties,
    HTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react"

interface IndicatorStyleType
    extends Pick<CSSProperties, "backgroundColor" | "borderRadius"> {}

interface MagnetGroupProps extends HTMLAttributes<HTMLDivElement> {
    indicatorStyle?: IndicatorStyleType
}

export const MagnetGroup = (props: MagnetGroupProps) => {
    const { children, className, style, indicatorStyle, ...others } = props

    const magnetGroupRef = useRef<HTMLDivElement>(null)
    const hoveringRef = useRef<Element | null>(null)

    const [indicatorBaseStyle, setIndicatorBaseStyle] = useState<CSSProperties>(
        {}
    )

    useEffect(() => {
        const sync = () => {
            if (hoveringRef.current) {
                const bounds = hoveringRef.current.getBoundingClientRect()
                const cssVars = {
                    "--magnet-group-indicator-top": bounds.top,
                    "--magnet-group-indicator-right": bounds.right,
                    "--magnet-group-indicator-bottom": bounds.bottom,
                    "--magnet-group-indicator-left": bounds.left,

                    "--magnet-group-indicator-height": bounds.height,
                    "--magnet-group-indicator-width": bounds.width,

                    "--magnet-group-indicator-color":
                        indicatorStyle?.backgroundColor,
                    "--magnet-group-indicator-rounded":
                        indicatorStyle?.borderRadius,
                }

                setIndicatorBaseStyle(cssVars as CSSProperties)
            }
        }

        const update = ({ x, y }: { x: number; y: number }) => {
            const element = document
                .elementFromPoint(x, y)
                ?.closest(".magnet-group-item")

            if (element !== hoveringRef.current) {
                hoveringRef.current = element as Element
                sync()
            }
        }

        magnetGroupRef.current?.addEventListener("pointermove", update)
        return () =>
            magnetGroupRef.current?.removeEventListener("pointermove", update)
    }, [])

    return (
        <div
            {...others}
            className={`magnet-group-wrapper ${className}`}
            style={{ ...indicatorBaseStyle, ...style }}
            ref={magnetGroupRef}
        >
            {children}
        </div>
    )
}

interface MagnetItemProps extends HTMLAttributes<HTMLDivElement> {}

export const MagnetItem = (props: MagnetItemProps) => {
    const { children, className, ...others } = props

    return (
        <div {...others} className={`magnet-group-item ${className}`}>
            {children}
        </div>
    )
}
