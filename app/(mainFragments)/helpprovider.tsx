import { HelpRequestCard } from "@/components/HelpRequestCard";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import socket from "../socket";

export default function HelpProviderScreen() {
    const [userId, setUserId] = useState<string | null | undefined>(undefined);
    const [helpRequests, setHelpRequests] = useState<any>([]);

    const [acceptedHelp, setAcceptedHelp] = useState(false);

    socket.on("help_request", (payload: any) => {
        setHelpRequests((helpRequests: any) => [...helpRequests, payload]);
    });

    socket.on("help_accept_response", (payload: any) => {
        console.log("help accepted response : ", payload);
        Alert.alert(payload.message);
        if (payload.status === "succesful") {
            setAcceptedHelp(true);
            console.log("help accepted succesfully !!!! should be in DB");
        }
    });

    socket.on("help_reject_response", (payload: any) => {
        console.log("help reject response ", payload);
        Alert.alert(payload.message);
        if (payload.status === "succesful") {
            setAcceptedHelp(true);
            console.log("help accepted succesfully !!!! should be in DB");
        }
    });

    const fetchHelpRequests = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            setUserId(userId);
            if (userId) {
                const res = await axios.get(
                    `https://ets-backend-t2yw.onrender.com/api/help/all?user_id=${userId}`
                );
                console.log("data is", res.data);
                setHelpRequests(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchHelpRequests();
    }, []);

    return (
        <View style={styles.container}>
            {userId ? (
                helpRequests ? (
                    helpRequests.map((helpRequest: any) => {
                        return (
                            <HelpRequestCard
                                data={helpRequest}
                                helpRequests={helpRequests}
                                setHelpRequests={setHelpRequests}
                                userId={userId}
                            />
                        );
                    })
                ) : (
                    <ThemedText>loading..</ThemedText>
                )
            ) : (
                <ThemedText>please sign in fist</ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // height: "100%",
        // justifyContent: "center",
        // alignItems: "center",
    },
});
