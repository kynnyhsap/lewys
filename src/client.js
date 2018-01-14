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
        let { url, method, body, params, headers } = options
        let { credentials, mode, redirect, cache } = options

        const REQUEST_OPTIONS = {}
        const URL = this.normalizeURL(this.defaults.baseURL, url, params)
        
        REQUEST_OPTIONS.credentials = credentials || this.defaults.credentials
        REQUEST_OPTIONS.redirect = redirect || this.defaults.redirect
        REQUEST_OPTIONS.headers = new Headers(headers || this.defaults.headers)
        REQUEST_OPTIONS.cache = cache || this.defaults.cache
        REQUEST_OPTIONS.mode = mode || this.defaults.mode
        REQUEST_OPTIONS.method = method

        if (this.hasBody(method)) REQUEST_OPTIONS.body = body

        const request = this.requestHook({ url: URL, options: REQUEST_OPTIONS })

        return this
            .startTimeout(fetch(request), this.defaults.timeout)
            .then(this.checkStatus)
            .then(response => this.responseHook(response))
    }
    
    requestHook (config) {
        if (typeof this.defaults.beforeRequest === 'function') {
            const result = this.defaults.beforeRequest(config)
            return new Request(result.url, result.options)
        } else {
            return new Request(config.url, config.options)
        }
    }

    responseHook (config) {
        if (typeof this.defaults.beforeResponse === 'function') {
            return this.defaults.beforeResponse(config)
        } else {
            return config
        }
    }

    hasBody (method) {
        method = method.toUpperCase()
        return (method === 'POST' || method === 'PUT' || method === 'PATCH')
    }

    checkStatus (res) {
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(new Error(res.statusText))
        }
    }

    normalizeURL (baseURL, relativeURL, params) {
        let url = baseURL + relativeURL
        if (params) url = url + '?' + JSON.stringify(params)

        return  url
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