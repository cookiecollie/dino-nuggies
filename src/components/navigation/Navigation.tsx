import {
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    RefObject,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"

interface NavigationProps extends HTMLAttributes<HTMLElement> {
    children?: Array<ReactElement<ItemProps>> | ReactElement<ItemProps>
    orientation?: "horizontal" | "vertical"
}

interface NavigationContextTypes {
    handleOnClick: (element: RefObject<HTMLAnchorElement> | null) => void
}

const NavigationContext = createContext<NavigationContextTypes>(
    {} as NavigationContextTypes
)

export const Navigation = (props: NavigationProps) => {
    const { children, orientation = "horizontal", ...others } = props

    const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({})
    const [activeStyle, setActiveStyle] = useState<CSSProperties>({})

    const navigationRef = useRef<HTMLElement>(null)
    const currentHovering = useRef<Element | null>(null)

    useEffect(() => {
        const sync = () => {
            if (currentHovering.current) {
                const bounds = currentHovering.current.getBoundingClientRect()
                const cssVars = {
                    "--nav-indicator-top": bounds.top,
                    "--nav-indicator-right": bounds.right,
                    "--nav-indicator-bottom": bounds.bottom,
                    "--nav-indicator-left": bounds.left,

                    "--nav-indicator-height": bounds.height,
                    "--nav-indicator-width": bounds.width,
                }

                setIndicatorStyle(cssVars as CSSProperties)
            }
        }

        const update = ({ x, y }: { x: number; y: number }) => {
            const element = document
                .elementFromPoint(x, y)
                ?.closest(".nav-item")
            if (element !== currentHovering.current) {
                currentHovering.current = element as Element
                sync()
            }
        }

        navigationRef.current?.addEventListener("pointermove", update)

        return () =>
            navigationRef.current?.removeEventListener("pointermove", update)
    }, [])

    const handleOnClick = useCallback(
        (element: RefObject<HTMLAnchorElement> | null) => {
            if (element !== null) {
                const computedStyle = getComputedStyle(element.current!)

                const itemDimension = {
                    width: computedStyle.getPropertyValue("width"),
                    left: `${element.current!.offsetLeft}px`,

                    top: `${element.current!.offsetTop}px`,
                }

                setActiveStyle({
                    "--nav-active-left": itemDimension.left,
                    "--nav-active-width": itemDimension.width,
                    "--nav-active-top": itemDimension.top,
                } as CSSProperties)
            }
        },
        []
    )

    const navigationContext = useMemo(
        () => ({ handleOnClick }),
        [handleOnClick]
    )

    return (
        <nav
            {...others}
            className="nav-navigation"
            data-orientation={orientation}
            style={{ ...indicatorStyle, ...activeStyle }}
            ref={navigationRef}
        >
            <NavigationContext.Provider value={navigationContext}>
                {children}
            </NavigationContext.Provider>
        </nav>
    )
}

interface ItemProps extends HTMLAttributes<HTMLAnchorElement> {}

export const Item = (props: ItemProps) => {
    const { children, onClick, ...others } = props

    const { handleOnClick } = useContext(NavigationContext)

    const itemRef = useRef<HTMLAnchorElement>(null)

    return (
        <a
            {...others}
            className="nav-item"
            ref={itemRef}
            onClick={(e) => {
                handleOnClick(itemRef)
                onClick ? onClick(e) : null
            }}
            // data-active={to === path}
        >
            {children}
        </a>
    )
}
