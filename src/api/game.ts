type FlipCoinInput = {
    betAmount: number
    preferredCrypto: string
}

export const flipCoin = async ({ betAmount, preferredCrypto }: FlipCoinInput) => {
    const response = await fetch('/api/v1/game/flip-coin', {
        method: 'POST',
        body: JSON.stringify({ betAmount, preferredCrypto }),
    })

    return response.json()
}