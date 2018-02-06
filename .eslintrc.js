module.exports = {
    extends: 'standard',
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        jest: true,
    },

    rules: {
        // 4 spaces
        indent: ['error', 4],

        'comma-dangle': 0,
        'space-before-function-paren': ['error', 'never'],
    },
}
