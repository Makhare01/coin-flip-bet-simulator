import { betHistoryHandlers } from "./bet-history-handlers";
import { gameHandlers } from "./game-handlers";
import { userHandlers } from "./user-handlers";

const handlers = [
    ...userHandlers,
    ...gameHandlers,
    ...betHistoryHandlers,
]

export { handlers };
