type GetBetHistoryInput = {
    search?: string;
    betResult?: string;
}

export const getBetHistory = async (args: GetBetHistoryInput) => {
    const queryString = new URLSearchParams()

    if (args.search) {
        queryString.set('search', args.search);
    }
    if (args.betResult && args.betResult !== 'all') {
        queryString.set('betResult', args.betResult);
    }

    const response = await fetch(`/api/v1/history/get-history?${queryString}`);
    return response.json();
}