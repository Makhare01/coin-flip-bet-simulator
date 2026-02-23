import { getUsers, removeUserId, setUserId, setUsers } from "@/storage/user";
import type { UserSettings } from "@/utils/_types";
import { DEFAULT_BALANCES } from "@/utils/constants";
import { randomDelay } from "../_helpers";
import { http } from "../http";
import { userSettingsMiddleware } from "../middlewares";

export const userHandlers = [
    http.get("/api/v1/user/info", userSettingsMiddleware, async (_, context) => {
        await randomDelay();

        const currentUser = context?.userSettings as UserSettings

        return new Promise((resolve, reject) => {
            if (!currentUser) {
                return reject(new Error("User not found"));
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

            const users = getUsers();
            const existingUser = users?.find(user => user.name === name)

            if (existingUser) {
                setUserId(existingUser.id)
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

            setUserId(userId)
            setUsers([...(getUsers() ?? []), user])

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
        const users = getUsers() ?? []
        const userIndex = users.findIndex(user => user.id === userSettings.id)
        users[userIndex].preferredCrypto = preferredCrypto
        setUsers(users)

        const updatedUser = users[userIndex]

        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: updatedUser
            })
        })
    }),
    http.delete('/api/v1/user/logout', async () => {
        await randomDelay();

        removeUserId()
        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: null
            })
        })
    })
]