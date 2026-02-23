import { useBetSimulation } from "@/hooks/use-bet-simulation";
import { useUser } from "@/hooks/use-user";
import { useUserSettingsStore } from "@/store/user-settings";
import { useIsMutating } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { AutoBettingOptions } from "./auto-betting-options";
import { BetAmount } from "./bet-amount";
import { FlipCoin } from "./flip-coin";
import { PlaceBet } from "./place-bet";

export const BetSettings = () => {
    const { userInfo } = useUser();
    const isAutoBetting = useUserSettingsStore((s) => s.isAutoBetting);
    const setIsAutoBetting = useUserSettingsStore((s) => s.setIsAutoBetting);
    const preferredCrypto = useUserSettingsStore((s) => s.preferredCrypto);
    const martingaleEnabled = useUserSettingsStore((s) => s.martingaleEnabled);
    const stopWin = useUserSettingsStore((s) => s.stopWin);
    const stopLoss = useUserSettingsStore((s) => s.stopLoss);
    const betAmount = useUserSettingsStore((s) => s.betAmount);
    const setBetAmount = useUserSettingsStore((s) => s.setBetAmount);

    const isSettingCrypto =
        useIsMutating({
            mutationKey: ["set-user-favorite-crypto"],
        }) > 0;

    const isBetAmountInvalid = Number(betAmount) <= 0 || isNaN(Number(betAmount));


    const { placeSingleBet, isBetting, lastResult, error, lastBetAmount } = useBetSimulation({
        baseBetAmount: isBetAmountInvalid ? 0 : Number(betAmount),
        preferredCrypto,
        martingaleEnabled,
        initialBalance: userInfo?.balances[preferredCrypto] ?? 0,
        stopWin,
        stopLoss,
    });

    return (
        <div className="w-full rounded-lg bg-card">
            <div className="flex items-center bg-card-foreground rounded-t-lg p-4 py-6 border-b border-gray-800">
                <Settings className="size-8 text-primary" />
                <h1 className="text-xl font-bold ml-2">Bet Settings</h1>
            </div>

            <div className="p-4 mt-4">
                <FlipCoin
                    isFlipping={isBetting}
                    isWin={lastResult}
                    onFlipComplete={() => {
                        if (isAutoBetting) {
                            // wait for 1 second before placing next bet
                            // to prevent spamming the bet
                            setTimeout(() => {
                                placeSingleBet();
                            }, 1000);
                        }
                    }}
                    isError={!!error}
                    betAmount={lastBetAmount}
                    preferredCrypto={preferredCrypto}
                />
                <BetAmount
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                    maxBalance={userInfo?.balances[preferredCrypto] ?? 0}
                    preferredCrypto={preferredCrypto}
                    error={error}
                />

                <PlaceBet
                    onPlaceBet={placeSingleBet}
                    onAutoBet={() => {
                        setIsAutoBetting(true);
                        placeSingleBet();
                    }}
                    isDisabled={isBetting || isSettingCrypto}
                    stopAutoBet={() => setIsAutoBetting(false)}
                    isAutoBetting={isAutoBetting}
                />

                <AutoBettingOptions isAutoBetting={isAutoBetting} />
            </div>
        </div>
    );
};
