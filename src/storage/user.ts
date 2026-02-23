import { StorageKeys } from "@/lib/enums";
import type { UserSettings } from "@/utils/_types";
import { storage } from "./local-storage-adapter";

export const getUserId = () => {
    return storage.getItem<string>(StorageKeys.USER_ID);
}

export const setUserId = (userId: string) => {
    storage.setItem(StorageKeys.USER_ID, userId);
}

export const getUsers = () => {
    return storage.getItem<UserSettings[]>(StorageKeys.USERS) ?? [];
}

export const removeUserId = () => {
    storage.removeItem(StorageKeys.USER_ID);
}

export const getCurrentUser = () => {
    return getUsers()?.find((user: UserSettings) => user.id === getUserId());
}

export const setUsers = (users: UserSettings[]) => {
    storage.setItem(StorageKeys.USERS, users);
}

export const updateUserBalance = (userId: string, amount: number, preferredCrypto: string) => {
    const users = getUsers()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
        return null
    }

    const updatedUsers = [...users]
    updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        preferredCrypto,
        balances: {
            ...updatedUsers[userIndex].balances,
            [preferredCrypto]: updatedUsers[userIndex].balances[preferredCrypto] + amount
        }
    }

    setUsers(updatedUsers)

    return updatedUsers[userIndex]
}