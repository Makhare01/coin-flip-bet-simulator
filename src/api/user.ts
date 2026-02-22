type UserSettings = {
    preferredCrypto: string;
    balances: Record<string, number>;
}

export const getUserSettings = async (): Promise<UserSettings> => {
    const response = await fetch('/api/v1/user/settings');
    return response.json()
}