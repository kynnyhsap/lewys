import textData from './textData'

export default {
    intercept (entity, interceptor) {
        const isReq = (entity instanceof Request)

        if (typeof interceptor === 'function') {
            const result = interceptor(entity)

            if (isReq && !(result instanceof Request)) throw new Error(textData.errorMessageBeforeRequest)

            return result
        } else {
            return entity
        }
    },

    handleStatus (res) {
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
        if (typeof serilizer === 'function') {
            return serilizer(params)
        } else {
            return JSON.stringify(params)
        }
    },

    startTimeout (promise, timeout, controller) {
        timeout = Number(timeout)

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const error = new Error()

                error.name = 'AbortError'
                error.message = textData.errorMesssageOnAbort

                if (controller) controller.abort()
                else error.message = textData.errorMesssageOnTimeout

                reject(error)
            }, timeout)

            promise.then(resolve, reject)
        })
    }
}
