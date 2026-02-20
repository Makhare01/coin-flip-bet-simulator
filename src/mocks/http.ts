export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export type HandlerPath = `${HttpMethod} ${string}`;
export type Handler = (options?: RequestInit) => Promise<{ success: boolean; status: number; data?: unknown }>;

export type HttpRes = {
    [key: HandlerPath]: Handler
}

const createHttp = (method: HttpMethod) => {
    return (url: string, handler: Handler): HttpRes => {
        return { [`${method} ${url}`]: handler }
    }
}

export const http = {
    get: createHttp('GET'),
    post: createHttp('POST'),
    put: createHttp('PUT'),
    delete: createHttp('DELETE'),
    patch: createHttp('PATCH'),
    options: createHttp('OPTIONS'),
    head: createHttp('HEAD'),
}
