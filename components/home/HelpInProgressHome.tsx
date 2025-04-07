import { StyleSheet } from "react-native";

import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedText } from "../themedComponents/ThemedText";

export default function HelpInProgressHome() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>help in progress</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
});
