import type { Handler, HandlerPath, HttpMethod } from "./handlers"

export const setupWorker = async (handlers: Record<HandlerPath, Handler>) => {
    function enableMocking() {
        const originalFetch = window.fetch

        window.fetch = async (url, options = {}) => {
            const method = (options.method || 'GET').toUpperCase()
            const key: HandlerPath = `${method as HttpMethod} ${url}`

            if (handlers[key]) {
                const response = await handlers[key](options)

                console.log({ key, response })

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