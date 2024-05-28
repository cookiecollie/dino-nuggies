import {
    ComponentPropsWithRef,
    ComponentPropsWithoutRef,
    ElementType,
    PropsWithChildren,
} from "react"

type AsProp<C extends ElementType> = {
    as?: C
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicRef<C extends ElementType> =
    ComponentPropsWithRef<C>["ref"]

export type PolymorphicProps<
    C extends ElementType,
    P = object,
> = PropsWithChildren<P & AsProp<C>> &
    Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, P>> & {
        ref?: PolymorphicRef<C>
    }
