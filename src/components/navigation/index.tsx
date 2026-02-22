import { Coins } from "lucide-react";
import { LogoutDialog } from "./logout-dialog";
import { UserBalance } from "./user-balance";

export const Navigation = () => {
    return (
        <header className="w-full bg-card border-b border-gray-800">
            <nav className="container mx-auto flex items-center justify-between py-5">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                        <Coins className="size-7" />
                    </div>
                    <p className="text-2xl font-bold">
                        Coin <span className="text-primary"> Flip </span>
                    </p>
                </div>

                <div className="flex items-center">
                    <UserBalance />
                    <LogoutDialog />
                </div>
            </nav>
        </header>
    );
};
