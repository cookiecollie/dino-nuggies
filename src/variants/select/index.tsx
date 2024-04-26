import { Placement } from "@floating-ui/react"
import { Variants } from "framer-motion"

export const Floating = (placement: Placement) => {
    if (placement.includes("top"))
        return {
            open: {
                opacity: 1,
                y: 0,
            },
            closed: {
                opacity: 0,
                y: 8,
            },
        } as Variants
    else if (placement.includes("right"))
        return {
            open: {
                opacity: 1,
                y: 0,
            },
            closed: {
                opacity: 0,
                y: 8,
            },
        } as Variants
    else if (placement.includes("bottom"))
        return {
            open: {
                opacity: 1,
                y: 0,
            },
            closed: {
                opacity: 0,
                y: -8,
            },
        } as Variants
    else
        return {
            open: {
                opacity: 1,
                y: 0,
            },
            closed: {
                opacity: 0,
                y: 8,
            },
        } as Variants
}
