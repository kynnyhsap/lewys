export default (params, fn) => {
    if (typeof fn === 'function') {
        return fn(params)
    } else {
        return JSON.stringify(params)
    }
}