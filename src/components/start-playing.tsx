import { startPlayingAction } from "@/api/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Spinner } from "./ui/spinner"

export const StartPlaying = () => {
    const queryClient = useQueryClient();

    const [name, setName] = useState<string>("")
    const [error, setError] = useState<string>("")

    const $startPlaying = useMutation({
        mutationKey: ["start-playing"],
        mutationFn: startPlayingAction,
    });

    const handleStartPlaying = () => {
        if (name.trim() === "") {
            setError("Name is required")
            return
        }

        $startPlaying.mutate(name, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user-info'] })
                setError("");
                setName("");
            },
            onError: (error) => {
                setError(error.message);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-muted/30 to-background px-4">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Start Playing
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your username to begin
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleStartPlaying()
                    }}
                    className="space-y-4"
                >
                    <div>
                        <Input
                            placeholder="Username"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setError("")
                            }}
                            className="h-10"
                            aria-invalid={!!error}
                            aria-describedby={error ? "name-error" : undefined}
                        />
                        {error && (
                            <p id="name-error" className="mt-2 text-sm text-destructive">
                                {error}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="default"
                        className="w-full"
                        disabled={$startPlaying.isPending}
                    >
                        {$startPlaying.isPending ? (
                            <Spinner className="size-4 animate-spin" />
                        ) : (
                            "Start Playing"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
