import { DEFAULT_BALANCES } from "@/lib/constants";
import { StorageKeys } from "@/lib/enums";
import { storage } from "@/storage/local-storage-adapter";
import { randomDelay } from "./_helpers";
import { http } from "./http";

export const handlers = [
    http.post('/api/v1/game/flop-coin', (options) => {
        randomDelay();

        const { betAmount, selectedCrypto } = JSON.parse(options?.body as string)

        return new Promise((resolve) => {
            const isWin = Math.random() < 0.5;

            resolve({
                success: true,
                status: 200,
                data: {
                    isWin,
                    payout: isWin ? betAmount * 2 : 0,
                    result: isWin ? 'win' : 'lose',
                    selectedCrypto,
                    transactionId: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                }
            })
        })
    }),
    http.get("/api/v1/user/settings", () => {
        randomDelay();
        const preferredCrypto = storage.getItem(StorageKeys.SELECTED_CRYPTO) || "btc";
        const balances = storage.getItem(StorageKeys.USER_BALANCE);

        if (!balances) {
            storage.setItem(StorageKeys.USER_BALANCE, DEFAULT_BALANCES);
        }

        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: {
                    preferredCrypto,
                    balances: balances || DEFAULT_BALANCES,
                }
            })
        })
    }),
]