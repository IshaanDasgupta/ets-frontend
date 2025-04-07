import {
    Pressable,
    StyleProp,
    ViewStyle,
    type PressableProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPressableProps = PressableProps & {
    style?: StyleProp<ViewStyle>;
    lightColor?: string;
    darkColor?: string;
    type?: "primary" | "secondary" | "ternary" | "highlight";
};

export function ThemedPressable({
    style,
    lightColor,
    darkColor,
    type = "primary",
    ...otherProps
}: ThemedPressableProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return <Pressable style={[{ backgroundColor }, style]} {...otherProps} />;
}
