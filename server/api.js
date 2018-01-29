import lewys from '../src'

const api = lewys.init({
    baseURL: 'https://jsonplaceholder.typicode.com',

    timeout: 100,

    // handleStatus(res) {
    //     cosole.log(res)
    //     return Promise.resolve(res)
    // },

    // serializer (params) {
    //     return JSON.stringify(params)
    // },

    beforeResponse (res, writble) {
        // console.log(res)
        return res.json().then(data => data)
    },

    beforeRequest (req, writble) {
        // console.log(req)
        return req
    },
})

export default api

