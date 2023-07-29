const path = require('path')

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*.{css,scss,less}': ['stylelint --fix --allow-empty-input'],
    '*': 'prettier --ignore-unknown --write',
    'schema.prisma': () => [
        'prisma format',
        'prisma generate --generator docs',
        'git add prisma/docs',
    ],
}
