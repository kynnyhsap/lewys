export default (config, fn) => {
    if (typeof fn === 'function') {
        return fn(config)
    } else {
        return config
    }
}