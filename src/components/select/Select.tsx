import {
    FloatingFocusManager,
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useFloating,
    useInteractions,
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

interface SelectProps extends PropsWithChildren {
    labelText?: string
}

interface ItemContextType {
    selectedIndex: number | undefined
    focusedIndex: number | undefined
    handleSelect: (index: number) => void
}

const ItemContext = createContext<ItemContextType>({} as ItemContextType)

export const Select = (props: SelectProps) => {
    const { children, labelText = "Select..." } = props

    const [isOpen, setIsOpen] = useState(false)

    const { context, floatingStyles, refs } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom",
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), shift(), flip()],
    })

    const click = useClick(context)

    const { getFloatingProps, getReferenceProps } = useInteractions([click])

    const referenceRef = useRef<HTMLDivElement>(null)

    const referenceMerged = mergeRefs([refs.setReference, referenceRef])

    const labels = useRef<string[]>([])
    const items = useRef<ReactElement[]>([])

    useLayoutEffect(() => {
        Children.forEach(children, (c) => {
            const el = c as ReactElement<OptionProps>
            labels.current.push(el.props.children as string)
            items.current.push(el)
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                isOpen &&
                refs.floating &&
                !refs.floating.current?.contains(event.target as Node) &&
                refs.reference &&
                !referenceRef.current?.contains(event.target as Node)
            )
                setIsOpen(false)
        }

        document.addEventListener("pointerdown", handleClickOutside)

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside)
        }
    }, [isOpen])

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
        undefined
    )
    const [focusedIndex, setFocusedIndex] = useState(0)

    const handleSelect = (index: number) => {
        setSelectedIndex(index)
        setFocusedIndex(index)
        setIsOpen(false)
    }

    const itemContext = useMemo(
        () => ({ focusedIndex, handleSelect, selectedIndex }),
        [focusedIndex, handleSelect, selectedIndex]
    )

    return (
        <>
            <div
                ref={referenceMerged}
                {...getReferenceProps()}
                className="select-anchor"
                tabIndex={0}
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
                        {/* <div
                            className="select-floating"
                            style={{
                                width: `${referenceRef.current?.getBoundingClientRect().width}px`,
                            }}
                        >
                            {children}
                        </div> */}

                        <ItemContext.Provider value={itemContext}>
                            <ArrowKeyStepper
                                columnCount={1}
                                rowCount={items.current.length}
                                isControlled
                                scrollToRow={focusedIndex}
                                onScrollToChange={({ scrollToRow }) =>
                                    setFocusedIndex(scrollToRow)
                                }
                                mode="cells"
                            >
                                {({ onSectionRendered }) => (
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
                                        onSectionRendered={onSectionRendered}
                                        scrollToIndex={focusedIndex}
                                        className="select-floating"
                                    />
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

    const { selectedIndex, focusedIndex, handleSelect } =
        useContext(ItemContext)

    return (
        <button
            key={key}
            className="option"
            style={style}
            data-is-selected={index === selectedIndex}
            data-is-focused={index === focusedIndex}
            onClick={() => handleSelect(index)}
        >
            {children}
        </button>
    )
}

interface OptionProps extends PropsWithChildren {}
const Option = (props: OptionProps) => {
    const { children } = props

    return <>{children}</>
}
Select.Option = Option
