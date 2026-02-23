import { useUserSettingsStore } from "@/store/user-settings";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export const AutoBettingOptions = ({ isAutoBetting }: { isAutoBetting: boolean }) => {
    const martingaleEnabled = useUserSettingsStore((s) => s.martingaleEnabled);
    const setMartingaleEnabled = useUserSettingsStore((s) => s.setMartingale);
    const stopWin = useUserSettingsStore((s) => s.stopWin);
    const setStopWin = useUserSettingsStore((s) => s.setStopWin);
    const stopLoss = useUserSettingsStore((s) => s.stopLoss);
    const setStopLoss = useUserSettingsStore((s) => s.setStopLoss);

    return (
        <div>

            <div className="mt-4 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                        <Switch id="martingale" checked={martingaleEnabled} onCheckedChange={setMartingaleEnabled} />
                        <Label htmlFor="martingale" className="text-md">Martingale</Label>
                    </div>

                    <Badge variant="secondary">Auto Betting</Badge>
                </div>


                <div className="flex items-center space-x-2 mt-6 w-full">
                    <div className="flex-1">
                        <Label htmlFor="stop-win" className="text-md mb-2">Stop Win</Label>
                        <Input id="stop-win" type="number" className="h-11 w-full" value={stopWin} onChange={(e) => setStopWin(Number(e.target.value))} />
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="stop-loss" className="text-md mb-2">Stop Loss</Label>
                        <Input id="stop-loss" type="number" className="h-11 w-full" value={stopLoss} onChange={(e) => setStopLoss(Number(e.target.value))} />
                    </div>
                </div>
            </div>

            {!isAutoBetting && (
                <p className="text-xs text-muted-foreground mt-2 ml-1 italic">Auto betting is disabled. Please enable auto betting to use this feature.</p>
            )}
        </div>
    )
}