import { Meta, StoryObj } from "@storybook/react"
import { Select } from "../../components/select"
import countries from "../../mock/countries.json"

export default {
    component: Select,
} as Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {
    render: ({ ...args }) => (
        <div className="w-[25%]">
            <Select {...args}>
                {countries.map((c) => (
                    <Select.Option key={c.code}>{c.name}</Select.Option>
                ))}
            </Select>
        </div>
    ),
}
