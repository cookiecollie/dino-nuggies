import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { ItemList, useListItem } from "../../utils"

interface TabsProps extends PropsWithChildren {
    hasIndicator?: boolean
}

interface TabsContextType {
    handleSelect: (index: number) => void
    selectedIndex: number
}

const TabsContext = createContext<TabsContextType>({} as TabsContextType)

export const Tabs = (props: TabsProps) => {
    const { children } = props

    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    const handleSelect = useCallback((index: number) => {
        setSelectedIndex(index)
    }, [])

    return (
        <div className="tabs">
            <TabsContext.Provider
                value={useMemo(
                    () => ({
                        handleSelect,
                        selectedIndex,
                    }),
                    [handleSelect, selectedIndex]
                )}
            >
                {children}
            </TabsContext.Provider>
        </div>
    )
}

interface CommonProps extends PropsWithChildren {}

interface LabelsContextType {
    onClickGetStyle: (width: number, left: number) => void
}

const LabelsContext = createContext<LabelsContextType>({} as LabelsContextType)

const Labels = (props: CommonProps) => {
    const { children } = props

    const [indicatorStyle, setIndicatorStyle] = useState<{
        width: number
        left: number
    }>({ width: 0, left: 0 })

    const onClickGetStyle = useCallback((width: number, left: number) => {
        setIndicatorStyle({ width: width, left: left })
    }, [])

    return (
        <div className="labels">
            <LabelsContext.Provider
                value={useMemo(() => ({ onClickGetStyle }), [onClickGetStyle])}
            >
                <ItemList>{children}</ItemList>
            </LabelsContext.Provider>

            <span
                className="indicator"
                style={{
                    width: `${indicatorStyle.width}px`,
                    transform: `translateX(${indicatorStyle.left}px)`,
                }}
            />
        </div>
    )
}
Tabs.Labels = Labels

const Label = (props: CommonProps) => {
    const { children } = props

    const { index, ref } = useListItem()

    const { handleSelect, selectedIndex } = useContext(TabsContext)

    const { onClickGetStyle } = useContext(LabelsContext)

    const handleOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const element = event.currentTarget
        const width = parseInt(
            getComputedStyle(element).getPropertyValue("width")
        )
        const left = element.offsetLeft

        handleSelect(index)
        onClickGetStyle(width, left)
    }

    useEffect(() => {
        if (index === 0) {
            const firstLabel = document.querySelector(".label[data-index='0']")
            const width = parseInt(
                getComputedStyle(firstLabel!).getPropertyValue("width")
            )

            onClickGetStyle(width, 0)
        }
    }, [index])

    return (
        <button
            ref={ref}
            onClick={handleOnClick}
            className="label"
            data-index={index}
            data-selected={selectedIndex === index}
        >
            {children}
        </button>
    )
}
Tabs.Label = Label

const Panels = (props: CommonProps) => {
    const { children } = props

    return (
        <div className="panels">
            <ItemList>{children}</ItemList>
        </div>
    )
}
Tabs.Panels = Panels

const Panel = (props: CommonProps) => {
    const { children } = props

    const { index, ref } = useListItem()

    const { selectedIndex } = useContext(TabsContext)

    return (
        <div
            ref={ref}
            data-selected={selectedIndex === index}
            className="panel"
        >
            {children}
        </div>
    )
}
Tabs.Panel = Panel
