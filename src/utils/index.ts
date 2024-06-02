import { ItemList, useListItem } from "./ItemList"
import { useDisclosure } from "./hooks"
export { type PolymorphicProps } from "./PolymorphicProps"
export { ItemList, useDisclosure, useListItem }

export const mergeRefs = <T>(
    refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | null>
): React.RefCallback<T> => {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value)
            } else if (ref != null) {
                ;(ref as React.MutableRefObject<T | null>).current = value
            }
        })
    }
}

export const shuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i--; ) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
