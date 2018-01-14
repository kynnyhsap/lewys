export default (promise, timeout) => {
    timeout = Number(timeout)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Time is out!!')
        }, timeout)

        promise.then(resolve, reject)
    })
}