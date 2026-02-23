import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type BetResult = "all" | "win" | "loss";

type HistoryFiltersProps = {
    search: string;
    setSearch: (search: string) => void;
    betResult: BetResult;
    setBetResult: (betResult: BetResult) => void;
}

export const HistoryFilters = ({ search, setSearch, betResult, setBetResult }: HistoryFiltersProps) => {
    return (
        <div className="flex items-center gap-2">
            <InputGroup>
                <InputGroupInput
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon
                    align="inline-start"
                >
                    <SearchIcon className="size-4" />
                </InputGroupAddon>
            </InputGroup>

            <Select
                value={betResult}
                onValueChange={(value) => setBetResult(value as BetResult)}
            >
                <SelectTrigger className="h-11! bg-input! w-[200px]">
                    <SelectValue placeholder="All Bets" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Bets</SelectItem>
                    <SelectItem value="win">Win</SelectItem>
                    <SelectItem value="loss">Loss</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}