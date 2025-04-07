import { StyleSheet } from "react-native";

import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ThemedLoader } from "@/components/themedComponents/ThemedLoader";
import MapView, { Marker } from "react-native-maps";
import Header from "@/components/general/Header";
import { useAtomValue } from "jotai/react";
import { homeAtom } from "@/constants/Atom";
import { HomeType } from "@/types/general";
import UserHome from "@/components/home/UserHome";
import HelperHome from "@/components/home/HelperHome";
import HelpInProgressHome from "@/components/home/HelpInProgressHome";
import LocationProvider from "@/provider/LocationProvider";

export default function HomeScreeen() {
    const home = useAtomValue(homeAtom);

    return (
        <ThemedSafeAreaView style={styles.safeAreacontainer}>
            <Header />
            <LocationProvider>
                <ThemedView style={styles.container}>
                    {home == HomeType.USER_HOME && <UserHome />}
                    {home == HomeType.HELPER_HOME && <HelperHome />}
                    {home == HomeType.HELP_IN_PROGRESS && (
                        <HelpInProgressHome />
                    )}
                </ThemedView>
            </LocationProvider>
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
    mapContainer: {
        width: "100%",
        height: "100%",
    },
});
