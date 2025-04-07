import { StyleSheet } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";
import { ThemedView } from "../themedComponents/ThemedView";

export default function UrgencyText({ data }: { data: number }) {
    const getBackgroundColor = (): string => {
        if (data < 5) {
            return "#FB9235";
        }
        return "#A31B1B";
    };

    return (
        <ThemedView
            style={{
                backgroundColor: getBackgroundColor(),
                ...styles.container,
            }}
        >
            <ThemedText
                darkColor="#fff"
                lightColor="#fff"
                textType="small"
                style={{
                    margin: 0,
                    padding: 0,
                    marginBottom: -2,
                    marginLeft: -1,
                }}
            >
                {data}
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        borderRadius: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
