import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextField } from "@/components/ThemedTextField";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import socket from "../socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen() {
    const [userId, setUserId] = useState<string | null>(null);
    const [OTP, setOTP] = useState<string>();

    const verifyOTP = async () => {
        try {
            // const res: any = await axios.get(
            //     `https://ets-backend-t2yw.onrender.com/api/user?user_id=${inputUserId}`
            // );
            // if (!res.sucess) {
            //     ToastAndroid.showWithGravityAndOffset(
            //         `Sign-in failed : ${res.message}`,
            //         ToastAndroid.LONG,
            //         ToastAndroid.BOTTOM,
            //         25,
            //         500
            //     );
            //     return;
            // }
            // console.log(res.data);
            // setUserId(res.data._id);
            // await AsyncStorage.setItem(
            //     "userId",
            //     JSON.stringify(res.data._id).substring(
            //         1,
            //         JSON.stringify(res.data._id).length - 1
            //     )
            // );
            // socket.emit("register", res.data._id);

            navigateToHome();
        } catch (err) {
            ToastAndroid.showWithGravityAndOffset(
                "Could not request back-end",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                500
            );
            console.log(err);
        }
    };

    const navigateToHome = async () => {
        try {
            console.log("going home...");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ThemedView style={styles.container}>
            {userId === null ? (
                <>
                    <ThemedView
                        style={styles.signInContainer}
                        lightColor="#FFFCF2"
                        darkColor="#252422"
                    >
                        <ThemedTextField
                            placeholder={"OTP"}
                            floatingPlaceholder
                            onChangeText={(text) => setOTP(text)}
                        />
                        <ThemedButton
                            style={styles.signInButton}
                            label="Verify OTP"
                            onPress={verifyOTP}
                        />
                    </ThemedView>
                </>
            ) : (
                <ThemedText>loading...</ThemedText>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },

    signInContainer: {
        width: "80%",
        borderRadius: 20,
        padding: 30,
    },

    signInButton: {
        width: "100%",
        marginTop: 20,
    },
});
