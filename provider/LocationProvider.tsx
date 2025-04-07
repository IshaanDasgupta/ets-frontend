import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import * as Location from "expo-location";
import { LOCATION_REFETCH_CONFIG } from "@/constants/Variables";
import { SocketContext } from "./SocketProvider";

export const LocationContext = createContext<
    Location.LocationObject | undefined
>(undefined);

const LocationProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<
        Location.LocationObject | undefined
    >(undefined);

    const socket = useContext(SocketContext);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("no permissions");
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            socket?.emit("update-location", location);
            setLocation(location);

            Location.watchPositionAsync(
                LOCATION_REFETCH_CONFIG,
                (newLocation) => {
                    socket?.emit("update-location", newLocation);
                    setLocation(newLocation);
                }
            );
        })();
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;
