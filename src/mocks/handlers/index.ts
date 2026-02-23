import { gameHandlers } from "./game-handlers";
import { userHandlers } from "./user-handlers";

const handlers = [
    ...userHandlers,
    ...gameHandlers,
]

export { handlers };
