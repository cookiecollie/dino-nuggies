import {
    Children,
    PropsWithChildren,
    ReactElement,
    isValidElement,
} from "react"

interface SuperSimpleRouterProps extends PropsWithChildren {
    path: string
}

export const SuperSimpleRouter = (props: SuperSimpleRouterProps) => {
    const { children, path } = props

    const renderChildren = Children.map(children, (c) => {
        if (isValidElement(c) && c.type === SuperSimpleRoute) {
            const convertedChild = c as ReactElement<SuperSimpleRouteProps>
            if (convertedChild.props.path === path) return convertedChild
            else return <></>
        }
    })

    return <>{renderChildren}</>
}

interface SuperSimpleRouteProps extends PropsWithChildren {
    path: string
}

export const SuperSimpleRoute = (props: SuperSimpleRouteProps) => {
    const { children } = props

    return <>{children}</>
}
