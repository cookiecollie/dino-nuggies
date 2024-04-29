import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react"

interface ListContextType {
    register: (node: Node) => void
    unregister: (node: Node) => void
    map: Map<Node, number | null>
}

const ListContext = createContext<ListContextType>({
    register: () => {},
    unregister: () => {},
    map: new Map(),
})

interface IsListProps extends PropsWithChildren {}

export const IsList = (props: IsListProps) => {
    const { children } = props

    const [map, setMap] = useState(() => new Map<Node, number | null>())

    const register = useCallback((node: Node) => {
        setMap((prev) => new Map(prev).set(node, null))
    }, [])

    const unregister = useCallback((node: Node) => {
        setMap((prev) => {
            const map = new Map(prev)
            map.delete(node)
            return map
        })
    }, [])

    const sortByDocumentPosition = (a: Node, b: Node) => {
        const pos = a.compareDocumentPosition(b)

        if (
            pos & Node.DOCUMENT_POSITION_FOLLOWING ||
            pos & Node.DOCUMENT_POSITION_CONTAINED_BY
        )
            return -1

        if (
            pos & Node.DOCUMENT_POSITION_PRECEDING ||
            pos & Node.DOCUMENT_POSITION_CONTAINS
        )
            return 1

        return 0
    }

    const areMapsEqual = (
        map1: Map<Node, number | null>,
        map2: Map<Node, number | null>
    ) => {
        if (map1.size !== map2.size) {
            return false
        }

        for (const [k, v] of map1.entries()) {
            if (v !== map2.get(k)) return false
        }

        return true
    }

    useLayoutEffect(() => {
        const newMap = new Map(map)
        const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition)

        nodes.forEach((node, idx) => {
            newMap.set(node, idx)
        })

        if (!areMapsEqual(map, newMap)) setMap(newMap)
    }, [map])

    return (
        <ListContext.Provider
            value={useMemo(
                () => ({ register, unregister, map }),
                [register, unregister, map]
            )}
        >
            {children}
        </ListContext.Provider>
    )
}

export const useCustomListItem = () => {
    const { map, register, unregister } = useContext(ListContext)
    const [index, setIndex] = useState<number | null>(null)

    const componentRef = useRef<Node | null>(null)
    const ref = useCallback((node: HTMLElement | null) => {
        componentRef.current = node
    }, [])

    useLayoutEffect(() => {
        const node = componentRef.current
        if (node) {
            register(node)
            return () => unregister(node)
        }
    }, [register, unregister])

    useLayoutEffect(() => {
        const index = componentRef.current
            ? map.get(componentRef.current)
            : null
        if (index != null) setIndex(index)
    }, [map])

    return useMemo(
        () => ({
            ref,
            index: index == null ? -1 : index,
        }),
        [index, ref]
    )
}
