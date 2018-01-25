/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client__ = __webpack_require__(1);


const lewys = {
    init: (settings) => new __WEBPACK_IMPORTED_MODULE_0__client__["a" /* default */](settings)
}

/* harmony default export */ __webpack_exports__["default"] = (lewys);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);


class Client {
    constructor (settings) {
        this.defaults = settings

        if (!this.defaults.credentials) this.defaults.credentials = 'omit'
        if (!this.defaults.redirect) this.defaults.redirect = 'follow'
        if (!this.defaults.timeout) this.defaults.timeout = 30000
        if (!this.defaults.cache) this.defaults.cache = 'default'
        if (!this.defaults.mode) this.defaults.mode = 'cors'
    }

    request (opts) {
        const OPTIONS = {}
        let { url, method, body, params, headers } = opts
        let { credentials, mode, redirect, cache } = opts

        const serializedParams = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].paramsSerializer(params, this.defaults.serializer)
        const URL = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].constructURL(this.defaults.baseURL, url, serializedParams)

        if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].hasBody(method)) OPTIONS.body = body

        OPTIONS.credentials = credentials || this.defaults.credentials
        OPTIONS.redirect = redirect || this.defaults.redirect
        OPTIONS.headers = new Headers(headers || this.defaults.headers)
        OPTIONS.cache = cache || this.defaults.cache
        OPTIONS.mode = mode || this.defaults.mode
        OPTIONS.method = method || 'GET'

        const request = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].intercept(
            new Request(URL, OPTIONS),
            this.defaults.beforeRequest
        )

        return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */]
            .startTimeout(fetch(request), this.defaults.timeout)
            .then(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].handleStatus)
            .then(response => __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].intercept(
                response,
                this.defaults.beforeResponse
            ))
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Client);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    intercept (entity, interceptor) {
        const isReq = (entity instanceof Request)

        if (typeof interceptor === 'function') {
            const result = interceptor(entity, this.getWritbleOptions(entity))

            if (isReq && !(result instanceof Request)) {
                throw new Error('[Error in beforeRequest]: returned value must be instance of Request')
            }

            return result
        } else {
            return entity
        }
    },

    getWritbleOptions (object) {
        const writble = {}

        for (let key in object) {
            if (typeof object[key] === 'function') continue
            writble[key] = object[key]
        }

        return writble
    },

    handleStatus (res) {
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(new Error(res.statusText))
        }
    },

    constructURL (baseURL, relativeURL, params) {
        const isFull = /(https?:\/\/)/ig
        let url = ''

        if (isFull.test(relativeURL)) url = relativeURL
        else url = baseURL + relativeURL

        if (params) url += `?${params}`
        // console.log(url)
        return url
    },

    hasBody (method) {
        method = method.toUpperCase()

        return (
            method === 'POST' ||
            method === 'PUT' ||
            method === 'PATCH'
        )
    },

    paramsSerializer (params, serilizer) {
        if (typeof serilizer === 'function') {
            return serilizer(params)
        } else {
            return JSON.stringify(params)
        }
    },

    startTimeout (promise, timeout, message = 'Time is out!!') {
        timeout = Number(timeout)

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(message)
            }, timeout)

            promise.then(resolve, reject)
        })
    },
});


/***/ })
/******/ ]);