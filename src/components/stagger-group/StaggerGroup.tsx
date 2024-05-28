import {
    CSSProperties,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { ItemList, useListItem } from "../../utils"

interface StaggerGroupProps extends PropsWithChildren {
    animationName: string
    delay?: string
    duration?: string
    order?: Array<number>
}

interface StaggerContextType {
    order: Array<number>
}

const StaggerContext = createContext<StaggerContextType>(
    {} as StaggerContextType
)

export const StaggerGroup = (props: StaggerGroupProps) => {
    const { animationName, delay, duration, children, order = [] } = props

    const [animationProperties, setAnimationProperties] =
        useState<CSSProperties>({})

    useEffect(() => {
        const cssVars = {
            "--stagger-group-animation-name": animationName,
            "--stagger-group-animation-delay": delay,
            "--stagger-group-animation-duration": duration,
        }

        setAnimationProperties(cssVars as CSSProperties)
    }, [])

    const orderArray = useRef<Array<number>>([])

    const orderCheck = () => {
        const staggerChildrenLength =
            document.querySelectorAll(".stagger-child").length
        if (order.length > 0) {
            if (staggerChildrenLength > order.length) {
                const remainingSpace = staggerChildrenLength - order.length
                orderArray.current = order.concat(
                    Array(remainingSpace).fill(Math.max(...order))
                )
            } else orderArray.current = order
        }
    }

    useLayoutEffect(() => {
        orderCheck()
    }, [order])

    return (
        <div className="stagger-group" style={{ ...animationProperties }}>
            <StaggerContext.Provider value={{ order: orderArray.current }}>
                <ItemList>{children}</ItemList>
            </StaggerContext.Provider>
        </div>
    )
}

interface StaggerChildProps extends PropsWithChildren {
    animationOrder?: number
}

export const StaggerChild = (props: StaggerChildProps) => {
    const { children, animationOrder } = props

    const { index, ref } = useListItem()
    const { order } = useContext(StaggerContext)

    const [animationProperties, setAnimationProperties] =
        useState<CSSProperties>({})

    useLayoutEffect(() => {
        const cssVars = {
            "--stagger-group-animation-order":
                animationOrder ?? order[index] ?? index + 1,
        }

        setAnimationProperties(cssVars as CSSProperties)
    }, [index, order.length])

    return (
        <div
            className="stagger-child"
            ref={ref}
            style={{ ...animationProperties }}
        >
            {children}
        </div>
    )
}
