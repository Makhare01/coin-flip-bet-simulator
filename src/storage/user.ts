import { StorageKeys } from "@/lib/enums";
import type { UserSettings } from "@/utils/_types";
import { storage } from "./local-storage-adapter";

export const getUserSettings = () => {
    const userSettings = storage.getItem<UserSettings>(StorageKeys.USER_BALANCE);

    return userSettings;
}

export const setUserSettings = (userSettings: UserSettings) => {
    storage.setItem(StorageKeys.USER_BALANCE, userSettings);
}