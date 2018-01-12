export default class Client {
    constructor (options) {
        this.defaults = options
    }

    request (options) {
        const params = {}
        let { url, method, body } = options
        
        method = method.toUpperCase()
        params.method = method
        url = `${this.defaults.baseURL}${url}`

        if (body && (method !== 'GET' || method !== 'HEAD' || method !== 'DELETE')) {
            params.body = body
        }

        const request = this.intercept('req', new Request(url, params))

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