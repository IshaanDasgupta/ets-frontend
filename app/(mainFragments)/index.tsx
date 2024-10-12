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
import UserHomeScreen from "@/screens/UserHomeScreen";
import RescuerHomeScreen from "@/screens/RescuerHomeScreen";
import TempHome from "./temp";
import { ThemedHeader } from "@/components/ThemedHeader";

export default function HomeScreen() {
    const [screenState, setScreenState] = useState<string | null>(null);

    const fetchHome = async () => {
        let home: string | null = await AsyncStorage.getItem("home");
        if (home === null) {
            await AsyncStorage.setItem("home", "User Home");
            home = "User Home";
        }
        setScreenState(home);
    };

    useEffect(() => {
        fetchHome();
    }, []);

    return (
        <>
            {screenState !== null && (
                <>
                    {screenState != "InProgress Home" && (
                        <>
                            <ThemedHeader
                                headerText={screenState}
                                setScreenState={setScreenState}
                                toggle
                            />
                            {screenState === "User Home" && <UserHomeScreen />}
                            {screenState === "Rescuer Home" && (
                                <RescuerHomeScreen />
                            )}
                        </>
                    )}

                    {screenState === "InProgress Home" && (
                        <>
                            <ThemedHeader
                                headerText={screenState}
                                setScreenState={setScreenState}
                            />
                            <TempHome />
                        </>
                    )}
                </>
            )}

            {screenState === null && (
                <ThemedView style={styles.container}>
                    <ThemedText>loading...</ThemedText>
                </ThemedView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
});
