import { StorageKeys } from "@/lib/enums";
import { storage } from "@/storage/local-storage-adapter";
import type { UserSettings } from "@/utils/_types";
import { DEFAULT_BALANCES } from "@/utils/constants";
import { randomDelay } from "./_helpers";
import { http } from "./http";
import { userSettingsMiddleware } from "./middlewares";

export const handlers = [
    http.post('/api/v1/game/flop-coin', userSettingsMiddleware, async (options, context) => {
        await randomDelay();
        const userSettings = context?.userSettings as UserSettings

        if (!userSettings) {
            return new Promise((_, reject) => {
                reject(new Error('Unauthorized'))
            })
        }

        const { betAmount } = JSON.parse(options?.body as string)
        const { preferredCrypto } = userSettings

        return new Promise((resolve) => {
            const isWin = Math.random() < 0.5;

            resolve({
                success: true,
                status: 200,
                data: {
                    isWin,
                    payout: isWin ? betAmount * 2 : 0,
                    result: isWin ? 'win' : 'lose',
                    selectedCrypto: preferredCrypto,
                    transactionId: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                }
            })
        })
    }),
    http.get("/api/v1/user/info", async () => {
        await randomDelay();

        const userId = storage.getItem(StorageKeys.USER_ID);

        return new Promise((resolve, reject) => {
            if (!userId) {
                reject(new Error("Unauthorized"));
            }

            const users = storage.getItem<UserSettings[]>(StorageKeys.USERS);

            const currentUser = users?.find(user => user.id === userId);

            if (!currentUser) {
                reject(new Error("User not found"));
            }

            resolve({
                success: true,
                status: 200,
                data: currentUser
            })
        })
    }),
    http.post('/api/v1/user/start-playing', async (options) => {
        await randomDelay();
        const { name } = JSON.parse(options?.body as string)

        return new Promise((resolve, reject) => {
            if (!name) {
                reject(new Error('Name is required'))
            }

            const users = storage.getItem<UserSettings[]>(StorageKeys.USERS)
            const existingUser = users?.find(user => user.name === name)

            if (existingUser) {
                storage.setItem(StorageKeys.USER_ID, existingUser.id)
                return resolve({
                    success: true,
                    status: 200,
                    data: existingUser
                })
            }

            const userId = crypto.randomUUID()

            const user: UserSettings = {
                id: userId,
                name,
                preferredCrypto: Object.keys(DEFAULT_BALANCES)[0],
                balances: DEFAULT_BALANCES
            }

            storage.setItem(StorageKeys.USER_ID, userId)
            storage.setItem(StorageKeys.USERS, [...(storage.getItem<UserSettings[]>(StorageKeys.USERS) ?? []), user])

            return resolve({
                success: true,
                status: 200,
                data: user
            })
        })
    }),
    http.patch('/api/v1/user/set-favorite-crypto', userSettingsMiddleware, async (options, context) => {
        await randomDelay();
        const userSettings = context?.userSettings as UserSettings

        if (!userSettings) {
            return new Promise((_, reject) => {
                reject(new Error('Unauthorized'))
            })
        }

        const { preferredCrypto } = JSON.parse(options?.body as string)
        const users = storage.getItem<UserSettings[]>(StorageKeys.USERS) ?? []
        const userIndex = users.findIndex(user => user.id === userSettings.id)
        users[userIndex].preferredCrypto = preferredCrypto
        storage.setItem(StorageKeys.USERS, users)

        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: preferredCrypto
            })
        })
    }),
    http.delete('/api/v1/user/logout', async () => {
        await randomDelay();

        storage.removeItem(StorageKeys.USER_ID);
        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: null
            })
        })
    })
]