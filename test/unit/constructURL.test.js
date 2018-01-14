import utils from '../../src/utils'

test('Sould concat baseURL, relativeURL and params(if exist) to single string', () => {
    const baseURL = 'https://test.some'
    const relativeURL = '/api/post/1'
    const params = 'some=10'

    const URL = utils.constructURL(baseURL, relativeURL, params)

    expect(URL).toBe('https://test.some/api/post/1?some=10')
})