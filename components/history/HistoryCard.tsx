import { StyleSheet } from "react-native";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedText } from "../themedComponents/ThemedText";
import { HelpData } from "@/types/help";
import {
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Fontisto,
    Octicons,
} from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedPressable } from "../themedComponents/ThemedPressable";
import { useAtomValue } from "jotai/react";
import { userMetadataAtom } from "@/constants/Atom";
import UrgencyText from "../general/UrgencyText";

export default function HistoryCard(props: HelpData) {
    const textColor = useThemeColor({}, "text");
    const highlightColor = useThemeColor({}, "highlight");

    const userMetadata = useAtomValue(userMetadataAtom);

    const dummy_data = {
        sender: {
            _id: "1",
            first_name: "ishaan",
            last_name: "dasgupta",
            gender: "male",
            blood_type: "AB+",
        },
        responder: {
            _id: "1",
            first_name: "ishaan",
            last_name: "dasgupta",
            gender: "male",
            blood_type: "AB+",
        },
        latitude: "-10",
        longitude: "-50",
        hospital_name: "charak hospital",
        issue: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, incidunt assumenda atque sint rerum pariatur dolores dolorem debitis veritatis illo.",
        urgency: "5",
        tip: 10,
        date: "10-02-2025",
    };

    const helper = true;
    const userDetails = {
        _id: "1",
        first_name: "ishaan",
        last_name: "dasgupta",
        gender: "male",
        blood_type: "AB+",
    };

    return (
        <ThemedView style={styles.container} type="secondary">
            <ThemedView type="secondary" style={styles.titleFlex}>
                {helper ? (
                    <ThemedText textType="large">
                        {`You helped ${userDetails.first_name} ${userDetails.last_name}!`}
                    </ThemedText>
                ) : (
                    <ThemedText textType="large">
                        {`${userDetails.first_name} ${userDetails.last_name} helped you!`}
                    </ThemedText>
                )}

                <ThemedView type="secondary" style={styles.iconFlex}>
                    <Fontisto name="date" size={16} color={textColor} />
                    <ThemedText textType="small">{dummy_data.date}</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedText textType="default">User Details</ThemedText>
            <ThemedView type="secondary" style={styles.iconFlex}>
                <ThemedText textType="small">Name :</ThemedText>
                <ThemedText textType="small">{`${userDetails.first_name} ${userDetails.last_name}`}</ThemedText>
            </ThemedView>
            <ThemedView type="secondary" style={styles.flex}>
                <ThemedView type="secondary" style={styles.iconFlex}>
                    <ThemedText textType="small">Blood group :</ThemedText>
                    <ThemedText textType="small">
                        {userDetails.blood_type}
                    </ThemedText>
                </ThemedView>
                <ThemedView type="secondary" style={styles.iconFlex}>
                    <ThemedText textType="small">Gender :</ThemedText>
                    <ThemedText textType="small">
                        {userDetails.gender}
                    </ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView type="primary" style={styles.seperator} />

            <ThemedText textType="default">Request Details</ThemedText>
            <ThemedView type="secondary" style={styles.iconFlex}>
                <FontAwesome name="building-o" size={16} color={textColor} />
                <ThemedText textType="small">
                    {dummy_data.hospital_name}
                </ThemedText>
            </ThemedView>
            <ThemedText textType="small">{dummy_data.issue}</ThemedText>
            <ThemedView type="secondary" style={styles.flex}>
                <ThemedView type="secondary" style={styles.iconFlex}>
                    <FontAwesome name="warning" size={14} color={textColor} />
                    <ThemedText textType="small">Urgency :</ThemedText>
                    <UrgencyText data={8} />
                </ThemedView>
                {dummy_data.tip && (
                    <ThemedView type="secondary" style={styles.iconFlex}>
                        <FontAwesome
                            name="dollar"
                            size={14}
                            color={textColor}
                        />
                        <ThemedText textType="small">
                            {`${dummy_data.tip} Rs.`}
                        </ThemedText>
                    </ThemedView>
                )}
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
    titleFlex: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconFlex: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    section: {
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },
    seperator: {
        width: "100%",
        height: 2,
        borderRadius: 10,
        marginVertical: 5,
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    issueFlex: {
        flexDirection: "column",
    },
    issueLabel: {
        alignSelf: "flex-start",
    },
    actionButton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
    },
});
