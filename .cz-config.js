module.exports = {
  types: [
    {
      value: ':sparkles: feat',
      name: 'โจ feat:\tA new feature',
    },
    {
      value: ':bug: fix',
      name: '๐ fix:\tA bug fix',
    },
    {
      value: ':books: docs',
      name: '๐ docs:\tAdd or update documentation',
    },
    {
      value: ':gem: style',
      name: '๐ style:\tChanges that do not affect the meaning of the code',
    },
    {
      value: ':hammer: refactor',
      name: '๐จ refactor:\tA code change that neither fixes a bug nor adds a feature',
    },
    {
      value: ':rocket: perf',
      name: '๐ perf:\tA code change that improves performance',
    },
    {
      value: ':test_tube: test',
      name: '๐งช test:\tAdding missing tests or correcting existing tests',
    },
    {
      value: ':wrench: chore',
      name: '๐ง chore:\tChanges to the auxiliary tools',
    },
    {
      value: ':rewind: revert',
      name: 'โช๏ธ revert:\tRevert to a commit',
    },
    {
      value: ':construction: wip',
      name: '๐ง wip:\tWork in progress',
    },
    {
      value: ':package: build',
      name: '๐ฆ build:\tChanges that affect the build system or external dependencies',
    },
    {
      value: ':construction_worker: ci',
      name: '๐ท ci:\tChanges to our CI configuration files and scripts',
    },
  ],
  scopes: [],
  scopeOverrides: {
    fix: [{ name: 'merge' }, { name: 'style' }, { name: 'test' }, { name: 'hotfix' }],
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['footer', 'breaking'],
  subjectLimit: 100,
};
