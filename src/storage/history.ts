import { StorageKeys } from "@/lib/enums";
import type { BetHistory } from "@/utils/_types";
import { storage } from "./local-storage-adapter";

export const getBetHistory = (search?: string, betResult?: string) => {
    const betHistory = storage.getItem<BetHistory[]>(StorageKeys.BET_HISTORY) ?? [];

    let filteredBetHistory = betHistory;

    if (search) {
        filteredBetHistory = filteredBetHistory.filter((bet) => bet.userName.toLowerCase().includes(search.toLowerCase()));
    }
    if (betResult) {
        filteredBetHistory = filteredBetHistory.filter((bet) => bet.betResult === betResult);
    }

    return filteredBetHistory.slice(0, 20);
}

export const setBetHistory = (history: BetHistory[]) => {
    storage.setItem(StorageKeys.BET_HISTORY, history);
}

export const addBetHistory = (history: BetHistory) => {
    const betHistory = getBetHistory();
    betHistory.push(history);
    setBetHistory(betHistory);
}