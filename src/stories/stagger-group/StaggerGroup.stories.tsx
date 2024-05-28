import { Meta, StoryObj } from "@storybook/react"
import { StaggerChild, StaggerGroup } from "../../components/stagger-group"
import { shuffle } from "../../utils"

export default {
    component: StaggerGroup,
} as Meta<typeof StaggerGroup>

type Story = StoryObj<typeof StaggerGroup>

export const Demo: Story = {
    render: () => (
        <StaggerGroup animationName="test-animation">
            <div className="flex flex-col gap-4">
                {Array(10)
                    .fill(null)
                    .map((c, i) => (
                        <StaggerChild key={`child-${i}`}>
                            <div className="h-4 w-20 bg-nikko-400" />
                        </StaggerChild>
                    ))}
            </div>
        </StaggerGroup>
    ),
}

export const Random: Story = {
    render: () => (
        <StaggerGroup
            animationName="test-animation"
            order={shuffle([...Array(10).keys()])}
        >
            <div className="flex flex-col gap-4">
                {Array(10)
                    .fill(null)
                    .map((c, i) => (
                        <StaggerChild key={`child-${i}`}>
                            <div className="h-4 w-20 bg-nikko-400" />
                        </StaggerChild>
                    ))}
            </div>
        </StaggerGroup>
    ),
}
