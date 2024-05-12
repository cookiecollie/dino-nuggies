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
import { Children, PropsWithChildren, useEffect, useRef, useState } from "react"
import { List } from "react-virtualized"
import { mergeRefs } from "../../utils"

interface SelectProps extends PropsWithChildren {}

export const Select = (props: SelectProps) => {
    const { children } = props

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

    const childrenAsArray = Children.toArray(children)

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

    return (
        <>
            <div
                ref={referenceMerged}
                {...getReferenceProps()}
                className="select-anchor"
                tabIndex={0}
            >
                <p>anchor</p>
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

                        <List
                            width={
                                referenceRef.current?.getBoundingClientRect()
                                    .width ?? 0
                            }
                            height={240}
                            rowCount={childrenAsArray.length}
                            rowHeight={40}
                            rowRenderer={({ index, key, style }) => (
                                <button
                                    key={key}
                                    className="option"
                                    style={style}
                                >
                                    {childrenAsArray[index]}
                                </button>
                            )}
                            className="select-floating"
                        />
                    </div>
                </FloatingFocusManager>
            )}
        </>
    )
}

interface OptionProps extends PropsWithChildren {}
const Option = (props: OptionProps) => {
    const { children } = props

    return <>{children}</>
}
Select.Option = Option
