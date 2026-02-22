export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";
export type HandlerPath = `${HttpMethod} ${string}`;

export type Handler = (
  options?: RequestInit
) => Promise<{ success: boolean; status: number; data?: unknown }>;

export type MiddlewareContext = Record<string, unknown>;

export type HandlerWithContext = (
  options?: RequestInit,
  context?: MiddlewareContext
) => Promise<{ success: boolean; status: number; data?: unknown }>;

export type Middleware = (handler: HandlerWithContext) => Handler;

export type HttpRes = {
  [key: HandlerPath]: Handler;
};

type CreateHttpFn = {
  (url: string, handler: Handler): HttpRes;
  (url: string, middleware: Middleware, handler: HandlerWithContext): HttpRes;
};

const createHttp = (method: HttpMethod): CreateHttpFn => {
  return (
    url: string,
    middlewareOrHandler: Middleware | Handler,
    handler?: HandlerWithContext
  ): HttpRes => {
    const isMiddleware = handler !== undefined;
    const handlerFn = isMiddleware
      ? (middlewareOrHandler as Middleware)(handler)
      : (middlewareOrHandler as Handler);
    return { [`${method} ${url}`]: handlerFn };
  };
};

export const http = {
  get: createHttp('GET'),
  post: createHttp('POST'),
  put: createHttp('PUT'),
  delete: createHttp('DELETE'),
  patch: createHttp('PATCH'),
  options: createHttp('OPTIONS'),
  head: createHttp('HEAD'),
}
