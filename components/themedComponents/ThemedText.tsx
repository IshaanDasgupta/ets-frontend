import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "text" | "highlight";
    textType?: "title" | "subtitle" | "large" | "default" | "small";
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = "text",
    textType = "default",
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, type);

    return (
        <Text
            style={[
                { color },
                textType === "title" ? styles.title : undefined,
                textType === "subtitle" ? styles.subtitle : undefined,
                textType === "large" ? styles.large : undefined,
                textType === "default" ? styles.default : undefined,
                textType === "small" ? styles.small : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 28,
    },
    defaultSemiBold: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "600",
    },
    large: {
        fontSize: 18,
        lineHeight: 24,
    },
    default: {
        fontSize: 16,
        lineHeight: 18,
    },
    small: {
        fontSize: 14,
        lineHeight: 16,
    },
});
