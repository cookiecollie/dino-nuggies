import {
    FloatingFocusManager,
    FloatingList,
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useListItem,
    useListNavigation,
    useRole,
    useTypeahead,
} from "@floating-ui/react"
import { ChevronDown } from "lucide-react"
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react"
import { mergeRefs } from "../../utils"

interface SelectContextProps {
    focusedIndex: number | null
    selectedIndex: number | null
    getItemProps: ReturnType<typeof useInteractions>["getItemProps"]
    handleSelect: (index: number | null) => void
}

const SelectContext = createContext<SelectContextProps>(
    {} as SelectContextProps
)

export interface SelectProps extends PropsWithChildren {
    labelText?: string
}

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

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

    const elementsRef = useRef<Array<HTMLElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])

    const handleSelect = useCallback((index: number | null) => {
        setSelectedIndex(index)
        setIsOpen(false)
        if (index !== null) setSelectedLabel(labelsRef.current[index])
    }, [])

    const handleTypeahead = (index: number | null) => {
        if (isOpen) setFocusedIndex(index)
        else handleSelect(index)
    }

    const listNav = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex: focusedIndex,
        selectedIndex,
        onNavigate: setFocusedIndex,
    })

    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        activeIndex: focusedIndex,
        selectedIndex,
        onMatch: handleTypeahead,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: "listbox" })

    const { getFloatingProps, getItemProps, getReferenceProps } =
        useInteractions([click, dismiss, role, listNav, typeahead])

    const selectContext = useMemo(
        () => ({
            focusedIndex,
            selectedIndex,
            getItemProps,
            handleSelect,
        }),
        [focusedIndex, selectedIndex, getItemProps, handleSelect]
    )

    const referenceRef = useRef<HTMLDivElement>(null)
    const mergedReferenceRefs = mergeRefs([refs.setReference, referenceRef])

    return (
        <>
            <div
                ref={mergedReferenceRefs}
                {...getReferenceProps()}
                className="select-anchor"
                tabIndex={0}
            >
                <p>{selectedLabel ?? labelText}</p>
                <span className="arrow" data-is-open={isOpen}>
                    <ChevronDown size={18} />
                </span>
            </div>

            <SelectContext.Provider value={selectContext}>
                {isOpen && (
                    <FloatingFocusManager context={context} modal={false}>
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                        >
                            <div
                                className="select-floating"
                                style={{
                                    width: referenceRef.current?.getBoundingClientRect()
                                        .width,
                                }}
                            >
                                <div className="wrapper">
                                    <FloatingList
                                        elementsRef={elementsRef}
                                        labelsRef={labelsRef}
                                    >
                                        {children}
                                    </FloatingList>
                                </div>
                            </div>
                        </div>
                    </FloatingFocusManager>
                )}
            </SelectContext.Provider>
        </>
    )
}

interface OptionProps {
    children: string
}
export const Option = (props: OptionProps) => {
    const { children } = props

    const { focusedIndex, getItemProps, handleSelect, selectedIndex } =
        useContext(SelectContext)

    const { index, ref } = useListItem({ label: children })

    const isFocused = index === focusedIndex
    const isSelected = index === selectedIndex

    return (
        <button
            ref={ref}
            role="option"
            aria-selected={isSelected}
            data-focused={isFocused}
            tabIndex={isFocused ? 0 : -1}
            className="option"
            {...getItemProps({
                onClick: () => handleSelect(index),
            })}
        >
            {children}
        </button>
    )
}
