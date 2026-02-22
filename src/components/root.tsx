import { useUser } from "@/hooks/use-user";
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
        </div>
    );
};
