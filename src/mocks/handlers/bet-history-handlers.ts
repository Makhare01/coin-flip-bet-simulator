import { getBetHistory, getUserBetHistoryStatistics } from "@/storage/history";
import type { UserSettings } from "@/utils/_types";
import { randomDelay } from "../_helpers";
import { http } from "../http";
import { userSettingsMiddleware } from "../middlewares";

export const betHistoryHandlers = [
    http.get('/api/v1/history/get-history', async (_options) => {
        await randomDelay();
        const search = _options?.searchParams?.get('search') ?? '';
        const betResult = _options?.searchParams?.get('betResult') ?? undefined;
        const limit = _options?.searchParams?.get('limit');

        const betHistory = getBetHistory(search, betResult, Number(limit));

        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: betHistory,
            })
        })
    }),
    http.get("/api/v1/history/statistics", userSettingsMiddleware, async (_options, context) => {
        await randomDelay();
        const userSettings = context?.userSettings as UserSettings

        if (!userSettings) {
            return new Promise((_, reject) => {
                reject(new Error('Unauthorized'))
            })
        }

        const userBetHistoryStatistics = getUserBetHistoryStatistics(userSettings.id);

        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: userBetHistoryStatistics,
            })
        })
    })
]