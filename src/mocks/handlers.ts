/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export type HandlerPath = `${HttpMethod} ${string}`;

export type Handler = (options: RequestInit) => Promise<{ success: boolean; status: number; data?: any }>;

export const handlers: Record<HandlerPath, Handler> = {
    'POST /api/v1/game/flop-coin': (options) => {
        const { betAmount, selectedCrypto } = JSON.parse(options.body as string)

        const responseTime = Math.floor(Math.random() * 2700) + 300;

        return new Promise((resolve) => {
            const isWin = Math.random() < 0.5;

            setTimeout(() => {
                resolve({
                    success: true,
                    status: 200,
                    data: {
                        isWin,
                        payout: isWin ? betAmount * 2 : 0,
                        result: isWin ? 'win' : 'lose',
                        selectedCrypto,
                        transactionId: crypto.randomUUID(),
                        timestamp: new Date().toISOString(),
                    }
                })
            }, responseTime)
        })
    },
}