import { Image, StyleSheet, Switch, useColorScheme } from "react-native";

import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@//components/themedComponents/ThemedView";
import { ThemedToggleSwitch } from "../themedComponents/ThemedSwitch";
import { useState } from "react";
import { useAtom } from "jotai/react";
import { homeAtom } from "@/constants/Atom";
import { HomeType } from "@/types/general";

export default function Header() {
    const theme = useColorScheme() ?? "light";

    const [home, setHome] = useAtom(homeAtom);

    const changeHomeType = () => {
        if (home == HomeType.USER_HOME) {
            setHome(HomeType.HELPER_HOME);
            return;
        }

        setHome(HomeType.USER_HOME);
    };

    return (
        <ThemedView style={styles.container}>
            <Image
                style={styles.logo}
                source={
                    theme == "dark"
                        ? require("@/assets/images/banner/logoIcon-1x-darkTheme.png")
                        : require("@/assets/images/banner/logoIcon-1x-lightTheme.png")
                }
            />
            {home != HomeType.HELP_IN_PROGRESS && (
                <ThemedToggleSwitch
                    isOn={home == HomeType.USER_HOME}
                    onToggle={() => changeHomeType()}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        width: 25,
        height: 25,
    },
});
