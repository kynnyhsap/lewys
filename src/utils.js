export default {
    intercept (instance, fn) {
        if (typeof fn === 'function') {
            return fn(instance)
        } else {
            return instance
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
        const isFull = /(https?:\/\/)/ig
        let url = ''

        if (isFull.test(relativeURL)) url = relativeURL 
        else url = baseURL + relativeURL

        if (params) url += `?${params}`
        console.log(url)
        return url
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

    startTimeout (promise, timeout, message = 'Time is out!!') {
        timeout = Number(timeout)
    
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(message)
            }, timeout)
    
            promise.then(resolve, reject)
        })
    },
}
