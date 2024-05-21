import { Meta, StoryObj } from "@storybook/react"
import { ReactElement } from "react"

export default {} as Meta<ReactElement>

type Story = StoryObj<ReactElement>

export const Demo: Story = {
    render: () => (
        <div className="w-full h-[97vh] flex items-center justify-center">
            <ul className="demo-grid">
                <li>
                    <a>
                        <p>This is item 1</p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam aliquet sed eros id accumsan. In
                            auctor tincidunt augue, sed luctus nisl. Aliquam
                            erat volutpat.
                        </p>
                    </a>
                </li>

                <li>
                    <a>
                        <p>This is item 2</p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam aliquet sed eros id accumsan. In
                            auctor tincidunt augue, sed luctus nisl. Aliquam
                            erat volutpat.
                        </p>
                    </a>
                </li>

                <li>
                    <a>
                        <p>Dino nuggies forever!</p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam aliquet sed eros id accumsan. In
                            auctor tincidunt augue, sed luctus nisl. Aliquam
                            erat volutpat.
                        </p>
                    </a>
                </li>

                <li>
                    <a>
                        <p>This is item 4</p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam aliquet sed eros id accumsan. In
                            auctor tincidunt augue, sed luctus nisl. Aliquam
                            erat volutpat.
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    ),
}
