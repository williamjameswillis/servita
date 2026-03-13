# API Automation

API endpoint - <https://reqres.in/>

## Tooling

jest
typescript
axios - (why chose axios over fetch)

guide part followed - <https://medium.com/codingmountain-blog/setting-up-jest-in-typescript-a-step-by-step-guide-baeac91f4b0a>

## Steps

1 - check which version of node i have installed globally - v25.6.0 (not quite latest).
2 - Update node to latest with homebrew.
3 - check which version updated to - v25.8.1 (latest).
4 - install jest typescript and axios with npm
5 - install eslint and its required libraries for linting in IDE
6 - configure linting by adding recommended config file
7 - add gitignore to stop node_modules being added into source control.
8 - setup settings.json and extensions.json to improve dev experience
9 - installed @types/node and @types/jest for typing support
10 - initialize typescript config `npx tsc -init`
<!-- 11 - install and initialize jest with recommended `npm init jest@latest` command -->
12 - install ts-jest for compilation and type-checking automatically
13 - `npx ts-jest config:init` to setup ts-jest and jest config
14 - add extra npm scripts for triggering linting and typechecking easily
15 - tidied up spurious tsconfig configurations with help of claude sonnet 4.6
16 - created dummy jest test to trial out setup - it failed to compile the trial.test.ts
17 - had some configuration issues which claude helped me correct
18 - trial.test.ts test passing
19 - created initial commit for working jest + typescript + pushed up to github