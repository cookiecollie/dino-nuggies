import { Meta, StoryObj } from "@storybook/react"

export default {} as Meta<typeof HTMLDivElement>

type Story = StoryObj<typeof HTMLDivElement>

export const ScrollMasking: Story = {
    render: () => (
        <div className="w-full h-[97vh] flex items-center justify-center">
            <div className="border-2 rounded-xl overflow-hidden w-[50%] h-[75%]">
                <div className="overflow-auto scroll-mask w-full h-full">
                    <div className="px-4 py-10 flex flex-col gap-4">
                        <p className="font-bold text-3xl">
                            Scroll Masking Demo
                        </p>

                        <p className="font-bold">
                            Scroll-driven masking animation with the use of{" "}
                            <span className="font-mono bg-nikko-400/20 rounded-md px-1">
                                animation-timeline
                            </span>
                        </p>

                        <p className="font-bold italic">
                            Notes: Experimental technology usage. No support for
                            Firefox and Safari.
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam aliquet sed eros id accumsan. In
                            auctor tincidunt augue, sed luctus nisl. Aliquam
                            erat volutpat. Suspendisse velit lorem, ornare vel
                            pellentesque ac, eleifend sit amet ipsum.
                            Pellentesque commodo nunc elit, quis fringilla mi
                            egestas at. Nam accumsan, mi id malesuada mollis,
                            sapien libero lobortis lectus, a ultrices turpis
                            neque et nunc. Morbi pulvinar congue nulla, ut
                            scelerisque nibh aliquet et. Mauris id nisl ac dui
                            molestie varius eu non velit. Integer non elementum
                            ligula, sit amet facilisis lacus.
                        </p>

                        <p>
                            Phasellus nisi dui, auctor nec ante id, luctus
                            molestie tortor. Integer urna eros, rhoncus sit amet
                            dapibus a, blandit ac diam. Mauris facilisis, odio
                            sed ultricies ullamcorper, lacus felis facilisis
                            est, a fermentum odio sem vel justo. Nullam in justo
                            nisl. Ut vehicula, arcu at euismod maximus, erat
                            tortor posuere enim, vel pharetra urna ex ac ante.
                            Duis a tellus ornare purus auctor ultricies eu at
                            turpis. Morbi a ligula id neque dignissim semper et
                            eu justo. Praesent quis consequat nulla. Proin enim
                            eros, sodales sit amet malesuada quis, dignissim eu
                            ligula. Aenean pulvinar ipsum a rutrum condimentum.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Duis non
                            turpis erat. Sed maximus, lorem ut hendrerit
                            rhoncus, dui massa pharetra metus, sed suscipit
                            neque augue quis leo. Phasellus feugiat, nisl et
                            venenatis malesuada, leo tortor rutrum turpis,
                            congue fermentum mi felis id velit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ),
}
