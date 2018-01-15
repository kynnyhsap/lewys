export default {
    interceptRequest (config, fn) {
        if (typeof fn === 'function') {
            const result = fn(config)
            return new Request(result.url, result.options)
        } else {
            return new Request(config.url, config.options)
        }
    },

    interceptResponse (config, fn) {
        if (typeof fn === 'function') {
            return fn(config)
        } else {
            return config
        }
    },

    checkStatus (res) {
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(new Error(res.statusText))
        }
    },

    constructURL (baseURL, relativeURL, params) {
        if (params) {
            return baseURL + relativeURL + '?' + params
        } else {
            return baseURL + relativeURL
        }
    },

    hasBody (method) {
        method = method.toUpperCase()

        return (
            method === 'POST' ||
            method === 'PUT' ||
            method === 'PATCH'
        )
    },

    serializer (params, fn) {
        if (typeof fn === 'function') {
            return fn(params)
        } else {
            return JSON.stringify(params)
        }
    },

    startTimeout (promise, timeout) {
        timeout = Number(timeout)
    
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Time is out!!')
            }, timeout)
    
            promise.then(resolve, reject)
        })
    },
}
