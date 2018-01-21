module.exports = {
    extends: 'standard',
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        jest: true,
    },

    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // 4 spaces
        'indent': ['error', 4],
        // allow comma
        "comma-dangle": 0,
        // allow 1-2 epmty lines
        "no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 1}]
    }
}