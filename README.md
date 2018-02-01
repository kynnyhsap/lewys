# Lewys



Manage your api nice and easely with **Lewys** - Fetch "under the hood" client



## Fetures
- [x] Make Fetch reqeusts
- [x] [Intercept request and response](#)
- [x] [Aborting requests](#aborting-requests)
- [x] Simple Promice API
<!-- Make http requests from node.js -->



## Installation
Npm:  `npm i lewys --save`

Yarn:  `yarn add lewys`



## Importing
ES modules
```js 
import lewys from 'lewys'
```
Commonjs
```js 
const lewys = require('lewys')
```

<!-- ### Using CDN:
```html
<script src="https://unpkg.com/lewys/lewys.min.js"></script>
``` -->


## Creating an instance
**lewys.init(options)**
```js 
const client = lewys.init({ /* Initial Options */})
```



## Instance options
> All of those options not required for initilizing

| Prop | Type | Default | 📝 |
| --- | --- | --- | --- |
| baseURL | *string* | ✖ | [➡️](#base-url) |
| timeout | *number* | `30000` | [➡️](#timeout) |
| headers | *array or object* | ✖ | [➡️](#headers) |
| serializer | *function* | ✖ | [➡️](#serializer) |
| beforeResponse | *function* | ✖ | [➡️](#before-response) |
| beforeRequest | *function* | ✖ | [➡️](#before-request) |
| mode | *string* | `'cors'` | [➡️](#instance-options) |
| redirect | *string* | `'follow'` | [➡️](#instance-options) |
| cache | *string* | `'default'` | [➡️](#instance-options) |
| credentials | *string* | `'omit'` | [➡️](#instance-options) |
>Options like `mode`, `creditals`, `redirect` and `cache` is just like you use them in base `fetch()`

You can also define those options after client initializing:
```js
const client = lewys.init()

client.defaults.baseURL = 'https://lol.kek/api'
client.defaults['baseURL'] = 'https://lol.kek/api'
```

#### Base URL
This options defines base url for requests.
```js
lewys.init({
    baseURL: 'https://lol.kek/api'
})
```

#### Timeout
This options sets time(in ms), after which your request will be aborted. Please read about [Aborting requests](#aborting-requests).
```js
lewys.init({
    timeout: 24000    
})
```

#### Headers
This options allows you to set your own request headers.
```js
lewys.init({
    headers: { 'X-SOME-HEADER': 'LOL-KEK' }
})
```
Or:
```js
lewys.init({
    headers: ['X-SOME-HEADER': 'LOL-KEK']
})
```

#### Serializer
This options is a intecepotor reqest params. You can handle params any way you want, but have to return string value.
By defult your params will be converted to JSON.
```js
import Qs from 'qs'

lewys.init({
    selrializer (params) {
        return Qs.serilize(params)
    }
})
```

#### Before Response
This options is a intecepotor for response. Will be called before every fetch resolving. You will get a Fetch [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) instance. It is a pomise with same as you usually get after Fetching
You can return any value and you will get it after resolve [lewys requst method](#instance-methods).
```js
const client = lewys.init({
    beforeResponse (res) {
        return res.json().then(data => data)
    },
})

client.request(/* options */)
    .then(res => console.log(res))
```
Pay attention that [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) instance can't be chaged, if you try - you will get error. It's readonly!!
```js
lewys.init({
    beforeResponse (res) {
        res.body = 'something' // will throw error
    },
})
```

#### Before Request
This options is a intecepotor for request. Will be called before every request. You will get a Fetch [Request](https://developer.mozilla.org/en-US/docs/Web/API/Requeste) instance. And you have to return Request istance as well, because Fetch API requeire it. You can pass the same instance you get in arguments:
```js
lewys.init({
    beforeRequest (req) {
        console.log(req.method, req.url)
        return req
    },
})
```
Or return Another instance:
```js
lewys.init({
    beforeRequest (req) {
        if (req.method === 'PUT') {
            return new Request(req.url, {
                method: 'PATCH'
            })
        } else {
            return another
        }
    },
})
```
Pay attention that [Request](https://developer.mozilla.org/en-US/docs/Web/API/Requeste) instance ,same to Response, can't be chaged, if you try - you will get error. It's readonly!!
```js
lewys.init({
    beforeRequest (req) {
        req.body = 'something' // will throw error
    },
})
```




## Instance methods
**lewys#request(options)** 
> Only `url` property are required
```js
client.request({
    url: '/some/api/posts', // requeied
    method: 'get', // unnesesary
    params: { unnesesary: 'params field'}, // unnesesary
})
```
It return you a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) promise by default, but you can intercept and handle it in [beforeResponse](#before-response)



## Aborting Requests
There are only one way to abort Fetch Reqeusts - [AbortCotroller API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). 
Your requests will be aborted at the end of `timeout`, but only if your browser [supports](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) aborting Fetch.




## Browser Support
Checkout [Fetch](https://caniuse.com/#feat=fetch) browser support.
