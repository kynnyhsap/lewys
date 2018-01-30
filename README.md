# Lewys
----------------------------------------------------



Manage your api nice and easely with Lewys - Fetch 'under the hood' client



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
### In case you are using webpack:
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


## Creating an instance:
**lewys.init(options)**
```js 
const client = lewys.init({ /* Initial Options */})
```



## Instance options
> All of those options not required for initilizing

| Prop | Type | Default | 📝 |
| --- | --- | --- | --- |
| baseURL | *string* | ✖ | [➡️](#) |
| timeout | *number* | `30000` | [➡️](#) |
| headers | *array or object* | ✖ | [➡️](#) |
| serializer | *function* | ✖ | [➡️](#) |
| beforeRequest | *function* | ✖ | [➡️](#) |
| beforeResponse | *function* | ✖ | [➡️](#) |
| handleStatus | *function* | ✖ | [➡️](#) |
| mode | *string* | `'cors'` | [➡️](#) |
| redirect | *string* | `'follow'` | [➡️](#) |
| cache | *string* | `'default'` | [➡️](#) |
| credentials | *string* | `'omit'` | [➡️](#) |

You can also define those options after client initializing:
```js
const client = lewys.init()

client.defaults.baseURL = 'https://lol.kek/api'
client.defaults['baseURL'] = 'https://lol.kek/api'
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
It return you a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) promise by default, but you can intercept and handle it in `beforeResponse`.




## Aborting Requests
There are only one way to abort Fetch Reqeusts - [AbortCotroller API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). 
Your requests will be aborted at the end of `timeout`, but only if your browser [supports](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) aborting Fetch.




## Browser Support
Checkout [Fetch](https://caniuse.com/#feat=fetch) browser support.
