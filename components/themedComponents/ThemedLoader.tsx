import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";

export type ThemedLoaderProps = ActivityIndicatorProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedLoader({
    lightColor,
    darkColor,
    ...otherProps
}: ThemedLoaderProps) {
    const color = useThemeColor(
        { light: lightColor, dark: darkColor },
        "inverse"
    );

    return <ActivityIndicator color={color} {...otherProps} />;
}
