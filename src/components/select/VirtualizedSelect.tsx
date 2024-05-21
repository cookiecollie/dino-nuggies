import {
    FloatingFocusManager,
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
} from "@floating-ui/react"
import { ChevronDown } from "lucide-react"
import {
    Children,
    PropsWithChildren,
    ReactElement,
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { ArrowKeyStepper, List, ListRowProps } from "react-virtualized"
import { mergeRefs } from "../../utils"
import { SelectProps } from "./Select"

interface ItemContextType {
    selectedIndex: number | undefined
    focusedIndex: number | undefined
    handleSelect: (index: number) => void
    handleFocus: (index: number) => void
}

const ItemContext = createContext<ItemContextType>({} as ItemContextType)

interface VirtualizedSelectProps extends SelectProps {
    overscan?: number
}

export const VirtualizedSelect = (props: VirtualizedSelectProps) => {
    const { children, labelText = "Select...", overscan = 2 } = props

    const [isOpen, setIsOpen] = useState(false)

    const { context, floatingStyles, refs } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom",
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), shift(), flip()],
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: "listbox" })

    const { getFloatingProps, getReferenceProps } = useInteractions([
        click,
        dismiss,
        role,
    ])

    const referenceRef = useRef<HTMLDivElement>(null)

    const referenceMerged = mergeRefs([refs.setReference, referenceRef])

    const labels = useRef<string[]>([])
    const items = useRef<ReactElement[]>([])

    useLayoutEffect(() => {
        labels.current = []
        items.current = []
        Children.forEach(children, (c) => {
            const el = c as ReactElement<VirtualizedOptionProps>
            labels.current.push(el.props.children as string)
            items.current.push(el)
        })
    }, [])

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
        undefined
    )
    const [focusedIndex, setFocusedIndex] = useState<number | undefined>(-1)

    useEffect(() => {
        if (!isOpen && selectedIndex !== undefined)
            setFocusedIndex(selectedIndex)

        if (!isOpen && selectedIndex === undefined) setFocusedIndex(-1)
    }, [isOpen])

    const handleSelect = (index: number) => {
        setSelectedIndex(index)
        setFocusedIndex(index)
        setIsOpen(false)
    }

    const handleFocus = (index: number) => {
        setFocusedIndex(index)
    }

    const itemContext = useMemo(
        () => ({ focusedIndex, handleSelect, selectedIndex, handleFocus }),
        [focusedIndex, handleSelect, selectedIndex, handleFocus]
    )

    return (
        <>
            <div
                ref={referenceMerged}
                {...getReferenceProps()}
                className="select-anchor"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (
                        ["ArrowDown", "ArrowUp", "Enter"].indexOf(e.key) !== -1
                    ) {
                        if (selectedIndex === undefined) setFocusedIndex(0)
                        setIsOpen(!isOpen)
                    }
                }}
            >
                <p>
                    {selectedIndex !== undefined
                        ? labels.current[selectedIndex]
                        : labelText}
                </p>
                <span className="arrow" data-is-open={isOpen}>
                    <ChevronDown size={18} />
                </span>
            </div>

            {isOpen && (
                <FloatingFocusManager context={context} modal={false}>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <ItemContext.Provider value={itemContext}>
                            <ArrowKeyStepper
                                columnCount={1}
                                rowCount={items.current.length}
                                scrollToRow={focusedIndex}
                                onScrollToChange={({ scrollToRow }) =>
                                    setFocusedIndex(scrollToRow)
                                }
                                mode="cells"
                            >
                                {({ onSectionRendered }) => (
                                    <div
                                        className="select-floating"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                focusedIndex !== -1
                                            )
                                                handleSelect(focusedIndex!)
                                        }}
                                    >
                                        <List
                                            width={
                                                referenceRef.current?.getBoundingClientRect()
                                                    .width ?? 0
                                            }
                                            height={240}
                                            rowCount={items.current.length}
                                            rowHeight={40}
                                            rowRenderer={({
                                                index,
                                                key,
                                                style,
                                            }) => (
                                                <Item
                                                    index={index}
                                                    key={key}
                                                    style={style}
                                                >
                                                    {labels.current[index]}
                                                </Item>
                                            )}
                                            onSectionRendered={
                                                onSectionRendered
                                            }
                                            scrollToIndex={focusedIndex}
                                            tabIndex={-1}
                                            overscanRowCount={overscan}
                                        />
                                    </div>
                                )}
                            </ArrowKeyStepper>
                        </ItemContext.Provider>
                    </div>
                </FloatingFocusManager>
            )}
        </>
    )
}

const Item = (
    props: PropsWithChildren<Pick<ListRowProps, "index" | "key" | "style">>
) => {
    const { index, key, style, children } = props

    const { selectedIndex, focusedIndex, handleSelect, handleFocus } =
        useContext(ItemContext)

    return (
        <button
            key={key}
            className="option"
            role="option"
            style={style}
            aria-selected={index === selectedIndex}
            data-focused={index === focusedIndex}
            onClick={() => handleSelect(index)}
            onPointerEnter={() => handleFocus(index)}
            tabIndex={-1}
        >
            {children}
        </button>
    )
}

interface VirtualizedOptionProps extends PropsWithChildren {}
export const VirtualizedOption = (props: VirtualizedOptionProps) => {
    const { children } = props

    return <>{children}</>
}
