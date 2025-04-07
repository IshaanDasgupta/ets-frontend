import { StyleSheet, ToastAndroid } from "react-native";

import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { router } from "expo-router";
import { ThemedPressable } from "@/components/themedComponents/ThemedPressable";
import { useContext, useEffect, useState } from "react";
import { useAtom } from "jotai/react";
import { accessTokenAtom, userMetadataAtom } from "@/constants/Atom";
import { ThemedTextInput } from "@/components/themedComponents/ThemedTextInput";
import axiosInstance from "@/utils/axiosInstance";
import useSocket from "@/hooks/useSocket";
import { SocketContext } from "@/provider/SocketProvider";

export default function Index() {
    const socket = useContext(SocketContext);
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
    const [userMetadata, setUserMetadata] = useAtom(userMetadataAtom);

    const [name, setName] = useState("");

    const redirect = async () => {
        if (router.canDismiss()) {
            router.dismissAll();
        }

        if (!socket || !userMetadata || !accessToken) {
            console.log("error");
            return;
        }

        socket.emit("register-user", userMetadata.id);
        router.replace("/(tabs)/home");
    };

    const login = async () => {
        try {
            const res = await axiosInstance.post("/auth/signin", {
                first_name: name,
            });

            console.log(res.data);

            setAccessToken(res.data.access_token);
            setUserMetadata(res.data.user_detials);

            ToastAndroid.show(res.data.user_detials.first_name, 2);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ThemedSafeAreaView style={styles.safeAreacontainer}>
            <ThemedView style={styles.container}>
                <ThemedText>index</ThemedText>

                <ThemedTextInput
                    placeholder="type your name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <ThemedPressable
                    type="highlight"
                    style={{ padding: 10, margin: 40 }}
                    onPress={() => login()}
                >
                    <ThemedText>login</ThemedText>
                </ThemedPressable>

                <ThemedPressable type="highlight" onPress={() => redirect()}>
                    <ThemedText>redirect</ThemedText>
                </ThemedPressable>
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
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
});
