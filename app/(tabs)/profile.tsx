import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";

export default function ProfileScreen() {
    return (
        <ThemedSafeAreaView style={styles.safeAreacontainer}>
            <ThemedView style={styles.container}>
                <ThemedText>profile</ThemedText>
            </ThemedView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreacontainer: {
        flex: 1,
        position: "relative",
    },
    container: {
        flex: 1,
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
});
