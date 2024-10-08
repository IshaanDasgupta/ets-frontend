import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextField } from "@/components/ThemedTextField";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import socket from "../socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [user, setUser] = useState<any>();
    const [userId, setUserId] = useState<string | null | undefined>(undefined);
    const [inputUserId, setInputUserId] = useState<string>("");

    const handleChange = (text: string) => {
        setInputUserId(text);
    };

    const handelSignIn = async () => {
        try {
            const res = await axios.get(
                `https://ets-backend-t2yw.onrender.com/api/user?user_id=${inputUserId}`
            );
            console.log(res.data);
            setUser(res.data);
            setUserId(res.data._id);
            await AsyncStorage.setItem(
                "userId",
                JSON.stringify(res.data._id).substring(
                    1,
                    JSON.stringify(res.data._id).length - 1
                )
            );
            socket.emit("register", res.data._id);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUser = async (userId: string) => {
        try {
            const res = await axios.get(
                `https://ets-backend-t2yw.onrender.com/api/user?user_id=${userId}`
            );
            console.log(res.data);
            setUser(res.data);
            socket.emit("register", res.data._id);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            setUserId(userId);
            if (userId) {
                fetchUser(userId);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    return (
        <ThemedView style={styles.container}>
            {userId && user ? (
                <ThemedText>{`Hello ${user.first_name} ${user.last_name} !`}</ThemedText>
            ) : userId === null ? (
                <>
                    <ThemedTextField
                        placeholder={"User ID"}
                        floatingPlaceholder
                        onChangeText={(text) => handleChange(text)}
                    />
                    <ThemedButton label="sign in" onPress={handelSignIn} />
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
});
