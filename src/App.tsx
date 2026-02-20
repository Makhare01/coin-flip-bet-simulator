import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Root } from "./components/root";

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Root />
        </QueryClientProvider>
    )
}

export default App;