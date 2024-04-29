import {
    PropsWithChildren,
    createContext,
    useCallback,
    useLayoutEffect,
    useState,
} from "react"

interface TabsContextType {
    registerLabel: (node: Node) => void
    unregisterLabel: (node: Node) => void
    labelsMap: Map<Node, number | null>
    registerContent: (node: Node) => void
    unregisterContent: (node: Node) => void
    labeContent: Map<Node, number | null>
}

const TabsContext = createContext<TabsContextType>({
    registerLabel: () => {},
    unregisterLabel: () => {},
    labelsMap: new Map(),
    registerContent: () => {},
    unregisterContent: () => {},
    labeContent: new Map(),
})

interface TabsProviderProps extends PropsWithChildren {}
export const TabsProvider = (props: TabsProviderProps) => {
    const { children } = props

    const [labelsMap, setLabelsMap] = useState(
        () => new Map<Node, number | null>()
    )
    const [contentMap, setContentMap] = useState(
        () => new Map<Node, number | null>()
    )

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

    return <TabsContext.Provider>{children}</TabsContext.Provider>
}
