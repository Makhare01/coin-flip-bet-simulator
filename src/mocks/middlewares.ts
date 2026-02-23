import { getCurrentUser } from "@/storage/user";
import type { HandlerRequest, HandlerWithContext } from "./http";

export const userSettingsMiddleware = (handler: HandlerWithContext) => {
  return (options?: HandlerRequest) => {
    const userSettings = getCurrentUser();
    return handler(options, { userSettings });
  };
};