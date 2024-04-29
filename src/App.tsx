import { Tabs } from "./components/tabs"

export const App = () => {
    return (
        <div className="w-[50%] h-full flex mx-auto items-center">
            <div className="w-full h-96 border rounded-xl p-4 border-mine-shaft-200">
                <p className="text-xl font-bold px-4">Tabs</p>
                <hr className="py-2 mt-2" />
                <Tabs>
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
            </div>
        </div>
    )
}
