import utils from './utils'

class Client {
    constructor (settings) {
        this.defaults = settings
        this.controller = undefined

        if (!this.defaults.credentials) this.defaults.credentials = 'omit'
        if (!this.defaults.redirect) this.defaults.redirect = 'follow'
        if (!this.defaults.timeout) this.defaults.timeout = 30000
        if (!this.defaults.cache) this.defaults.cache = 'default'
        if (!this.defaults.mode) this.defaults.mode = 'cors'
    }

    request ({ url, method, body, params, headers, credentials, mode, redirect, cache }) {
        const OPTIONS = {}

        if (utils.hasBody(method)) OPTIONS.body = body

        if ('AbortController' in window) {
            this.controller = new AbortController()
            OPTIONS.signal = this.controller.signal
        }

        OPTIONS.credentials = credentials || this.defaults.credentials
        OPTIONS.redirect = redirect || this.defaults.redirect
        OPTIONS.headers = new Headers(headers || this.defaults.headers)
        OPTIONS.cache = cache || this.defaults.cache
        OPTIONS.mode = mode || this.defaults.mode
        OPTIONS.method = method || 'GET'

        const URL = utils.makeUrl({
            base: this.defaults.baseURL,
            relative: url,
            params: utils.paramsSerializer(params, this.defaults.serializer)
        })

        const request = utils.intercept(
            new Request(URL, OPTIONS),
            this.defaults.beforeRequest
        )

        return utils
            .startTimeout({
                promise: fetch(request),
                timeout: this.defaults.timeout,
                controller: this.controller
            })
            .then(utils.handleStatus)
            .then(response => utils.intercept(
                response,
                this.defaults.beforeResponse
            ))
    }
}

export default Client
