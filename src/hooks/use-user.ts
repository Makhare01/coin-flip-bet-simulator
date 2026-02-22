import { getUserSettings } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    const { data: userSettings, isLoading, isError, error } = useQuery({
        queryKey: ['user-settings'],
        queryFn: getUserSettings,
    });

    return {
        userSettings,
        isLoading,
        isError,
        error
    };
}