import { Root } from "./components/root";
import { Providers } from "./providers";

export function App() {
    return (
        <Providers>
            <Root />
        </Providers>
    )
}

export default App;