import { updateUserBalance } from "@/storage/user";
import type { UserSettings } from "@/utils/_types";
import { randomDelay } from "../_helpers";
import { http } from "../http";
import { userSettingsMiddleware } from "../middlewares";

export const gameHandlers = [
    http.post('/api/v1/game/flip-coin', userSettingsMiddleware, async (options, context) => {
        await randomDelay();
        const userSettings = context?.userSettings as UserSettings
        let errorMessage = null

        if (!userSettings) {
            errorMessage = 'User Not Found'
        }

        const { betAmount, preferredCrypto } = JSON.parse(options?.body as string)

        if (!betAmount || !preferredCrypto) {
            errorMessage = 'Bet Amount and Preferred Crypto are required'
        }
        if (betAmount <= 0) {
            errorMessage = 'Bet Amount must be greater than 0'
        }

        const balance = userSettings?.balances[userSettings.preferredCrypto] ?? 0

        if (betAmount > balance) {
            errorMessage = 'Insufficient balance'
        }

        if (errorMessage) {
            return new Promise((_, reject) => {
                reject(new Error(errorMessage))
            })
        }

        return new Promise((resolve) => {
            const isWin = Math.random() < 0.5;

            const updatedUser = updateUserBalance(userSettings.id, isWin ? betAmount : -betAmount, preferredCrypto)

            if (!updatedUser) {
                return new Promise((_, reject) => {
                    reject(new Error('User not found'))
                })
            }

            resolve({
                success: true,
                status: 200,
                data: {
                    isWin,
                    payout: isWin ? betAmount * 2 : 0,
                    transactionId: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                    updatedBalance: updatedUser?.balances[preferredCrypto],
                    updatedUser,
                }
            })
        })
    }),
]