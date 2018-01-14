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

        const serializedParams = this.serializer(params, this.defaults.paramSerializer)
        const URL = this.constructURL(this.defaults.baseURL, url, serializedParams)

        if (this.hasBody(method)) REQUEST_OPTIONS.body = body
        REQUEST_OPTIONS.credentials = credentials || this.defaults.credentials
        REQUEST_OPTIONS.redirect = redirect || this.defaults.redirect
        REQUEST_OPTIONS.headers = new Headers(headers || this.defaults.headers)
        REQUEST_OPTIONS.cache = cache || this.defaults.cache
        REQUEST_OPTIONS.mode = mode || this.defaults.mode
        REQUEST_OPTIONS.method = method

        const reqConf = { url: URL, options: REQUEST_OPTIONS }
        const req = this.interceptRequest(reqConf, this.defaults.beforeRequest)
        const fetchPromice = fetch(req.url, req.options)

        return this
            .startTimeout(fetchPromice, this.defaults.timeout)
            .then(this.checkStatus)
            .then(response => this.interceptResponse(response, this.defaults.beforeResponse))
    }

    interceptResponse (config, fn) {
        if (typeof fn === 'function') {
            const result = fn(config)
            return new Request(result.url, result.options)
        } else {
            return new Request(config.url, config.options)
        }
    }

    interceptRequest (config, fn) {
        if (typeof fn === 'function') {
            return fn(config)
        } else {
            return config
        }
    }
    
    checkStatus (res) {
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(new Error(res.statusText))
        }
    }

    constructURL (baseURL, relativeURL, params) {
        if (params) {
            return baseURL + relativeURL + '?' + params
        } else {
            return baseURL + relativeURL
        }
    }

    hasBody (method) {
        method = method.toUpperCase()

        return (
            method === 'POST' ||
            method === 'PUT' ||
            method === 'PATCH'
        )
    }

    serializer (params, fn) {
        if (typeof fn === 'function') {
            return fn(params)
        } else {
            return JSON.stringify(params)
        }
    }

    startTimeout (promise, timeout) {
        timeout = Number(timeout)
    
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Time is out!!')
            }, timeout)
    
            promise.then(resolve, reject)
        })
    }
}

export default Client