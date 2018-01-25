# Lewys
---------------
## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | No ✖|

## Installation
Npm:  `npm i lewys`

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
| baseURL | `string` | ✖ | [➡️](#) |
| timeout | `number` | 30000 | [➡️](#) |
| headers | `array|object` | ✖ | [➡️](#) |
| serializer | `function` | ✖ | [➡️](#) |
| beforeRequest | `function` | ✖ | [➡️](#) |
| beforeResponse | `function` | ✖ | [➡️](#) |
| handleStatus | `function` | ✖ | [➡️](#) |
| mode | `string` | 'cors' | [➡️](#) |
| redirect | `string` | 'follow' | [➡️](#) |
| cache | `string` | 'default' | [➡️](#) |
| credentials | `string` | 'omit' | [➡️](#) |

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
const posts = client.request({
    url: '/some/api/posts', // requeied
    method: 'get', // unnesesary
    params: { unnesesary: 'params field'}, // unnesesary
})
```
It return you a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) promise by default, but you can intercept and handle it in `beforeResponse`.