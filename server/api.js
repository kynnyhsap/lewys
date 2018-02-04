import lewys from '../src'

const api = lewys.init({
    baseURL: 'https://jsonplaceholder.typicode.com',

    timeout: 10000,

    beforeResponse (res) {
        console.log(res)
        return res.json().then(data => data)
    },

    beforeRequest (req) {
        console.log(req)
        return req
    },
})

export default api

