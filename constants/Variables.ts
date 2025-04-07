import * as Location from "expo-location";

export const BASE_URL = "http://192.168.31.182:8000";
export const LOCATION_REFETCH_CONFIG = {
    accuracy: Location.Accuracy.High,
    timeInterval: 2000,
    distanceInterval: 5,
};
