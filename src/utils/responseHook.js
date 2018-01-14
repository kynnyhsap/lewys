export default (config, fn) => {
    if (typeof fn === 'function') {
        const result = fn(config)
        return new Request(result.url, result.options)
    } else {
        return new Request(config.url, config.options)
    }
}