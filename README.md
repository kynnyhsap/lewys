# Lewys
---------------

## Installation
Npm:  `  npm i lewys  `

Yarn:  `  yarn add lewys  `

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

### Using CDN:
```html
<script src="https://unpkg.com/lewys/lewys.min.js"></script>
```

## Creating an instance:
**lewys.init([options])**
```js 
const client = lewys.init({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})
```


## Default instance options
```js
{
    // `baseURL` will be concated with `url`(relative url) and
    // params(if exist) options inside the client.request() method
    baseURL: 'https://some-domain.com/api/',

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted(u get an uncougth rejected promise).
    timeout: 1000,

    // `headers` are custom headers to be sent
    headers: {'X-Requested-With': 'XMLHttpRequest'},

    beforeRequest () {},
    beforeResponse () {},
    // `paramSerializer` is an optional function in charge of serializing `params`
    // (e.g. https://www.npmjs.com/package/qs)
    paramSerializer (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
}
```

You can also define all of those options after client initializing:
```js
const client = lewys.init()

client.defaults.baseURL = 'https://lol.kek/api'
client.defaults['baseURL'] = 'https://lol.kek/api'
```


## Instance methods
**lewys#request(options)**
```js
client.request({
    url: '/some/api/posts',
    method: 'get',
    params: { unnesesary: 'params field'}
})
```
