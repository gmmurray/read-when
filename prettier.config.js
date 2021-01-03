// https://prettier.io/docs/en/options.html
module.exports = {
  trailingComma: 'all',
  bracketSpacing: true,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  overrides: [
    {
      files: 'Routes.js',
      options: {
        printWidth: 200,
      },
    },
  ],
}
