import utils from '../../src/utils'
import errors from '../../src/errors'

describe('Utils', () => {
    describe('intercept', () => {
        const data = { lol: 'kek' }
        const interceptor = obj => obj.lol

        it('should handle passed object', () => {
            expect(utils.intercept(data, interceptor)).toBe('kek')
        })

        it('should return headled by default object', () => {
            expect(utils.intercept(data)).toBe(data)
        })
    })

    describe('handleStatus', () => {
        it('should resolve if status between 200 and 300', () => {
            const niceRes = { status: 200, statusText: 'Ok' }

            expect.assertions(1)

            return expect(utils.handleStatus(niceRes)).resolves.toEqual(niceRes)
        })

        it('sould reject if status is ivalid', () => {
            const badRes = { status: 404, statusText: 'Not found' }
            const err = new Error(badRes.statusText)

            expect.assertions(1)

            return expect(utils.handleStatus(badRes)).rejects.toEqual(err)
        })
    })

    describe('paramsSerializer', () => {
        const params = { lol: 'kek' }
        const stringified = JSON.stringify(params)
        const serializer = params => 'lol=kek'

        it('should handle params by custom serializer', () => {
            expect(utils.intercept(params, serializer || JSON.stringify)).toBe(
                'lol=kek'
            )
        })

        it('should return default stringified params', () => {
            expect(utils.intercept(params, JSON.stringify)).toBe(stringified)
        })
    })

    describe('makeUrl', () => {
        it('should concat base URL, relative URL and params(if exist) to single string', () => {
            const base = 'https://it.some'
            const relative = '/api/post/1'
            const params = 'some=10'

            const url = utils.makeUrl({ base, relative })
            const urlWithParams = utils.makeUrl({ base, relative, params })

            expect(url).toBe('https://it.some/api/post/1')
            expect(urlWithParams).toBe('https://it.some/api/post/1?some=10')
        })

        it('should ignore baseURL if relative URL is fully', () => {
            const base = 'https://it.some'
            const relative = 'http://some.other/api'

            expect(utils.makeUrl({ base, relative })).toBe(relative)
        })
    })

    describe('hasBody', () => {
        it('should check if request method could have a body', () => {
            const POST = 'POST'
            const PUT = 'PUT'
            const PATCH = 'PATCH'
            const otherMethod = 'SOMEOTHER'

            expect(utils.hasBody(POST)).toBeTruthy()
            expect(utils.hasBody(PUT)).toBeTruthy()
            expect(utils.hasBody(PATCH)).toBeTruthy()
            expect(utils.hasBody(otherMethod)).toBeFalsy()
        })
    })

    describe.skip('startTimeout', () => {
        const err = new Error()
        err.name = 'AbortError'

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done')
            }, 3000)
        })

        it('should resolve if time left', () => {
            const request = {
                promise,
                timeout: 5000,
                controller: { abort: () => console.log('aborted') },
            }

            expect.assertions(1)
            return expect(utils.startTimeout(request)).resolves.toBe('done')
        })

        it('should reject on abort', () => {
            err.message = errors.OnAbort
            const request = {
                promise,
                timeout: 1000,
                controller: { abort: () => console.log('aborted') },
            }

            expect.assertions(1)
            return expect(utils.startTimeout(request)).rejects.toEqual(err)
        })

        it('should reject on timeout', () => {
            err.message = errors.OnTimeout
            const request = {
                promise,
                timeout: 1000,
                controller: undefined,
            }

            expect.assertions(1)
            return expect(utils.startTimeout(request)).rejects.toEqual(err)
        })
    })
})
