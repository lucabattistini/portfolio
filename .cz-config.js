module.exports = {
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ feat:\tA new feature',
    },
    {
      value: ':bug: fix',
      name: '🐛 fix:\tA bug fix',
    },
    {
      value: ':books: docs',
      name: '📚 docs:\tAdd or update documentation',
    },
    {
      value: ':gem: style',
      name: '💎 style:\tChanges that do not affect the meaning of the code',
    },
    {
      value: ':hammer: refactor',
      name: '🔨 refactor:\tA code change that neither fixes a bug nor adds a feature',
    },
    {
      value: ':rocket: perf',
      name: '🚀 perf:\tA code change that improves performance',
    },
    {
      value: ':test_tube: test',
      name: '🧪 test:\tAdding missing tests or correcting existing tests',
    },
    {
      value: ':wrench: chore',
      name: '🔧 chore:\tChanges to the auxiliary tools',
    },
    {
      value: ':rewind: revert',
      name: '⏪️ revert:\tRevert to a commit',
    },
    {
      value: ':construction: wip',
      name: '🚧 wip:\tWork in progress',
    },
    {
      value: ':package: build',
      name: '📦 build:\tChanges that affect the build system or external dependencies',
    },
    {
      value: ':construction_worker: ci',
      name: '👷 ci:\tChanges to our CI configuration files and scripts',
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
