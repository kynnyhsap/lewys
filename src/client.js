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

        //#region logs
        console.log('options', options)
        console.log('params', params)
        //#endregion logs

        return fetch(url, params)
    }
}