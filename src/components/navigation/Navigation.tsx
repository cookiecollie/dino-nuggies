import {
    Children,
    HTMLAttributes,
    ReactElement,
    RefObject,
    createContext,
    useContext,
    useEffect,
    useRef
} from "react"

interface NavigationProps extends HTMLAttributes<HTMLElement> {
    children?: Array<ReactElement<ItemProps>> | ReactElement<ItemProps>
}

interface NavigationContextTypes {
    setHoveringItem: (item: RefObject<ReactElement<ItemProps>> | null) => void
}

const NavigationContext = createContext<NavigationContextTypes>(
    {} as NavigationContextTypes
)

export const Navigation = (props: NavigationProps) => {
    const { children, ...others } = props

    const childrenList = useRef<ReactElement<ItemProps>[]>([])

    useEffect(() => {
        childrenList.current = Children.toArray(
            children
        ) as ReactElement<ItemProps>[]
    }, [])

    return (
        <nav {...others} className="nav-navigation">
            <NavigationContext.Provider value={navigationContext}>
                {children}
            </NavigationContext.Provider>
        </nav>
    )
}

interface ItemProps extends HTMLAttributes<HTMLAnchorElement> {}

export const Item = (props: ItemProps) => {
    const { children, ...others } = props

    const { setHoveringItem } = useContext(NavigationContext)

    return (
        <a {...others} className="nav-item">
            {children}
        </a>
    )
}
