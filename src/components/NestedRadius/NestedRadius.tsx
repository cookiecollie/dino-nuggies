import { PropsWithChildren, createContext, useContext } from "react"

interface RadiusContextType {
    value: {
        radius: number
        padding: number
    }
}

const RadiusContext = createContext<RadiusContextType>({
    value: { padding: 0, radius: 0 },
} as RadiusContextType)

interface NestedRadiusProps extends PropsWithChildren {
    radius?: number
    padding?: number
}

export const useRadius = () => useContext(RadiusContext)

export const Radius = (props: NestedRadiusProps) => {
    const { radius, padding, children } = props

    const { value } = useContext(RadiusContext)

    const nestedRadiusValue = (radius ?? value.radius) - (value.padding ?? 0)

    return (
        <RadiusContext.Provider
            value={{
                value: {
                    radius: nestedRadiusValue > 0 ? nestedRadiusValue : 0,
                    padding: padding ?? value.padding,
                },
            }}
        >
            {children}
        </RadiusContext.Provider>
    )
}
