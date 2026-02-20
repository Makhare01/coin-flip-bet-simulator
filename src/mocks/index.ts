import { handlers } from "./handlers";
import { setupWorker } from "./service";

export const worker = await setupWorker(handlers)