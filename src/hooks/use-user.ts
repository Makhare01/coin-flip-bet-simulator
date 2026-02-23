import {
    getUserInfo
} from "@/api/user"

import { useQuery } from "@tanstack/react-query"

const USER_QUERY_KEY = ["user-info"]

export const useUser = () => {
    const $getUserInfo = useQuery({
        queryKey: USER_QUERY_KEY,
        queryFn: getUserInfo,
        staleTime: Infinity,
    })

    return {
        userInfo: $getUserInfo.data,
        isLoading: $getUserInfo.isLoading,
    }
}