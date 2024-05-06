import { Meta, StoryObj } from "@storybook/react"
import { Breadcrumb } from "../../components/breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
    component: Breadcrumb,
}
export default meta

type BreadcrumbStory = StoryObj<typeof Breadcrumb>

export const NoLinks: BreadcrumbStory = {
    render: ({ ...args }) => (
        <Breadcrumb {...args}>
            <Breadcrumb.Crumb>Home</Breadcrumb.Crumb>
            <Breadcrumb.Crumb>Level 1</Breadcrumb.Crumb>
            <Breadcrumb.Crumb>Level 2</Breadcrumb.Crumb>
        </Breadcrumb>
    ),
}

export const WithLinks: BreadcrumbStory = {
    render: ({ ...args }) => (
        <Breadcrumb {...args}>
            <Breadcrumb.Crumb href="#">Home</Breadcrumb.Crumb>
            <Breadcrumb.Crumb href="#">Level 1</Breadcrumb.Crumb>
            <Breadcrumb.Crumb href="#">Level 2</Breadcrumb.Crumb>
        </Breadcrumb>
    ),
}
