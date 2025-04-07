import { FlatList, StyleSheet } from "react-native";

import { ThemedView } from "@//components/themedComponents/ThemedView";
import HelpCard from "../helperHome/HelpCard";
import { HelpData } from "@/types/help";

export default function HelperHome() {
    const helpArray: Array<HelpData> = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ];

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={helpArray}
                renderItem={(helpData) => <HelpCard {...helpData.item} />}
                keyExtractor={(helpData) => helpData.id.toString()}
                ItemSeparatorComponent={() => (
                    <ThemedView type="secondary" style={styles.seperator} />
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        width: "100%",
    },
    seperator: {
        marginVertical: 10,
    },
});
