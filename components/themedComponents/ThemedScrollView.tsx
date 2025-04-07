import { ScrollView, type ScrollViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "primary" | "secondary" | "ternary";
};

export function ThemedScrollView({
    style,
    lightColor,
    darkColor,
    type = "primary",
    ...otherProps
}: ThemedScrollViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
