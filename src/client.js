import utils from './utils'

class Client {
    constructor(settings) {
        this.defaults = settings || {}

        if (!this.defaults.timeout) this.defaults.timeout = 30000
    }

    request({ url, method, body, params, headers, ...customOptions }) {
        let controller
        const OPTIONS = {
            method: method || 'GET',
            headers: new Headers(headers || this.defaults.headers),
            body: utils.hasBody(method) ? body : undefined,
            ...customOptions,
        }

        const URL = utils.makeUrl({
            relative: url,
            base: this.defaults.baseURL,
            params: utils.intercept(
                params,
                this.defaults.serializer || JSON.stringify
            ),
        })

        if ('AbortController' in window) {
            controller = new AbortController()
            OPTIONS.signal = controller.signal
        }

        const request = utils.intercept(
            new Request(URL, OPTIONS),
            this.defaults.beforeRequest
        )

        return utils
            .startTimeout({
                promise: fetch(request),
                timeout: this.defaults.timeout,
                controller,
            })
            .then(utils.handleStatus)
            .then(response =>
                utils.intercept(response, this.defaults.beforeResponse)
            )
    }
}

export default Client
