import { HTMLAttributes, createContext, useContext } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    path?: string
}

interface CardContextType {
    setPath: (path: string) => void
}

export const CardContext = createContext<CardContextType>({} as CardContextType)

export const Card = (props: CardProps) => {
    const { children, path = "", ...others } = props

    const { setPath } = useContext(CardContext)

    return (
        <div {...others} className="card" onClick={() => setPath(path)}>
            {children}
        </div>
    )
}
