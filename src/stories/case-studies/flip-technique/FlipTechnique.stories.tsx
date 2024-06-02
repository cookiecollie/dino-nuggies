import { Meta, StoryObj } from "@storybook/react"
import { FlipTechhnique } from "../../../case-studies/flip-technique"

export default {
    component: FlipTechhnique,
} as Meta<typeof FlipTechhnique>

type Story = StoryObj<typeof FlipTechhnique>

export const Demo: Story = {
    render: () => <FlipTechhnique />,
}
