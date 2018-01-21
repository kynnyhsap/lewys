import utils from './utils'

class Client {
    constructor (settings) {
        this.defaults = settings

        if (!this.defaults.credentials) this.defaults.credentials = 'omit'
        if (!this.defaults.redirect) this.defaults.redirect = 'follow'
        if (!this.defaults.timeout) this.defaults.timeout = 30000
        if (!this.defaults.cache) this.defaults.cache = 'default'
        if (!this.defaults.mode) this.defaults.mode = 'cors'
    }

    request (opts) {
        const OPTIONS = {}
        let { url, method, body, params, headers } = opts
        let { credentials, mode, redirect, cache } = opts

        const serializedParams = utils.paramsSerializer(params, this.defaults.serializer)
        const URL = utils.constructURL(this.defaults.baseURL, url, serializedParams)

        if (utils.hasBody(method)) OPTIONS.body = body

        OPTIONS.credentials = credentials || this.defaults.credentials
        OPTIONS.redirect = redirect || this.defaults.redirect
        OPTIONS.headers = new Headers(headers || this.defaults.headers)
        OPTIONS.cache = cache || this.defaults.cache
        OPTIONS.mode = mode || this.defaults.mode
        OPTIONS.method = method

        const request = utils.intercept(
            new Request(URL, OPTIONS),
            this.defaults.beforeRequest
        )

        return utils
            .startTimeout(fetch(request), this.defaults.timeout)
            .then(utils.handleStatus)
            .then(response => utils.intercept(
                response,
                this.defaults.beforeResponse
            ))
    }
}

export default Client