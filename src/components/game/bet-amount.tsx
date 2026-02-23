import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";

type BetAmountProps = {
    betAmount: string;
    setBetAmount: (betAmount: string) => void;
    maxBalance: number;
    preferredCrypto: string;
    error: string | null;
}

export const BetAmount = ({ betAmount, setBetAmount, maxBalance, preferredCrypto, error }: BetAmountProps) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-muted-foreground">
                    Bet Amount
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                    MAX: {maxBalance?.toFixed(2)}{" "}
                    {preferredCrypto}
                </p>
            </div>

            <InputGroup>
                <InputGroupInput
                    type="number"
                    placeholder="0.001"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="rounded-lg rounded-r-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
                    aria-invalid={!!error}
                />
                <InputGroupAddon
                    align="inline-end"
                    className="w-10 p-1 rounded-lg rounded-r-none border cursor-pointer hover:bg-primary/20 font-bold"
                    onClick={() => setBetAmount((Number(betAmount) / 2).toString())}
                >
                    1/2
                </InputGroupAddon>
                <InputGroupAddon
                    align="inline-end"
                    className="w-10 p-1 rounded-lg rounded-l-none border mr-2 cursor-pointer hover:bg-primary/20 font-bold"
                    onClick={() => setBetAmount((Number(betAmount) * 2).toString())}
                >
                    2x
                </InputGroupAddon>
            </InputGroup>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
    );
};