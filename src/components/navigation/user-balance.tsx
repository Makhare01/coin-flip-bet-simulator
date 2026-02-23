import { useUser } from "@/hooks/use-user";
import { useUserSettingsStore } from "@/store/user-settings";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const UserBalance = () => {
    const { userInfo } = useUser();
    const preferredCrypto = useUserSettingsStore((state) => state.preferredCrypto);
    const setPreferredCrypto = useUserSettingsStore((state) => state.setPreferredCrypto);

    return (
        <div className="flex items-center gap-2 overflow-x-auto md:px-0 px-3">
            <Tabs
                defaultValue={preferredCrypto}
                onValueChange={(value) => {
                    setPreferredCrypto(value);
                }}
            >
                <TabsList>
                    {Object.entries(userInfo?.balances ?? {}).map(([crypto, balance]) => (
                        <TabsTrigger key={crypto} value={crypto}>
                            {balance.toFixed(2)} <span className="text-xs text-gray-500">{crypto.toUpperCase()}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>

    );
};
