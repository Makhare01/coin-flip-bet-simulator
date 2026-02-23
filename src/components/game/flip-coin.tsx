import animationData from "@/assets/coin-flip-animation.json";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { CheckCircle, Coins, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FlipCoinProps = {
    isFlipping: boolean;
    isWin: boolean | null;
    betAmount: number;
    preferredCrypto: string;
    onFlipComplete: () => void;
    isError?: boolean
};

export const FlipCoin = ({ isFlipping, isWin, betAmount, preferredCrypto, onFlipComplete, isError }: FlipCoinProps) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (!lottieRef.current) return;

        if (isFlipping) {
            queueMicrotask(() => setShowResult(false));
            lottieRef.current.goToAndStop(0, true);
            lottieRef.current.play();
        }
    }, [isFlipping]);

    return (
        <div className="flex flex-col items-center justify-center gap-6 relative mb-8">
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                autoplay={false}
                loop={false} // important
                style={{ height: "400px" }}
                onComplete={() => {
                    // Only show result after animation fully ends
                    if (!isFlipping) {
                        setShowResult(true);
                        onFlipComplete();
                    }
                }}
            />
            <div className="text-2xl font-bold h-[400px] w-full absolute top-0 left-0 flex items-center justify-center">
                {(isWin === null && !isFlipping && !showResult) || isError ? (
                    <Coins className="size-40 text-gray-500" />
                ) : (
                    showResult && (
                        <>
                            {isWin ? (
                                <div className="flex flex-col items-center justify-center">
                                    <CheckCircle className="size-40 text-green-500" />
                                    <div className="text-2xl font-bold text-center text-green-500">You Win {betAmount.toFixed(6)} {preferredCrypto}</div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <XCircle className="size-40 text-red-500" />
                                    <div className="text-2xl font-bold text-center text-red-500">You Lose {betAmount.toFixed(6)} {preferredCrypto}</div>
                                </div>
                            )}
                        </>
                    )
                )}
            </div>
        </div>
    );
};
