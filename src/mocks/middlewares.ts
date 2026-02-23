import { getCurrentUser } from "@/storage/user";
import type { HandlerWithContext } from "./http";

export const userSettingsMiddleware = (handler: HandlerWithContext) => {
  return (options?: RequestInit) => {
    const userSettings = getCurrentUser();
    return handler(options, { userSettings });
  };
};