import { StyleSheet } from "react-native";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useAtomValue } from "jotai/react";
import { userMetadataAtom } from "@/constants/Atom";
import axiosInstance from "@/utils/axiosInstance";
import { HelpData } from "@/types/help";
import HistoryCard from "@/components/history/HistoryCard";

export default function HistoryScreen() {
    const userMetadata = useAtomValue(userMetadataAtom);

    const [loading, setLoading] = useState<boolean>(true);
    const [helpHistory, setHelpHistory] = useState();

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get("/help-request/history");
                console.log(res.data.help_history);
                setHelpHistory(res.data.help_history);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const helpArray: Array<HelpData> = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ];

    return (
        <ThemedSafeAreaView style={styles.safeAreacontainer}>
            <ThemedView style={styles.container}>
                <FlatList
                    data={helpArray}
                    renderItem={(helpData) => (
                        <HistoryCard {...helpData.item} />
                    )}
                    keyExtractor={(helpData) => helpData.id.toString()}
                    ItemSeparatorComponent={() => (
                        <ThemedView type="secondary" style={styles.seperator} />
                    )}
                />
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
        padding: 24,
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    seperator: {
        marginVertical: 10,
    },
});
