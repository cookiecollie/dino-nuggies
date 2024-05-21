import { Meta, StoryObj } from "@storybook/react"
import {
    Select,
    VirtualizedOption,
    VirtualizedSelect,
} from "../../components/select"
import { Option } from "../../components/select/Select"
import countries from "../../mock/countries.json"

export default {
    component: Select,
    subcomponents: { VirtualizedSelect },
} as Meta<typeof Select>

type SelectStory = StoryObj<typeof Select>
type VirtualizedSelectStory = StoryObj<typeof VirtualizedSelect>

export const Virtualized: VirtualizedSelectStory = {
    render: ({ ...args }) => (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p>Countries list</p>

                <div className="min-w-[25%] w-fit">
                    <VirtualizedSelect {...args}>
                        {countries.map((c) => (
                            <VirtualizedOption key={c.code}>
                                {c.name}
                            </VirtualizedOption>
                        ))}
                    </VirtualizedSelect>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p>10000 items</p>

                <div className="min-w-[25%] w-fit">
                    <VirtualizedSelect {...args}>
                        {Array.from({ length: 10000 }, (item, idx) => (
                            <VirtualizedOption key={idx}>
                                {`Item ${idx}`}
                            </VirtualizedOption>
                        ))}
                    </VirtualizedSelect>
                </div>
            </div>
        </div>
    ),
}

export const Default: SelectStory = {
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
