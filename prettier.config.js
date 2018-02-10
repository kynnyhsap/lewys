module.exports = {
    semi: false,
    tabWidth: 4,
    useTabs: false,
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'avoid',
    overrides: [
        {
            files: 'package.json',
            options: {
                printWidth: 150,
                tabWidth: 2,
            },
        },
    ],
}
