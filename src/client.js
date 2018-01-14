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

    request (options) {
        const REQUEST_OPTIONS = {}
        let { url, method, body, params, headers } = options
        let { credentials, mode, redirect, cache } = options

        const serializedParams = utils.serializer(params, this.defaults.paramSerializer)
        const URL = utils.constructURL(this.defaults.baseURL, url, serializedParams)

        if (utils.hasBody(method)) REQUEST_OPTIONS.body = body
        REQUEST_OPTIONS.credentials = credentials || this.defaults.credentials
        REQUEST_OPTIONS.redirect = redirect || this.defaults.redirect
        REQUEST_OPTIONS.headers = new Headers(headers || this.defaults.headers)
        REQUEST_OPTIONS.cache = cache || this.defaults.cache
        REQUEST_OPTIONS.mode = mode || this.defaults.mode
        REQUEST_OPTIONS.method = method

        const reqConf = { url: URL, options: REQUEST_OPTIONS }
        const req = utils.interceptRequest(reqConf, this.defaults.beforeRequest)
        const fetchPromice = fetch(req.url, req.options)

        return utils
            .startTimeout(fetchPromice, this.defaults.timeout)
            .then(utils.checkStatus)
            .then(response => utils.interceptResponse(response, this.defaults.beforeResponse))
    }
}

export default Client