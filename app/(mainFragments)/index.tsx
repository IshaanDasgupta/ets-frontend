import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import socket from "../socket";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, Slider, Text, TextField } from "react-native-ui-lib";
import { ThemedTextField } from "@/components/ThemedTextField";
import { ThemedButton } from "@/components/ThemedButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [locationCoordinates, setLocationCoordinates] = useState<any>(null);

    const [reqeustHelp, setRequestHelp] = useState(false);
    const [helpAccepted, setHelpAccepted] = useState(false);
    const [helpData, setHelpData] = useState({});
    const [acceptedHelpData, setAcceptedHelpData] = useState<any>(null);
    const [helperLocation, setHelperLocation] = useState<any>(null);
    const [helpId, setHelpId] = useState<string | null>(null);

    const [requestingHelp, setRequestingHelp] = useState(false);

    socket.on("connect", () => {
        console.log("Connected to server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });

    socket.on("location_response", (payload: any) => {
        console.log("helper location : ", payload, " lati ", payload.latitude);
        setHelperLocation(payload);
    });

    socket.on("help_request_response", (payload: any) => {
        console.log("help req response", payload);
        Alert.alert(payload.message);
        if (payload.success) {
            setRequestHelp(false);
            setRequestingHelp(true);
            setHelpId(payload.help_id);
        }
    });

    socket.on("help_request_failed", (payload: any) => {
        console.log("help req failed", payload);
        Alert.alert(payload.message);
        setRequestHelp(false);
        setRequestingHelp(false);
    });

    socket.on("help_accepted", async () => {
        console.log("help accepted !!!! should be in DB");
        setRequestHelp(false);
        setRequestingHelp(false);
        setHelpAccepted(true);

        try {
            console.log("help_id : ", helpId);
            const res = await axios.get(
                `https://ets-backend-t2yw.onrender.com/api/help?help_id=${helpId}`
            );

            console.log("accepted help data : ", res.data);
            setAcceptedHelpData(res.data);

            socket.emit("get_user_location", res.data.helper._id);
        } catch (err) {
            console.log(err);
        }
    });

    const fetchUser = async () => {
        const userId: any = await AsyncStorage.getItem("userId");
        socket.emit("register", userId);
    };

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
        fetchUser();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert("Location not enabled", "Please enable your Location", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "Allow the app to use the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ]
            );
        }

        const { coords } = await Location.getCurrentPositionAsync();
        setLocationCoordinates({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });

        setInitialRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });

        socket.emit("update_location", {
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };

    const triggerHelpForm = () => {
        setRequestHelp(!reqeustHelp);
    };

    const handleChange = (key: string, value: string | number) => {
        setHelpData({ ...helpData, [key]: value });
        console.log(helpData);
    };

    const submitHelpRequest = () => {
        console.log("submitting help req");
        socket.emit("request_nearby_users", {
            ...locationCoordinates,
            ...helpData,
        });
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedButton style={styles.toggleButton} label="Toggle"></ThemedButton>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
            >
                {helpAccepted && helperLocation ? (
                    // <ThemedText>{helperLocation.latitude}</ThemedText>
                    <Marker
                        coordinate={{
                            latitude: helperLocation.latitude,
                            longitude: helperLocation.longitude,
                        }}
                        title="Helper"
                        description="ishaan dasgupta"
                    />
                ) : (
                    <ThemedText>loading...</ThemedText>
                )}
            </MapView>

            {!helpAccepted && (
                <ThemedButton
                    style={styles.helpButton}
                    onPress={triggerHelpForm}
                >
                    <Entypo name="plus" size={24} color="#FFFCF2" />
                </ThemedButton>
            )}
            {reqeustHelp && (
                <ThemedView
                    style={styles.helpForm}
                    lightColor="#FFFCF2"
                    darkColor="#252422"
                >
                    <ThemedText type="title">Request help form</ThemedText>
                    <ThemedButton
                        onPress={triggerHelpForm}
                        style={styles.closeButton}
                        size={Button.sizes.xSmall}
                        round
                    >
                        <Entypo name="cross" size={16} color="#FFFCF2" />
                    </ThemedButton>
                    <ThemedTextField
                        placeholder={"Hospital Name"}
                        floatingPlaceholder
                        onChangeText={(text) =>
                            handleChange("hospital_name", text)
                        }
                    />
                    <ThemedTextField
                        placeholder={"Issue"}
                        floatingPlaceholder
                        onChangeText={(text) => handleChange("issue", text)}
                    />
                    <ThemedTextField
                        placeholder={"Tip"}
                        floatingPlaceholder
                        onChangeText={(text) => handleChange("tip", text)}
                    />
                    <View style={styles.urgencyContainer}>
                        <ThemedText>Urgency</ThemedText>
                        <Slider
                            value={5}
                            minimumValue={1}
                            maximumValue={9}
                            step={1}
                            onValueChange={(value) =>
                                handleChange("urgency", value)
                            }
                        />
                    </View>

                    <ThemedButton
                        label="submit request"
                        onPress={submitHelpRequest}
                    />
                </ThemedView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    helpButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 50,
        height: 80,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    helpForm: {
        position: "absolute",
        width: "80%",
        paddingVertical: 50,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "center",
    },
    closeButton: {
        position: "absolute",
        padding: 1,
        right: 20,
        top: 20,
    },
    urgencyContainer: {
        marginTop: 10,
        marginBottom: 30,
    },
    toggleButton:{
        position: 'absolute',
        top: 10,
        right : 60,
        zIndex: 10
    }
});
