const STORAGE_AVAILABLE = typeof window !== "undefined" && "localStorage" in window;

class LocalStorageAdapter {
    #getStorage(): Storage | null {
        if (!STORAGE_AVAILABLE) return null;
        try {
            return window.localStorage;
        } catch {
            return null;
        }
    }

    getItem<T>(key: string): T | null {
        const storage = this.#getStorage();
        if (!storage) return null;
        try {
            const raw = storage.getItem(key);
            if (raw === null) return null;
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    setItem<T>(key: string, value: T): void {
        const storage = this.#getStorage();
        if (!storage) return;
        try {
            storage.setItem(key, JSON.stringify(value));
        } catch {
            void 0;
        }
    }

    removeItem(key: string): void {
        const storage = this.#getStorage();
        if (!storage) return;
        storage.removeItem(key);
    }

    clear(): void {
        const storage = this.#getStorage();
        if (!storage) return;
        storage.clear();
    }

    hasItem(key: string): boolean {
        const storage = this.#getStorage();
        if (!storage) return false;
        return storage.getItem(key) !== null;
    }
}

export const storage = new LocalStorageAdapter();
