import { useUser } from "@/hooks/use-user";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const UserBalance = () => {
    const { userInfo, setUserFavoriteCrypto, isSettingUserFavoriteCrypto } = useUser();

    return (
        <Tabs
            defaultValue={userInfo?.preferredCrypto}
            onValueChange={(value) => {
                setUserFavoriteCrypto(value);
            }}
        >
            <TabsList>
                {Object.entries(userInfo?.balances ?? {}).map(([crypto, balance]) => (
                    <TabsTrigger key={crypto} value={crypto} disabled={isSettingUserFavoriteCrypto}>
                        {crypto.toUpperCase()} {balance.toFixed(2)}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};
