import { Meta, StoryObj } from "@storybook/react"
import {
    Select,
    VirtualizedOption,
    VirtualizedSelect,
} from "../../components/select"
import { Option } from "../../components/select/Select"
import countries from "../../mock/countries.json"

export default {
    component: VirtualizedSelect,
} as Meta<typeof VirtualizedSelect>

type Story = StoryObj<typeof VirtualizedSelect>

export const Virtualized: Story = {
    render: ({ ...args }) => (
        <div className="min-w-[25%] w-fit">
            <VirtualizedSelect {...args}>
                {countries.map((c) => (
                    <VirtualizedOption key={c.code}>{c.name}</VirtualizedOption>
                ))}
            </VirtualizedSelect>
        </div>
    ),
}

export const Default: Story = {
    render: ({ ...args }) => (
        <div className="min-w-[25%] w-fit">
            <Select {...args}>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
                <Option>Option 4</Option>
                <Option>Option 5</Option>
                <Option>Option 6</Option>
                <Option>Option 7</Option>
                <Option>Option 8</Option>
                <Option>Option 9</Option>
                <Option>Option 10</Option>
            </Select>
        </div>
    ),
}
