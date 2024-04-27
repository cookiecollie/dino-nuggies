/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{html,ts,tsx}", "./src/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "waikawa-gray": {
                    50: "#f2f7fb",
                    100: "#e7f0f8",
                    200: "#d3e2f2",
                    300: "#b9cfe8",
                    400: "#9cb6dd",
                    500: "#839dd1",
                    600: "#6a7fc1",
                    700: "#6374ae",
                    800: "#4a5989",
                    900: "#414e6e",
                    950: "#262c40",
                },

                nikko: {
                    50: "#eef4ff",
                    100: "#dfebff",
                    200: "#bbd1ff",
                    300: "#a3befe",
                    400: "#7f99fa",
                    500: "#6076f4",
                    600: "#434ee8",
                    700: "#353ccd",
                    800: "#2e36a5",
                    900: "#2c3383",
                    950: "#1a1d4c",
                },

                cheeno: {
                    50: "#faf5f2",
                    100: "#ede1d6",
                    200: "#e4d2c4",
                    300: "#d3b49e",
                    400: "#c19176",
                    500: "#b4785b",
                    600: "#a66550",
                    700: "#8a5144",
                    800: "#71443b",
                    900: "#5c3932",
                    950: "#311c19",
                },

                "mine-shaft": {
                    50: "#f6f6f6",
                    100: "#e7e7e7",
                    200: "#d1d1d1",
                    300: "#b0b0b0",
                    400: "#888888",
                    500: "#6d6d6d",
                    600: "#5d5d5d",
                    700: "#4f4f4f",
                    800: "#454545",
                    900: "#3d3d3d",
                    950: "#2e2e2e",
                },

                black: "#2e2e2e",
                white: "#fefefe",
            },

            dropShadow: {
                1: [
                    "0px 1px 2px rgba(0, 0, 0, 0.16)",
                    "0px 3px 6px rgba(0, 0, 0, 0.12)",
                    "0px 5px 12px rgba(0, 0, 0, 0.09)",
                ],
                2: [
                    "0px 3px 6px rgba(0, 0, 0, 0.12)",
                    "0px 6px 16px rgba(0, 0, 0, 0.08)",
                    "0px 9px 28px rgba(0, 0, 0, 0.05)",
                ],
                3: [
                    "0px 6px 16px rgba(0, 0, 0, 0.08)",
                    "0px 9px 28px rgba(0, 0, 0, 0.05)",
                    "0px 12px 48px rgba(0, 0, 0, 0.03)",
                ],
            },
        },
    },
    plugins: [],
}
