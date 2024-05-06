import { Children, PropsWithChildren, ReactNode } from "react"

interface BreadcrumbProps extends PropsWithChildren {}

export const Breadcrumb = (props: BreadcrumbProps) => {
    const { children } = props

    const renderChildren = Array<ReactNode>()
        .concat(
            ...Children.toArray(children).map((c, i) => [
                c,
                <li key={`separator-${i}`}>/</li>,
            ])
        )
        .slice(0, -1)

    return (
        <nav className="breadcrumb">
            <ol>{renderChildren}</ol>
        </nav>
    )
}

interface CrumbProps extends PropsWithChildren {
    href?: string
}
const Crumb = (props: CrumbProps) => {
    const { children, href } = props
    return (
        <li className="crumb">
            <a href={href} className="link" data-is-link={href != null}>
                {children}
            </a>
        </li>
    )
}
Breadcrumb.Crumb = Crumb
