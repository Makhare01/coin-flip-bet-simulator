import { Pause, Play } from "lucide-react";
import { Button } from "../ui/button";

type PlaceBetProps = {
    onPlaceBet: () => void;
    isDisabled: boolean;
    onAutoBet: () => void;
    stopAutoBet: () => void;
    isAutoBetting: boolean;
}

export const PlaceBet = ({ onPlaceBet, onAutoBet, stopAutoBet, isDisabled, isAutoBetting }: PlaceBetProps) => {
    return (
        <div className="w-full mt-4 flex items-center justify-between gap-4">
            <Button className="flex-1 h-14 font-black text-xl" onClick={onPlaceBet} disabled={isDisabled || isAutoBetting}>Place Bet</Button>
            <Button
                variant="ghost"
                className="w-14 h-14 border border-border text-primary rounded-lg p-2"
                onClick={isAutoBetting ? stopAutoBet : onAutoBet}
                disabled={isDisabled && !isAutoBetting}
            >
                {isAutoBetting ? (
                    <Pause className="size-6 text-destructive" />
                ) : (
                    <Play className="size-6 text-white" />
                )}
            </Button>
        </div>
    );
};
