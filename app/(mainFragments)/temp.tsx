import { StyleSheet, View, Alert, TouchableOpacity, DrawerLayoutAndroid, Image} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import socket from "../socket";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, Slider, Text, TextField } from "react-native-ui-lib";
import { ThemedTextField } from "@/components/ThemedTextField";
import { ThemedButton } from "@/components/ThemedButton";
import axios from "axios";

export default function HomeScreen() {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [locationCoordinates, setLocationCoordinates] = useState<any>(null);
    const drawer = useRef<DrawerLayoutAndroid>(null);

    const navigationView = () => (
        <View style={styles.drawerContainer}>
          <Text style={styles.header}>Service Provider Information</Text>
          
          {/* <Image 
            source={{ uri: person.image }} 
            style={styles.image} 
          /> */}
          
          <View style={styles.infoContainer}>
            <Text style={styles.paragraph}>First Name: Ishan</Text>
            <Text style={styles.paragraph}>Last Name: Dasgupta</Text>
            <Text style={styles.paragraph}>Phone Number: 7898261362</Text>
          </View>
      
          <Button
            label="Close Info"
            onPress={() => drawer.current?.closeDrawer()}
          />
        </View>
      );
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
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

    };


    return (
        <ThemedView style={styles.container}>
            
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition='right'
                renderNavigationView={navigationView}>
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                        showsUserLocation
                        provider={PROVIDER_GOOGLE}
                    >
                        {/* {helpAccepted && helperLocation ? (
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
                        )} */}
                        <Marker
                            coordinate={{
                                latitude: locationCoordinates.latitude,
                                longitude: locationCoordinates.longitude,
                            }}
                            title="Helper"
                            description="ishaan dasgupta"
                        />
                    </MapView>
                <View style={styles.container}>
                    <Button
                    label="Show Helper Information"
                    onPress={() => drawer.current?.openDrawer()}
                    />
                </View>
            </DrawerLayoutAndroid>
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
        height: "80%",
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
    drawerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      navigationContainer: {
        backgroundColor: '#ecf0f1',
        height: '100%',
      },
      paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
      },
      infoContainer: {
        marginBottom: 20,
      },
});
