import { Meta, StoryObj } from "@storybook/react"
import { Modal } from "../../components/modal"
import { ModalStory } from "./ModalStory"

export default {
    component: Modal,
} as Meta<typeof Modal>

type Story = StoryObj<typeof Modal>

export const Demo: Story = {
    render: () => <ModalStory />,
}
