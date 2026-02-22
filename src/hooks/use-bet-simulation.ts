import { placeBet } from "@/api/betApi"
import type { Cryptos } from "@/utils/_types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"

type UseBetSimulationParams = {
    currency: Cryptos
    baseBetAmount: number
    martingaleEnabled: boolean
    stopWin?: number
    stopLoss?: number
    initialBalance: number
}

export const useBetSimulation = ({
    currency,
    baseBetAmount,
    martingaleEnabled,
    stopWin,
    stopLoss,
    initialBalance
}: UseBetSimulationParams) => {
    const queryClient = useQueryClient()

    const [isAutoBetting, setIsAutoBetting] = useState(false)
    const [currentBetAmount, setCurrentBetAmount] = useState(baseBetAmount)
    const [lastResult, setLastResult] = useState<null | boolean>(null)

    const autoBetRef = useRef(false)
    const accumulatedProfitRef = useRef(0)

    const mutation = useMutation({
        mutationKey: ['bet-simulation'],
        mutationFn: ({ amount }: { amount: number }) =>
            placeBet({ currency, amount }),
        onSuccess: (data) => {
            const { win, updatedBalance } = data

            setLastResult(win)

            const profitChange = win
                ? currentBetAmount
                : -currentBetAmount

            accumulatedProfitRef.current += profitChange

            // Update cached user data
            queryClient.invalidateQueries({ queryKey: ["user"] })
            queryClient.invalidateQueries({ queryKey: ["history"] })

            // Handle Martingale
            if (martingaleEnabled) {
                if (win) {
                    setCurrentBetAmount(baseBetAmount)
                } else {
                    setCurrentBetAmount((prev) => prev * 2)
                }
            }

            // Stop conditions
            const totalProfit = updatedBalance - initialBalance

            const shouldStop =
                (stopWin && totalProfit >= stopWin) ||
                (stopLoss && totalProfit <= -stopLoss)

            if (shouldStop) {
                stopAutoBet()
                return
            }

            // Continue auto-bet if enabled
            if (autoBetRef.current) {
                triggerBet()
            }
        }
    })

    const triggerBet = useCallback(() => {
        if (mutation.isPending) return

        mutation.mutate({ amount: currentBetAmount })
    }, [mutation, currentBetAmount])

    const placeSingleBet = useCallback(() => {
        triggerBet()
    }, [triggerBet])

    const startAutoBet = useCallback(() => {
        if (isAutoBetting) return

        autoBetRef.current = true
        setIsAutoBetting(true)
        triggerBet()
    }, [isAutoBetting, triggerBet])

    const stopAutoBet = useCallback(() => {
        autoBetRef.current = false
        setIsAutoBetting(false)
        setCurrentBetAmount(baseBetAmount)
    }, [baseBetAmount])

    // Reset bet amount if base changes
    useEffect(() => {
        setCurrentBetAmount(baseBetAmount)
    }, [baseBetAmount])

    return {
        placeSingleBet,
        startAutoBet,
        stopAutoBet,
        isAutoBetting,
        isBetting: mutation.isPending,
        currentBetAmount,
        lastResult
    }
}