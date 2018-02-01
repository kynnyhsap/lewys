import errors from './errors'

export default {
    intercept (entity, interceptor) {
        return (typeof interceptor === 'function')
            ? interceptor(entity)
            : entity
    },

    handleStatus (res) {
        return (res.status >= 200 && res.status < 300)
            ? Promise.resolve(res)
            : Promise.reject(new Error(res.statusText))
    },

    constructURL (baseURL, relativeURL, params) {
        const isFull = /(https?:\/\/)/ig
        let url = ''

        if (isFull.test(relativeURL)) url = relativeURL
        else url = baseURL + relativeURL

        if (params) url += `?${params}`
        // console.log(url)
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

    paramsSerializer (params, serilizer) {
        return (typeof serilizer === 'function')
            ? serilizer(params)
            : JSON.stringify(params)
    },

    startTimeout (promise, timeout, controller) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const err = new Error()

                err.name = 'AbortError'
                err.message = errors.OnAbort

                if (controller) controller.abort()
                else err.message = errors.OnTimeout

                reject(err)
            }, Number(timeout))

            promise.then(resolve, reject)
        })
    }
}
