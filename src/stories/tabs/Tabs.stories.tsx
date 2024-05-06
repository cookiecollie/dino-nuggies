import { Meta, StoryObj } from "@storybook/react"
import { Tabs } from "../../components/tabs"

const meta: Meta<typeof Tabs> = {
    component: Tabs,
}
export default meta

type TabsStory = StoryObj<typeof Tabs>

export const Default: TabsStory = {
    render: ({ ...args }) => (
        <Tabs {...args}>
            <Tabs.Labels>
                <Tabs.Label>Label 1</Tabs.Label>
                <Tabs.Label>Label 2</Tabs.Label>
                <Tabs.Label>Label 3 | Longer Label</Tabs.Label>
            </Tabs.Labels>

            <Tabs.Panels>
                <Tabs.Panel>Content 1</Tabs.Panel>
                <Tabs.Panel>Content 2</Tabs.Panel>
                <Tabs.Panel>Content 3</Tabs.Panel>
            </Tabs.Panels>
        </Tabs>
    ),
}
