import react from "@vitejs/plugin-react"
import { readFile, writeFile } from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"

const WRONG_CODE =
    'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";'

function reactVirtualizedFixed() {
    return {
        name: "fixed:react-virtualized",
        async configResolved() {
            const reactVirtualizedPath = path.dirname(
                fileURLToPath(import.meta.resolve("react-virtualized"))
            )

            const brokenPath = path.join(
                reactVirtualizedPath,
                "..",
                "es",
                "WindowScroller",
                "utils",
                "onScroll.js"
            )

            const brokenCode = await readFile(brokenPath, "utf-8")

            const fixedCode = brokenCode.replace(WRONG_CODE, "")
            await writeFile(brokenPath, fixedCode)
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), reactVirtualizedFixed()],
})
