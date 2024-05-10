import { LayoutGroup, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import {
    Children,
    PropsWithChildren,
    ReactNode,
    useEffect,
    useState,
} from "react"

interface BreadcrumbProps extends PropsWithChildren {
    onBackCallback?: () => void
}

export const Breadcrumb = (props: BreadcrumbProps) => {
    const { children, onBackCallback } = props

    const childrenAsArray = Children.toArray(children)

    const [showBack, setShowBack] = useState(false)

    useEffect(() => {
        if (childrenAsArray.length > 1) setShowBack(true)
        else setShowBack(false)
    }, [children])

    const renderChildren = Array<ReactNode>()
        .concat(
            ...childrenAsArray.map((c, i) => [
                c,
                <motion.li layout key={`separator-${i}`}>
                    /
                </motion.li>,
            ])
        )
        .slice(0, -1)

    return (
        <motion.nav className="breadcrumb">
            <LayoutGroup>
                {showBack && (
                    <motion.a
                        onClick={onBackCallback}
                        className="arrow"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ArrowLeft />
                    </motion.a>
                )}

                <motion.ol layout>{renderChildren}</motion.ol>
            </LayoutGroup>
        </motion.nav>
    )
}

interface CrumbProps extends PropsWithChildren {
    href?: string
}
const Crumb = (props: CrumbProps) => {
    const { children, href } = props
    return (
        <motion.li className="crumb" layout>
            <a href={href} className="link" data-is-link={href != null}>
                {children}
            </a>
        </motion.li>
    )
}
Breadcrumb.Crumb = Crumb
