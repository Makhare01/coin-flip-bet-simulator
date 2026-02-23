import { logoutAction } from "@/api/user";
import { useBoolean } from "@/hooks/use-boolean";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Spinner } from "../ui/spinner";

export const LogoutDialog = () => {
    const open = useBoolean(false)
    const queryClient = useQueryClient()

    const $logout = useMutation({
        mutationFn: logoutAction,
        onSuccess: () => {
            queryClient.setQueryData(["user-info"], null)
            open.setFalse();

        },
    })

    return (
        <Dialog open={open.isTrue} onOpenChange={open.setValue}>
            <DialogTrigger asChild className="cursor-pointer h-10 w-10 border border-gray-800 rounded-lg p-2 ml-3 hover:bg-gray-800 transition-all duration-300">
                <LogOut className="size-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline" className="w-[80px]">Cancel</Button></DialogClose>
                    <Button variant="destructive" onClick={() => $logout.mutate(undefined)} className="w-[80px]">
                        {$logout.isPending ? <Spinner /> : "Logout"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}