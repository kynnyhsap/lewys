import lewys from 'lewys'

// Create a Client instace
const client = lewys.init({
    /*
        [baseURL] specifies base url for requests.
    */
    baseURL: 'https://some-domain.com/api/',

    /*
        [timeout] specifies the number of milliseconds before the request times out.
        If the request takes longer than [timeout], the request will be aborted(u get an uncougth rejected promise).
    */
    timeout: 1000,
    
    /*
    [paramSerializer] is an optional function which can be used for customizing `params`.
    By default params convert into json, if this function is not defined.
    */
    paramSerializer (params) {
        // Using QueryString package for e.g.
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },


    beforeRequest () {},
    beforeResponse () {},
})