import { Meta, StoryObj } from "@storybook/react"
import { Navigation } from "../../components/navigation"
import { Item } from "../../components/navigation/Navigation"

export default {
    component: Navigation,
} as Meta<typeof Navigation>

type Story = StoryObj<typeof Navigation>

export const Demo: Story = {
    render: () => (
        <Navigation>
            <Item>Nav link 1</Item>
            <Item>Nav link 2</Item>
            <Item>Nav link 3</Item>
        </Navigation>
    ),
}
