const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')} --max-warnings 0`;

module.exports = {
  '**/*.{css,less,scss,html,json,tsx,jsx,ts,js}': ['prettier --write'],
  '**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{json,md}': ['prettier --write'],
};
