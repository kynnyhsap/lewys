export default (method) => {
    method = method.toUpperCase()

    return (
        method === 'POST' ||
        method === 'PUT' ||
        method === 'PATCH'
    )
}