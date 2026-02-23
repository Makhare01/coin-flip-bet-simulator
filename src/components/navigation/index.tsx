import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";
import { LogoutDialog } from "./logout-dialog";
import { UserBalance } from "./user-balance";

const UserInfo = ({ name, className }: { name: string, className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <h3 className="text-sm text-gray-500 font-bold">
                {name}
            </h3>
            <LogoutDialog />
        </div>
    )
}

export const Navigation = () => {
    const { userInfo } = useUser();

    return (
        <header className="w-full bg-card border-b border-gray-800">
            <nav className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between py-5 gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                            <Coins className="size-7" />
                        </div>
                        <p className="text-2xl font-bold">
                            Coin <span className="text-primary">Flip</span>
                        </p>
                    </div>
                    <UserInfo name={userInfo?.name ?? ""} className="md:hidden flex" />
                </div>


                <div className="flex md:flex-row flex-col-reverse md:items-center gap-2">
                    <UserBalance />

                    <UserInfo name={userInfo?.name ?? ""} className="md:flex hidden" />
                </div>
            </nav>
        </header>
    );
};
