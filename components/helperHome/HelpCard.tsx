import { StyleSheet } from "react-native";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedText } from "../themedComponents/ThemedText";
import { HelpData } from "@/types/help";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import UrgencyText from "../general/UrgencyText";
import { ThemedPressable } from "../themedComponents/ThemedPressable";

export default function HelpCard(props: HelpData) {
    const textColor = useThemeColor({}, "text");
    const highlightColor = useThemeColor({}, "highlight");

    return (
        <ThemedView style={styles.container} type="secondary">
            <ThemedText textType="large">Ishaan is requesting help!</ThemedText>
            <ThemedView type="secondary" style={styles.infoFlex}>
                <FontAwesome name="building-o" size={16} color={textColor} />
                <ThemedText textType="small">Hospital name</ThemedText>
            </ThemedView>
            <ThemedText textType="small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                aspernatur corporis deleniti quo doloremque recusandae? Quam,
                quae neque. Perferendis, praesentium?
            </ThemedText>
            <ThemedView type="secondary" style={styles.infoFlex}>
                <FontAwesome name="warning" size={14} color={textColor} />
                <ThemedText textType="small">Urgency :</ThemedText>
                <UrgencyText data={8} />
            </ThemedView>
            <ThemedView type="secondary" style={styles.flex}>
                <ThemedView type="secondary" style={styles.infoFlex}>
                    <FontAwesome name="clock-o" size={16} color={textColor} />
                    <ThemedText textType="small">30 min ago</ThemedText>
                </ThemedView>
                <ThemedView type="secondary" style={styles.infoFlex}>
                    <FontAwesome5
                        name="map-marker-alt"
                        size={14}
                        color={textColor}
                    />
                    <ThemedText textType="small">8 km away</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView type="secondary" style={styles.flex}>
                <ThemedPressable
                    type="primary"
                    style={{
                        borderColor: highlightColor,
                        ...styles.actionButton,
                    }}
                >
                    <ThemedText>Reject</ThemedText>
                </ThemedPressable>
                <ThemedPressable
                    type="highlight"
                    style={{
                        borderColor: highlightColor,
                        ...styles.actionButton,
                    }}
                >
                    <ThemedText>Accept</ThemedText>
                </ThemedPressable>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 24,
        borderRadius: 10,
        flexDirection: "column",
        gap: 15,
    },
    infoFlex: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
    },
});
