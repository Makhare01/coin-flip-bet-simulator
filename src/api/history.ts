type GetBetHistoryInput = {
    search?: string;
    betResult?: string;
    limit?: number;
}

export const getBetHistory = async (args: GetBetHistoryInput) => {
    const queryString = new URLSearchParams()

    if (args.search) {
        queryString.set('search', args.search);
    }
    if (args.betResult && args.betResult !== 'all') {
        queryString.set('betResult', args.betResult);
    }
    queryString.set('limit', args.limit?.toString() ?? '20');

    const response = await fetch(`/api/v1/history/get-history?${queryString}`);
    return response.json();
}

export const getUserBetHistoryStatistics = async () => {
    const response = await fetch('/api/v1/history/statistics');
    return response.json();
}