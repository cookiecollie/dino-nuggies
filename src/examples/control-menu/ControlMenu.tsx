import { ReactNode, useState } from "react"
import { Card, CardContext } from "../../components/card"
import { SuperSimpleRoute, SuperSimpleRouter } from "./SuperSimpleRouter"

export const ControlMenu = () => {
    const [path, setPath] = useState<string[]>(["Home"])

    const renderBreadcrumb = Array<ReactNode>()
        .concat(
            ...path.map((p, i) => [
                <span key={`crumb-${p}`}>{p}</span>,
                <span key={`separator-${i}`}>/</span>,
            ])
        )
        .slice(0, -1)

    const handleConcatPath = (path: string) => {
        setPath((old) => [...old, path])
    }

    return (
        <div className="wrapper">
            <div className="breadcrumb">
                {path.length > 1 && (
                    <span
                        onClick={() => {
                            setPath((old) => old.slice(0, old.length - 1))
                        }}
                    >
                        Back
                    </span>
                )}
                {renderBreadcrumb}
            </div>

            <SuperSimpleRouter path={path.at(-1) ?? ""}>
                <SuperSimpleRoute path="Home">
                    <div className="wrapper-cards">
                        <div className="card-grid">
                            <CardContext.Provider
                                value={{ setPath: handleConcatPath }}
                            >
                                <Card path="Dino">Dino</Card>
                                <Card path="Nuggies">Nuggies</Card>
                                <Card path="#">Card 3</Card>
                                <Card path="#">Card 4</Card>
                                <Card path="#">Card 5</Card>
                            </CardContext.Provider>
                        </div>
                    </div>
                </SuperSimpleRoute>

                <SuperSimpleRoute path="Dino">Dino</SuperSimpleRoute>
                <SuperSimpleRoute path="Nuggies">Nuggies!</SuperSimpleRoute>
                <SuperSimpleRoute path="#">Blank</SuperSimpleRoute>
            </SuperSimpleRouter>
        </div>
    )
}
