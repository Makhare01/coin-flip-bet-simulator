import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserSettingsState = {
    betAmount: string;
    setBetAmount: (value: string) => void;
    martingaleEnabled: boolean;
    stopWin: number;
    stopLoss: number;
    isAutoBetting: boolean;
    preferredCrypto: string;
    setMartingale: (value: boolean) => void;
    setStopWin: (value: number) => void;
    setStopLoss: (value: number) => void;
    setIsAutoBetting: (value: boolean) => void;
    setPreferredCrypto: (value: string) => void;
};

export const useUserSettingsStore = create<UserSettingsState>()(
    persist(
        (set) => ({
            betAmount: "0.01",
            martingaleEnabled: false,
            stopWin: 0,
            stopLoss: 0,
            isAutoBetting: false,
            preferredCrypto: "BTC",
            setBetAmount: (value) => set({ betAmount: value }),
            setMartingale: (value) => set({ martingaleEnabled: value }),
            setStopWin: (value) => set({ stopWin: value }),
            setStopLoss: (value) => set({ stopLoss: value }),
            setIsAutoBetting: (value) => set({ isAutoBetting: value }),
            setPreferredCrypto: (value) => set({ preferredCrypto: value }),
        }),
        {
            name: "user-settings",
            partialize: (state) => {
                return ({
                    betAmount: state.betAmount,
                    isAutoBetting: state.isAutoBetting,
                    martingaleEnabled: state.martingaleEnabled,
                    stopWin: state.stopWin,
                    stopLoss: state.stopLoss,
                    preferredCrypto: state.preferredCrypto,
                })
            },
        }
    )
);
