import { Meta, StoryObj } from "@storybook/react"
import { Select } from "../../components/select"

export default {
    component: Select,
} as Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {
    render: ({ ...args }) => (
        <div className="w-[25%]">
            <Select {...args}>
                <Select.Option>Option 1</Select.Option>
                <Select.Option>Option 2</Select.Option>
                <Select.Option>Option 3</Select.Option>
            </Select>
        </div>
    ),
}
