import {
    SafeAreaView,
    type SafeAreaViewProps,
} from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedSafeAreaViewProps = SafeAreaViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "primary" | "secondary" | "ternary";
};

export function ThemedSafeAreaView({
    style,
    lightColor,
    darkColor,
    type = "primary",
    ...otherProps
}: ThemedSafeAreaViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return (
        <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
    );
}
