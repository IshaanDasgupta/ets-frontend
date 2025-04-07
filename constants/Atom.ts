import { HomeType, UserMetadata } from "@/types/general";
import { atomWithAsyncStorage, storage } from "@/utils/store";

export const homeAtom = atomWithAsyncStorage(
    "home",
    <HomeType>HomeType.USER_HOME
);

export const accessTokenAtom = atomWithAsyncStorage(
    "access-token",
    <string | undefined>undefined
);

export const userMetadataAtom = atomWithAsyncStorage(
    "user-metadata",
    <UserMetadata | undefined>undefined
);

export const userIdAtom = atomWithAsyncStorage("user_id", <string | null>null);

export const getAccessToken = async () => {
    return await storage.getItem("access-token", undefined);
};
