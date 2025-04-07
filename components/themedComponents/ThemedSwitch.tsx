import ToggleSwitch, { ToggleSwitchProps } from "toggle-switch-react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedToggleSwitchProps = ToggleSwitchProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "primary" | "secondary" | "ternary" | "highlight";
};

export function ThemedToggleSwitch({
    lightColor,
    darkColor,
    type = "highlight",
    ...otherProps
}: ThemedToggleSwitchProps) {
    const onColor = useThemeColor({ light: lightColor, dark: darkColor }, type);

    return (
        <ToggleSwitch onColor={onColor} offColor={onColor} {...otherProps} />
    );
}
