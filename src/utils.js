import errors from './errors.json'

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

    hasBody (method) {
        method = method.toUpperCase()

        return (
            method === 'POST' ||
            method === 'PUT' ||
            method === 'PATCH'
        )
    },

    makeUrl ({ base, relative, params }) {
        let url = ''

        if (/(https?:\/\/)/ig.test(relative)) url = relative
        else url = base + relative
        if (params) url += `?${params}`

        return url
    },

    startTimeout ({ promise, timeout, controller }) {
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
