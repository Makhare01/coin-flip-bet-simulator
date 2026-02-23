import { getBetHistory } from "@/storage/history";
import { randomDelay } from "../_helpers";
import { http } from "../http";

export const betHistoryHandlers = [
    http.get('/api/v1/history/get-history', async (_options) => {
        await randomDelay();
        const search = _options?.searchParams?.get('search') ?? '';
        const betResult = _options?.searchParams?.get('betResult') ?? undefined;

        const betHistory = getBetHistory(search, betResult);

        return new Promise((resolve) => {
            resolve({
                success: true,
                status: 200,
                data: betHistory,
            })
        })
    }),
]