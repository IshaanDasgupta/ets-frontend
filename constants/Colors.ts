/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#F45B69";
const tintColorDark = "#F45B69";
const highlightColor = "#F45B69";

export const Colors = {
    light: {
        text: "#11181C",
        primary: "#F2F5F4",
        secondary: "#ABABAA",
        ternary: "#8F9093",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
        inverse: "#000",
        highlight: highlightColor,
    },
    dark: {
        text: "#ECEDEE",
        primary: "#000",
        secondary: "#141414",
        ternary: "#232323",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
        inverse: "#F2F5F4",
        highlight: highlightColor,
    },
};
