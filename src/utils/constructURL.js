export default (baseURL, relativeURL, params) => {
    if (params) {
        return baseURL + relativeURL + '?' + params
    } else {
        return baseURL + relativeURL
    }
}