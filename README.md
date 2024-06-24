# ailab
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# 💡 Usage
We use [SemVer][semver] specification for versioning, which dictate how version numbers are assigned and incremented.

Each new **Major** and **Minor** version changes is scheduled in task management system - Jira/Trello/Whatever
**Patch** versions is for hotfixes or features which we need to deploy for some reason right now.

## ⛓️ Cross Dependencies in npm
Avoid listing external packages in multiple package.json files to prevent confusion and version mismatch problems.  

For instance, if `@ailab/web` app depends on `@ailab/components` internal package and `use-debounce` external npm package, there is no need to put use-debounce in package.json of `@ailab/web`

[semver]: http://semver.org/
[git-flow-cheatsheet]: http://danielkummer.github.io/git-flow-cheatsheet

## 🌿 Git flow

We use [Vincent Driessen's branching model.](http://nvie.com/posts/a-successful-git-branching-model/)

Read details here:

- http://nvie.com/posts/a-successful-git-branching-model/
- http://danielkummer.github.io/git-flow-cheatsheet/

To make the git flow experience smoother you can use **custom git commands**(regular shell scripts) -
[git-flow](https://github.com/petervanderdoes/gitflow-avh)

- **[Installation instruction](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Mac-OS-X)**
- **[git-flow commands](https://github.com/petervanderdoes/gitflow-avh/wiki#reference)**

[Setup](https://github.com/petervanderdoes/gitflow-avh#initialization) a git repository for **git-flow** usage(store **
git-flow** config in .git/config):

```sh
git flow init -d
```

## 💬 Commit message

We use [conventional commits specification](https://conventionalcommits.org/) for commit messages.

#### Commitizen

To ensure that all commit messages are formatted correctly, you can use
[Commitizen](http://commitizen.github.io/cz-cli/) cli tool. It provides interactive interface that creates your commit
messages for you.

```sh
sudo npm install -g commitizen
```

From now on, instead of `git commit` you type `git cz` and let the tool do the work for you.

You should strive for a clear informative commit message.
Read **[How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)**.

**Helpful hint**: You can always edit your last commit message, before pushing, by using:

```sh
git commit --amend
```

## 🤝 Contributing

After cloning the repo, initialize the local repository with gitflow(if you use it):

```sh
git flow init -d
```

When starting work on a new issue, branch off from the develop branch.

```sh
git checkout -b feature/<feature> develop
# git-flow:
git flow feature start <feature>
```

If your feature/bug/whatever have an **github or trello issue** then use issue id as feature name. For instance:

```sh
git checkout -b feature/1 develop
# git-flow:
git flow feature start 1
```

Which mean you start working on #1 issue(/issues/1 regarding the repo).

Then, do work and commit your changes.

```sh
git push origin feature/<feature>
# git-flow:
git flow feature publish <feature>
```

When done, open a pull request to your feature branch.

If you have a permit to close the feature yourself:

```sh
git checkout develop
# Switched to branch 'develop'
git merge --no-ff feature/<feature>
# Use --no-ff to avoid losing information about the historical existence of a feature branch
git branch -d feature/<feature>
# Deleted branch
git push origin develop
```

Same with **git-flow**:

```sh
git flow feature finish
```

## 📝 Preparing a good PR

- A pull request should have a specific goal and have a descriptive title. Do not put multiple unrelated changes in a
  single pull request
- Do not include any changes that are irrelevant to the goal of the pull request. This includes refactoring or
  reformatting unrelated code and changing or adding auxiliary files
  (.gitignore, etc.) in a way that is not related to your main changes.
- Make logical, not historical commits. Before you submit your work for review, you should rebase your branch (**git
  rebase -i**) and regroup your changes into logical commits. Logical commits achieve different parts of the pull
  request goal. Each commit should have a descriptive commit message. Logical commits within a single pull request
  rarely overlap in the lines of code they touch.
- If you want to amend your pull request, rewrite the branch and force-push it instead of adding new (historical)
  commits or creating a new pull request.

## 🔧 Maintaining

To start a release, use the git flow release command. It creates a release branch created from the 'develop' branch.

```sh
git flow release start RELEASE
```

Finishing a release is one of the big steps in git branching. It performs several actions:

- Merges the release branch back into 'master'
- Tags the release with its name
- Back-merges the release into 'develop'
- Removes the release branch

```sh
git flow release finish RELEASE
```

Don't forget to push your tags

```sh
git push origin --tags
```

## 🏷️ Naming convention

Use airbnb naming conventions:

- https://github.com/airbnb/javascript/tree/master/react#naming
- https://github.com/airbnb/javascript#naming-conventions

Naming cheatsheet
https://github.com/kettanaito/naming-cheatsheet
Clean code for javaScript
https://github.com/ryanmcdermott/clean-code-javascript

#### Variables

Use declarative style and avoid single letter names. If you use abbreveature leave comment with deciphering
abbreviations.

#### Selectors

All selectors should have a 'get' prefix.

#### Actions

Actions must begin with some verb - set, fetch, fill, add, delete, etc...

# 🔗 Usefull links

https://iconbuddy.app - Over 180k+ open source icons

[react]: https://reactjs.org/
[redux]: http://redux.js.org
[redux-saga]: https://github.com/redux-saga/redux-saga
[redux-resource]: https://github.com/jmeas/redux-resource
[reselect]: https://github.com/reactjs/reselect
[styled-components]: https://www.styled-components.com
