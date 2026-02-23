import { getUserBetHistoryStatistics } from "@/api/history"
import type { UserBetStatistics as UserBetStatisticsType } from "@/storage/history"
import { useUserSettingsStore } from "@/store/user-settings"
import { useQuery } from "@tanstack/react-query"
import { BarChart3, TrendingDown, TrendingUp, Trophy, Wallet } from "lucide-react"

const formatAmount = (amount: number, crypto: string) =>
    `${amount >= 0 ? "" : "-"}${Math.abs(amount).toLocaleString()} ${crypto}`

const StatCard = ({
    label,
    value,
    icon: Icon,
    valueClassName = "",
}: {
    label: string
    value: string | number
    icon: React.ElementType
    valueClassName?: string
}) => (
    <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="size-4" />
            <span className="text-sm font-medium">{label}</span>
        </div>
        <p className={`mt-2 text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
)

export const UserBetStatistics = () => {
    const preferredCrypto = useUserSettingsStore((s) => s.preferredCrypto)

    const $stats = useQuery({
        queryKey: ["user-bet-history-statistics"],
        queryFn: getUserBetHistoryStatistics,
        staleTime: 0,
        gcTime: 0,
    })

    if ($stats.error) {
        return (
            <div className="rounded-lg border bg-card p-6">
                <p className="text-destructive">
                    Error: {($stats.error as Error).message}
                </p>
            </div>
        )
    }

    const stats = $stats.data as UserBetStatisticsType | undefined

    return (
        <div className="my-4">
            <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="size-6 text-primary" />
                <h2 className="text-xl font-bold">Your Statistics</h2>
            </div>

            {$stats.isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="h-24 animate-pulse rounded-lg border bg-muted"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        label="Total Bets"
                        value={stats?.totalBets ?? 0}
                        icon={Wallet}
                    />
                    <StatCard
                        label="Win/Loss Ratio"
                        value={stats?.winLossRatio != null ? stats.winLossRatio.toFixed(2) : "0"}
                        icon={BarChart3}
                    />
                    <StatCard
                        label="Biggest Win"
                        value={formatAmount(stats?.biggestWin ?? 0, preferredCrypto)}
                        icon={Trophy}
                        valueClassName="text-green-600 dark:text-green-400"
                    />
                    <StatCard
                        label="Biggest Loss"
                        value={formatAmount(stats?.biggestLoss ?? 0, preferredCrypto)}
                        icon={TrendingDown}
                        valueClassName="text-red-600 dark:text-red-400"
                    />
                    <StatCard
                        label="Profit/Loss"
                        value={formatAmount(stats?.profitLoss ?? 0, preferredCrypto)}
                        icon={TrendingUp}
                        valueClassName={
                            (stats?.profitLoss ?? 0) >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        }
                    />
                </div>
            )}
        </div>
    )
}