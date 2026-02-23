export type Cryptos = 'BTC' | 'ETH' | 'SOL';

export type BetResult = 'win' | 'loss';

export type UserSettings = {
    id: string;
    name: string;
    preferredCrypto: string;
    balances: Record<string, number>;
}

export type BetHistory = {
    id: string;
    userId: string;
    userName: string;
    crypto: string;
    betAmount: number;
    betResult: BetResult;
    payout: number;
    timestamp: number;
}