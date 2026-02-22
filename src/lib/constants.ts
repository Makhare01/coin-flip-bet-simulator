export type Cryptos = 'btc' | 'eth' | 'sol';

export const DEFAULT_BALANCES: Record<Cryptos, number> = {
    btc: 1000,
    eth: 1000,
    sol: 1000,
}