import { useUser } from "@/hooks/use-user";
import { BetHistory } from "./bet-history";
import { BetSettings } from "./game/bet-settings";
import { Navigation } from "./navigation";
import { StartPlaying } from "./start-playing";
import { Spinner } from "./ui/spinner";

export const Root = () => {
    const { userInfo, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Spinner className="size-10 text-primary" />
            </div>
        );
    }

    if (!userInfo) {
        return <StartPlaying />;
    }

    return (
        <div className="w-full h-full">
            <Navigation />

            <main className="container mx-auto py-10">
                <BetSettings />
                <BetHistory />
            </main>
        </div>
    );
};
