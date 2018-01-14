class Client {
    constructor (settings) {
        this.defaults = settings

        if (!this.defaults.mode) this.defaults.mode = 'cors'
        if (!this.defaults.credentials) this.defaults.credentials = 'omit'
        if (!this.defaults.redirect) this.defaults.redirect = 'follow'
        if (!this.defaults.cache) this.defaults.cache = 'default'

        // console.log(this.defaults)
    }

    request (options) {
        let {
            credentials,
            url,
            method,
            body,
            params,
            headers,
            mode,
            redirect,
            cache
        } = options

        const REQUEST_OPTIONS = {}
        const URL = this.normalizeURL(url, params)
        
        REQUEST_OPTIONS.credentials = credentials || this.defaults.credentials
        REQUEST_OPTIONS.redirect = redirect || this.defaults.redirect
        REQUEST_OPTIONS.method = method
        REQUEST_OPTIONS.cache = redirect || this.defaults.cache
        REQUEST_OPTIONS.mode = mode || this.defaults.mode
        REQUEST_OPTIONS.headers = new Headers(headers || this.defaults.headers)

        if (this.hasBody(method)) REQUEST_OPTIONS.body = body

        const requestConfig = { url: URL, options: REQUEST_OPTIONS }
        const request = this.interceptRequest(requestConfig)

        return fetch(request)
            .then(this.checkStatus)
            .then(response => this.interceptResponse(response))
    }
    
    interceptRequest (config) {
        if (typeof this.defaults.intercept.req === 'function') {
            const result = this.defaults.intercept.req(config)
            return new Request(result.url, result.options)
        } else {
            return new Request(config.url, config.options)
        }
    }

    interceptResponse (config) {
        if (typeof this.defaults.intercept.res === 'function') {
            return this.defaults.intercept.res(config)
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

    normalizeURL (relativeURL, params) {
        let url = this.defaults.baseURL + relativeURL
        if (params) url = url + '?' + JSON.stringify(params)

        return  url
    }
}

export default Client