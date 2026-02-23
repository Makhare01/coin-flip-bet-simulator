import type { HandlerPath, HttpMethod, HttpRes } from "./http"

function parseRequestUrl(url: string | URL): { pathname: string; searchParams: URLSearchParams } {
    const parsed = typeof url === "string"
        ? new URL(url, "http://localhost")
        : url;
    return {
        pathname: parsed.pathname,
        searchParams: parsed.searchParams,
    };
}

export const setupWorker = async (handlers: HttpRes[]) => {
    function enableMocking() {
        const originalFetch = window.fetch
        const handlersObject = handlers.reduce((acc, curr) => {
            return Object.assign(acc, curr)
        }, {})

        window.fetch = async (input, options = {}) => {
            const url = typeof input === "string" || input instanceof URL
                ? input
                : input.url;
            const method = (options.method || "GET").toUpperCase()
            const { pathname, searchParams } = parseRequestUrl(url)
            const key: HandlerPath = `${method as HttpMethod} ${pathname}`

            if (handlersObject[key]) {
                const handlerRequest = {
                    ...options,
                    url: typeof url === "string" ? url : url.toString(),
                    pathname,
                    searchParams,
                };
                const response = await handlersObject[key](handlerRequest)

                return new Response(JSON.stringify(response.data), {
                    status: response.status,
                    headers: { "Content-Type": "application/json" },
                })
            }

            return originalFetch(input, options)
        }
    }

    return {
        enableMocking,
    }
}