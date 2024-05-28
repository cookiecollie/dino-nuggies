import { Meta, StoryObj } from "@storybook/react"
import { MagnetGroup } from "../../components/magnet-group"
import { MagnetItem } from "../../components/magnet-group/MagnetGroup"

export default {
    component: MagnetGroup,
} as Meta<typeof MagnetGroup>

type Story = StoryObj<typeof MagnetGroup>

export const Demo: Story = {
    render: () => (
        <div className="w-full h-[97vh] px-[10%] flex items-center">
            <div className="border-2 rounded-lg w-full p-10">
                <MagnetGroup className="grid grid-cols-2">
                    <MagnetItem className="aspect-video">Item 1</MagnetItem>
                    <MagnetItem>Item 2</MagnetItem>
                    <MagnetItem className="aspect-video">Item 3</MagnetItem>
                    <MagnetItem>Item 4</MagnetItem>
                </MagnetGroup>
            </div>
        </div>
    ),
}
