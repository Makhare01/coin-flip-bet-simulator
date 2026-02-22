import { StorageKeys } from "@/lib/enums"
import { storage } from "@/storage/local-storage-adapter"
import type { UserSettings } from "@/utils/_types"
import type { HandlerWithContext } from "./http"

export const userSettingsMiddleware = (handler: HandlerWithContext) => {
    const userId = storage.getItem(StorageKeys.USER_ID);
    const users = storage.getItem<UserSettings[]>(StorageKeys.USERS);
    const userSettings = users?.find(user => user.id === userId);

    return (options?: RequestInit) => handler(options, { userSettings })
}