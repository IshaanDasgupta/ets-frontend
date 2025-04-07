import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "primary" | "secondary" | "ternary" | "highlight";
};

export function ThemedView({
    style,
    lightColor,
    darkColor,
    type = "primary",
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
