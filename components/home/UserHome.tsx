import { StyleSheet } from "react-native";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { useContext, useState } from "react";
import { ThemedLoader } from "@/components/themedComponents/ThemedLoader";
import MapView, { Marker } from "react-native-maps";
import { ThemedPressable } from "../themedComponents/ThemedPressable";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import HelpForm from "../userHome/HelpForm";
import { LocationContext } from "@/provider/LocationProvider";

export default function UserHome() {
    const location = useContext(LocationContext);

    const [overlay, setOverlay] = useState<boolean>(false);

    return (
        <ThemedView style={styles.container}>
            {location ? (
                <>
                    <MapView
                        style={styles.mapContainer}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        />
                    </MapView>
                    <ThemedPressable
                        style={styles.button}
                        type="highlight"
                        onPress={() => setOverlay(true)}
                    >
                        <FontAwesome name="plus" size={20} color="#fff" />
                    </ThemedPressable>
                    {overlay && <HelpForm setOverlay={setOverlay} />}
                </>
            ) : (
                <ThemedLoader size="large" />
            )}
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
    mapContainer: {
        width: "100%",
        height: "100%",
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});
