import { PropsWithChildren } from "react"
import { useDisclosure } from "../../utils"

interface ModalProps extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
}

export const Modal = (props: ModalProps) => {
    const { onClose, isOpen, children } = props

    return (
        <>
            {isOpen && (
                <>
                    <div className="modal-backdrop" onClick={onClose} />

                    <div className="modal-wrapper">
                        <div className="modal-main">{children}</div>
                    </div>
                </>
            )}
        </>
    )
}

export const useModal = () => useDisclosure()
