import { StyleSheet, ToastAndroid } from "react-native";
import { ThemedView } from "../themedComponents/ThemedView";
import { HelpFormProps } from "@/types/help";
import { ThemedText } from "../themedComponents/ThemedText";
import { ThemedDropdown } from "../themedComponents/ThemedDropdown";
import { ThemedTextInput } from "../themedComponents/ThemedTextInput";
import { useContext, useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedPressable } from "../themedComponents/ThemedPressable";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { SocketContext } from "@/provider/SocketProvider";
import useSocket from "@/hooks/useSocket";

export default function HelpForm({ setOverlay }: HelpFormProps) {
    const inverseColor = useThemeColor({}, "inverse");
    const highlightColor = useThemeColor({}, "highlight");

    const socket = useContext(SocketContext);
    useSocket("help-request-failed", (data) => {
        ToastAndroid.show(data.message, ToastAndroid.LONG);
    });

    const [formData, setFormData] = useState<{
        hospital_name: string;
        issue: string;
        urgency: number;
    }>({ hospital_name: "", issue: "", urgency: 5 });

    const data = [
        { label: "hospital 1", value: "1" },
        { label: "hospital 2", value: "2" },
    ];

    const createHelpRequest = () => {
        try {
            if (!socket) {
                throw new Error();
            }

            socket.emit("send-help-request", formData);
            console.log("here");
        } catch (err) {
            ToastAndroid.show(
                "Could not make the request due to connectivity issues",
                ToastAndroid.LONG
            );
        }
    };

    return (
        <ThemedView type="primary" style={styles.container}>
            <ThemedView style={styles.titleFlex}>
                <ThemedText textType="title" darkColor="#fff" lightColor="#fff">
                    Request Help
                </ThemedText>
                <ThemedPressable
                    type="highlight"
                    style={styles.button}
                    onPress={() => setOverlay(false)}
                >
                    <Entypo name="cross" size={20} color="#fff" />
                </ThemedPressable>
            </ThemedView>

            <ThemedView type="primary" style={styles.helpForm}>
                <ThemedView type="primary" style={styles.formEntryContainer}>
                    <ThemedText
                        textType="large"
                        darkColor="#fff"
                        lightColor="#fff"
                    >
                        Location
                    </ThemedText>
                    <ThemedDropdown
                        data={data}
                        labelField="label"
                        valueField="value"
                        onChange={(item) =>
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    hospital_name: item,
                                };
                            })
                        }
                        type="ternary"
                    />
                    {/* <ThemedText textType="small">error</ThemedText> */}
                </ThemedView>
                <ThemedView type="primary" style={styles.formEntryContainer}>
                    <ThemedText
                        textType="large"
                        darkColor="#fff"
                        lightColor="#fff"
                    >
                        Issue
                    </ThemedText>
                    <ThemedTextInput
                        darkColor="#fff"
                        lightColor="#fff"
                        value={formData.issue}
                        placeholder="Please enter the issue you are facing"
                        onChange={(event) =>
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    issue: event.nativeEvent.text,
                                };
                            })
                        }
                    />
                    {/* <ThemedText textType="small">error</ThemedText> */}
                </ThemedView>
                <ThemedView type="primary" style={styles.formEntryContainer}>
                    <ThemedText
                        textType="large"
                        darkColor="#fff"
                        lightColor="#fff"
                    >
                        Urgency
                    </ThemedText>
                    <Slider
                        value={formData.urgency}
                        onSlidingComplete={(value) =>
                            setFormData((prev) => {
                                return { ...prev, urgency: value };
                            })
                        }
                        minimumValue={0}
                        maximumValue={10}
                        minimumTrackTintColor={highlightColor}
                        maximumTrackTintColor={inverseColor}
                        thumbTintColor={highlightColor}
                        step={1}
                    />
                </ThemedView>
            </ThemedView>

            <ThemedPressable
                type="highlight"
                style={styles.submitButton}
                onPress={() => createHelpRequest()}
            >
                <ThemedText darkColor="#fff" lightColor="#fff">
                    Create Request
                </ThemedText>
            </ThemedPressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "80%",
        padding: 24,
        borderRadius: 20,
        flexDirection: "column",
        gap: 40,
    },
    helpForm: {
        flexDirection: "column",
        gap: 20,
    },
    titleFlex: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    formEntryContainer: {
        flexDirection: "column",
        gap: 5,
    },
    submitButton: {
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
