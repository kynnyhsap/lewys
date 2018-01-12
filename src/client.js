export default class Client {
    constructor (options) {
        this.defaults = options
    }

    request (options) {
        let { url, method, body, params } = options
        const init = {}
        
        url = this.defaults.baseURL + url
        method = method.toUpperCase()
        init.method = method

        if (method === 'GET' || method === 'HEAD') {
            if (params) url = `${url}?${JSON.stringify(params)}`
        } else {
            init.body = body
        }

        const request = this.intercept('req', new Request(url, init))

        return fetch(request)
            .then(this.status)
            .then(res => this.intercept('res', res))
    }

    status (res) {
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(new Error(res.statusText))
        }
    }

    intercept (name, obj) {
        if (typeof this.defaults.intercept[name] === 'function') {
            return this.defaults.intercept[name](obj)
        } else {
            return obj
        }
    }
}