import { flipCoin } from "@/api/game"
import { useUserSettingsStore } from "@/store/user-settings"
import type { UserSettings } from "@/utils/_types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"

type UseBetSimulationParams = {
    baseBetAmount: number
    preferredCrypto: string
    martingaleEnabled: boolean
    initialBalance: number
    stopWin?: number
    stopLoss?: number
}

export const useBetSimulation = ({
    baseBetAmount,
    preferredCrypto,
    martingaleEnabled,
    stopWin,
    stopLoss,
    initialBalance
}: UseBetSimulationParams) => {
    const queryClient = useQueryClient()

    const [lastBetAmount, setLastBetAmount] = useState<number>(baseBetAmount)
    const [lastResult, setLastResult] = useState<null | boolean>(null)
    const [error, setError] = useState<string | null>(null)
    const isAutoBetting = useUserSettingsStore((state) => state.isAutoBetting);
    const setIsAutoBetting = useUserSettingsStore(
        (state) => state.setIsAutoBetting
    );
    const setBetAmount = useUserSettingsStore((state) => state.setBetAmount);

    const $flipCoin = useMutation({
        mutationKey: ['flip-coin'],
        mutationFn: flipCoin,
        onMutate: () => {
            setError(null)
            queryClient.cancelQueries({ queryKey: ["user-info"] })

            const previousUser = queryClient.getQueryData(["user-info"])

            queryClient.setQueryData(["user-info"], (old: UserSettings) => ({
                ...old,
                balances: { ...old.balances, [preferredCrypto]: old.balances[preferredCrypto] - baseBetAmount }
            }))

            return { previousUser }
        },
        onSuccess: (data) => {
            const { isWin, updatedBalance, updatedUser, lastBetAmount: newLastBetAmount } = data

            setLastResult(isWin)
            setLastBetAmount(newLastBetAmount)

            queryClient.setQueryData(["user-info"], updatedUser)
            queryClient.invalidateQueries({ queryKey: ["user-bet-history-statistics"] })

            // Handle Martingale
            if (martingaleEnabled && isAutoBetting) {
                if (isWin) {
                    setBetAmount(baseBetAmount.toString())
                } else {
                    setBetAmount((Number(baseBetAmount) * 2).toString())
                }
            }

            // Stop conditions
            const totalProfit = updatedBalance - initialBalance

            const shouldStop =
                (stopWin && totalProfit >= stopWin) ||
                (stopLoss && totalProfit <= -stopLoss)

            if (shouldStop) {
                setIsAutoBetting(false)
                return
            }
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const placeSingleBet = useCallback(() => {
        if (baseBetAmount === 0 || baseBetAmount >= initialBalance) {
            setError("Insufficient balance")
            if (isAutoBetting) {
                setIsAutoBetting(false)
            }
            return
        }
        if ($flipCoin.isPending) return

        $flipCoin.mutate({ betAmount: baseBetAmount, preferredCrypto })
    }, [$flipCoin, baseBetAmount, initialBalance, isAutoBetting, setIsAutoBetting, preferredCrypto])

    return {
        placeSingleBet,
        isAutoBetting,
        isBetting: $flipCoin.isPending,
        lastResult,
        error,
        lastBetAmount,
    }
}