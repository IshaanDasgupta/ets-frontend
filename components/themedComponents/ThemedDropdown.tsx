import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { AntDesign } from "@expo/vector-icons";

export type ThemedDropdownProps = DropdownProps<any> & {
    lightColor?: string;
    darkColor?: string;
    type: "primary" | "secondary" | "ternary" | "highlight";
};

export function ThemedDropdown({
    style,
    lightColor,
    darkColor,
    type = "primary",
    ...otherProps
}: ThemedDropdownProps) {
    const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, type);

    const styles = StyleSheet.create({
        container: {
            borderRadius: 10,
            borderColor: "#fff",
        },
        default: {
            borderRadius: 10,
            backgroundColor: backgroundColor,
            padding: 12,
        },
        item: {
            padding: 24,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
    });

    const renderItem = (item: any) => {
        return (
            <ThemedView style={styles.item} type={type}>
                <ThemedText
                    style={{ color: type == "highlight" ? "#fff" : textColor }}
                >
                    {item.label}
                </ThemedText>
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <Dropdown
                style={[styles.default, style]}
                renderItem={renderItem}
                placeholderStyle={{
                    color: type == "highlight" ? "#fff" : textColor,
                }}
                selectedTextStyle={{
                    color: type == "highlight" ? "#fff" : textColor,
                }}
                containerStyle={{ borderWidth: 0, backgroundColor }}
                {...otherProps}
            />
        </ThemedView>
    );
}
