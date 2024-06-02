import { Modal, useModal } from "../../components/modal"

export const ModalStory = () => {
    const { isOpen, onClose, onOpen } = useModal()

    return (
        <>
            <button onClick={onOpen}>Open Modal</button>

            <Modal isOpen={isOpen} onClose={onClose}>
                Modal
            </Modal>
        </>
    )
}
