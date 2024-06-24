#!/usr/bin/env node

module.exports = {
  prompter(cz, commit) {
    console.info('All lines except first will be wrapped after 100 characters.');

    const questions = [
      {
        type: 'list',
        name: 'type',
        message: "Select the type of change that you're committing",
        choices: [
          { value: '🏅', name: 'feat🏅           A new feature' },
          { value: '🐞', name: 'fix 🐞           A bug fix' },
          { value: '🚑', name: 'hotfix 🚑        Critical hotfix!' },
          {
            value: '🔨',
            name: 'improvement 🔨   Improve a current implementation without adding a new feature or fixing a bug',
          },
          {
            value: '🎨',
            name: 'markup 🎨        Changes that applies on css/html or content part, fix/improvement frontend looking',
          },
          {
            value: '♻️',
            name: 'refactor ♻️       A code change that neither fixes a bug nor adds a feature',
          },
          {
            value: '💄',
            name: 'code-style 💄    Changes for code style, includding prettier (white-space, formatting, missing semi-colons, etc)',
          },
          {
            value: '🔦',
            name: 'debug 🔦         Changes to catch errors, collect debug specific data',
          },
          {
            value: '⚡️',
            name: 'perf ⚡️          A code change that improves performance',
          },
          { value: '🧪', name: 'test 🧪          Adding missing tests' },
          {
            value: '🏗',
            name: 'dev-tools 🏗      Changes to the build process, dev scripts and docker',
          },
          { value: '📝', name: 'docs 📝          Documentation only changes' },
          {
            value: '📌',
            name: 'dependency 📌    Changes cause of dependency updating/changing',
          },
          { value: '⏪️', name: 'revert ⏪️        Revert to a commit' },
          { value: '🚧', name: 'WIP 🚧           Work in progress' },
        ],
      },
      {
        type: 'input',
        name: 'subject',
        message: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
        validate(value) {
          const limit = 100;
          if (value.length > limit) {
            return `Exceed limit: ${limit}`;
          }
          return true;
        },
      },
      {
        type: 'editor',
        name: 'body',
        default: (answers) => [answers.type, answers.subject].join(' '),
        message: 'Provide a LONGER description of the change:\n',
      },
      {
        type: 'confirm',
        name: 'confirmCommit',
        default: true,
        message: (answers) => {
          const SEP =
            '###--------------------------------------------------------###';
          console.info(`\n${SEP}\n${answers.body}\n${SEP}\n`);
          return 'Are you sure you want to proceed with the commit above?';
        },
      },
    ];

    cz.prompt(questions).then((answers) => {
      if (answers.confirmCommit) {
        commit(answers.body);
      } else {
        console.info('Commit has been canceled.');
      }
    });
  },
};
