import { http } from "./http";

export const handlers = [
    http.post('/api/v1/game/flop-coin', (options) => {
        const { betAmount, selectedCrypto } = JSON.parse(options?.body as string)

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
    }),
]