export default (res) => {
    if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res)
    } else {
        return Promise.reject(new Error(res.statusText))
    }
}