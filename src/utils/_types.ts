export type Cryptos = 'BTC' | 'ETH' | 'SOL';

export type UserSettings = {
    id: string;
    name: string;
    preferredCrypto: string;
    balances: Record<string, number>;
}