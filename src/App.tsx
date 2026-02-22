import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Root } from "./components/root";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
        mutations: {
            retry: 0,
        },
    },
})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Root />
            <Toaster />
        </QueryClientProvider>
    )
}

export default App;