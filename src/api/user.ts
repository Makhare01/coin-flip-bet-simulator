import type { UserSettings } from "@/utils/_types";

export const getUserInfo = async (): Promise<UserSettings> => {
    const response = await fetch('/api/v1/user/info');
    return response.json()
}

export const startPlayingAction = async (name: string): Promise<UserSettings> => {
    const response = await fetch('/api/v1/user/start-playing', {
        method: 'POST',
        body: JSON.stringify({ name }),
    });

    return response.json()
}

export const logoutAction = async (): Promise<void> => {
    await fetch('/api/v1/user/logout', {
        method: 'DELETE',
    });
}

export const setUserFavoriteCryptoAction = async (preferredCrypto: string): Promise<void> => {
    await fetch('/api/v1/user/set-favorite-crypto', {
        method: 'PATCH',
        body: JSON.stringify({ preferredCrypto }),
    });
}