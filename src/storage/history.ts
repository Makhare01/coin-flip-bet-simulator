import { StorageKeys } from "@/lib/enums";
import type { BetHistory } from "@/utils/_types";
import { storage } from "./local-storage-adapter";

export const getBetHistory = (search?: string, betResult?: string, limit?: number) => {
    const betHistory = storage.getItem<BetHistory[]>(StorageKeys.BET_HISTORY) ?? [];

    let filteredBetHistory = betHistory;

    if (search) {
        filteredBetHistory = filteredBetHistory.filter((bet) => bet.userName.toLowerCase().includes(search.toLowerCase()));
    }
    if (betResult) {
        filteredBetHistory = filteredBetHistory.filter((bet) => bet.betResult === betResult);
    }

    if (limit) {
        filteredBetHistory = filteredBetHistory.slice(0, limit);
    }

    return filteredBetHistory
}

export const getUserBetHistory = (userId: string) => {
    const betHistory = storage.getItem<BetHistory[]>(StorageKeys.BET_HISTORY) ?? [];
    return betHistory.filter((bet) => bet.userId === userId);
}

export type UserBetStatistics = {
    winLossRatio: number;
    biggestWin: number;
    biggestLoss: number;
    profitLoss: number;
    totalBets: number;
};

export const getUserBetHistoryStatistics = (userId: string): UserBetStatistics => {
    const userBets = getUserBetHistory(userId);

    if (userBets.length === 0) {
        return {
            winLossRatio: 0,
            biggestWin: 0,
            biggestLoss: 0,
            profitLoss: 0,
            totalBets: 0,
        };
    }

    const wins = userBets.filter((bet) => bet.betResult === "win");
    const losses = userBets.filter((bet) => bet.betResult === "loss");

    const biggestWin = wins.length > 0 ? Math.max(...wins.map((bet) => bet.payout)) : 0;
    const biggestLoss = losses.length > 0 ? Math.max(...losses.map((bet) => bet.betAmount)) : 0;

    const profitLoss = userBets.reduce((acc, bet) => {
        return acc + (bet.payout - bet.betAmount);
    }, 0);

    const winLossRatio = losses.length > 0 ? wins.length / losses.length : wins.length;

    return {
        winLossRatio,
        biggestWin,
        biggestLoss,
        profitLoss,
        totalBets: userBets.length,
    };
}

export const setBetHistory = (history: BetHistory[]) => {
    storage.setItem(StorageKeys.BET_HISTORY, history);
}

export const addBetHistory = (history: BetHistory) => {
    const betHistory = getBetHistory();
    betHistory.push(history);
    setBetHistory(betHistory);
}