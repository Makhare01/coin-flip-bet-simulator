import { getBetHistory } from "@/api/history"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDebounce } from "@/hooks/use-debounce"
import type { BetHistory as BetHistoryEntry } from "@/utils/_types"
import { useQuery } from "@tanstack/react-query"
import { HistoryIcon } from "lucide-react"
import { useState } from "react"
import { HistoryFilters, type BetResult } from "./history-filters"

const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString()

const formatAmount = (amount: number, crypto: string) =>
    `${amount.toLocaleString()} ${crypto}`

export const BetHistory = () => {
    const [search, setSearch] = useState("")
    const [betResult, setBetResult] = useState<BetResult>("all")
    const { debouncedValue: debouncedSearch } = useDebounce(search, 500)

    const args = {
        search: debouncedSearch,
        betResult: betResult,
    }

    const $betHistory = useQuery({
        queryKey: ["bet-history", args],
        queryFn: () => getBetHistory(args),
    })


    if ($betHistory.error) {
        return <div>Error: {($betHistory.error as Error).message}</div>
    }

    const history = ($betHistory.data ?? []) as BetHistoryEntry[]


    return (
        <div className="rounded-md border mt-10">
            <div className="flex items-center justify-between px-2 py-4 bg-card rounded-t-lg border-b-">
                <div className="flex items-center">
                    <HistoryIcon className="size-8 text-primary" />
                    <h1 className="text-xl font-bold ml-2">Bet History</h1>
                </div>

                <HistoryFilters search={search} setSearch={setSearch} betResult={betResult} setBetResult={setBetResult} />
            </div>
            <Table className="bg-card">
                <TableHeader>
                    <TableRow className="bg-card-foreground/80">
                        <TableHead>User</TableHead>
                        <TableHead className="text-center">Crypto</TableHead>
                        <TableHead className="text-center">Bet Amount</TableHead>
                        <TableHead className="text-center">Result</TableHead>
                        <TableHead className="text-center">Payout</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {$betHistory.isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : history.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No bets yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        history.map((bet) => (
                            <TableRow key={bet.id}>
                                <TableCell className="font-medium">{bet.userName}</TableCell>
                                <TableCell align="center">{bet.crypto}</TableCell>
                                <TableCell align="center">
                                    {formatAmount(bet.betAmount, bet.crypto)}
                                </TableCell>
                                <TableCell align="center">
                                    <span
                                        className={
                                            bet.betResult === 'win'
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                        }
                                    >
                                        {bet.betResult === 'win' ? "Win" : "Loss"}
                                    </span>
                                </TableCell>
                                <TableCell align="center">
                                    {formatAmount(bet.payout, bet.crypto)}
                                </TableCell>
                                <TableCell align="right">{formatDate(bet.timestamp)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}