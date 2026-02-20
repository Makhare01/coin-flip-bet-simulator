import { useMutation } from "@tanstack/react-query";
import { Navigation } from "./navigation";
import { Button } from "./ui/button";

export const Root = () => {
    const $flopCoin = useMutation({
        mutationKey: ['flop-coin'],
        mutationFn: (data: { betAmount: number; selectedCrypto: string }) =>
            fetch("/api/v1/game/flop-coin", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json()),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return (
        <div className="w-full h-full">
            <Navigation />
            {$flopCoin.isPending && <div>Loading...</div>}
            <Button
                onClick={() => {
                    $flopCoin.mutate({
                        betAmount: 10,
                        selectedCrypto: "btc",
                    });
                }}
            >
                Flip Coin
            </Button>
        </div>
    );
};
