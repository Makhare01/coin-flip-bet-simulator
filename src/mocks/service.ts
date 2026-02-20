import type { HandlerPath, HttpMethod, HttpRes } from "./http"

export const setupWorker = async (handlers: HttpRes[]) => {
    function enableMocking() {
        const originalFetch = window.fetch
        const handlersObject = handlers.reduce((acc, curr) => {
            return Object.assign(acc, curr)
        }, {})

        window.fetch = async (url, options = {}) => {
            const method = (options.method || 'GET').toUpperCase()
            const key: HandlerPath = `${method as HttpMethod} ${url}`

            if (handlersObject[key]) {
                const response = await handlersObject[key](options)

                return new Response(JSON.stringify(response.data), {
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            return originalFetch(url, options)
        }
    }

    return {
        enableMocking,
    }
}