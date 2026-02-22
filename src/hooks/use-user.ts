import { getUserInfo, logoutAction, setUserFavoriteCryptoAction } from "@/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
    const queryClient = useQueryClient();

    const $userInfo = useQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
        gcTime: 0,
    })

    const $logout = useMutation({
        mutationKey: ["logout"],
        mutationFn: logoutAction,
    })

    const $setUserFavoriteCrypto = useMutation({
        mutationKey: ["set-user-favorite-crypto"],
        mutationFn: setUserFavoriteCryptoAction,
    })

    const setUserFavoriteCrypto = (crypto: string) => {
        $setUserFavoriteCrypto.mutate(crypto, {
            onSuccess: () => {
                $userInfo.refetch();
            },
            onError: (error) => {
                console.error(error);
            },
        })
    }

    const revalidateUserInfo = () => {
        queryClient.invalidateQueries({ queryKey: ["user-info"] });
    };

    const clearUserInfo = () => {
        queryClient.setQueryData(["user-info"], null);
    };

    return {
        isLoading: $userInfo.isLoading,
        userInfo: $userInfo.data,
        revalidateUserInfo,
        clearUserInfo,
        $logout,
        setUserFavoriteCrypto,
        isSettingUserFavoriteCrypto: $setUserFavoriteCrypto.isPending,
    };
}