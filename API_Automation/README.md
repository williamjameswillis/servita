# API Automation

API endpoint - <https://reqres.in/>

## Tooling

jest
typescript
axios - (explain why I chose axios over fetch)

guide part followed - <https://medium.com/codingmountain-blog/setting-up-jest-in-typescript-a-step-by-step-guide-baeac91f4b0a>

## Steps to setup project

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

## Steps to get initial tests running against API endpoint

1 - go to [API endpoint](https://reqres.in/) and create a public key and save it locally
2 - create a .env file and add it to the .gitignore file so the key does not go into a commit/source control
3 - add a new env var called API_KEY into the env file and enter the public key for it
4 - install dotenv npm package so that we can use env files in node
5 - create helpers.ts and create a simple axios client so we can call the api endpoint - this reads the API_KEY env var to make the connection.
6 - at this point i remembered how much i rely on prettier so installed and configured prettier to run on save of file and created an extra npm script to run it on demand (or later in CI). - i got a bit of help from claude with the config of this with eslint + typescript.
7 - updated test file to use this axios client via 2 positive test cases ( POST a user and a GET a user).
8 - created a data models file with a user model and data objects file with a user object that uses the user model to enforce the right shape - this allows for cleaner tests (both in setup and assertions)
9 - tried to create negative test cases but was hitting an issue where axios was throwing errors a level up due to a none 200 response code - got help from claude on how to configure axios to not throw errors in the scenario - allowing the tests to assert on non 200 errors.

## Steps to add reporting
1 - installed https://www.npmjs.com/package/jest-html-reporters - potentially wouldnt on a major project due to it not looking that well supported (last updated 2 years ago and only from 1 source - Harry Hou) - though on the other side sockets security analysis seems positive - <https://socket.dev/npm/package/jest-html-reporters>
2 - configured jest to create this html report and open it automatically
3 - added report files to .gitignore to not pollute the repo

## Steps to refine the api testing models
1 - refined the user data model to fit what is actually returned in the responses for GET user and GET users (by page) and POST a user - i did this by adding console.log in a bunch of places to see what the response is then building up models accordingly
2 - used these new models in assertions across the tests
3 - renamed the test file for clarity now its no longer a trial to see if i can run jest locally or not

## Steps to add CI execution of tests
1 - Firstly i wasnt sure if this is possible on a free github account so i asked claude to do some research and it said that yes it is up to 2000minutes/month so i decided to setup CI execution of the tests
2 - At the same time i asked this claude suggested some yaml so i went ahead and used the suggested yml file then refined it from there (to add things like saving the html report into the job artefacts to improve dev experience) 
3 - also claude always seems to suggest old version of dependencies and github actions so bumped these to latest
4 - pushed up to main to test it out - <https://github.com/williamjameswillis/servita/actions/runs/23063102863>
5 - above failed due to lack of API_KEY which makes sense as i added that locally and then added that file to gitignnore - ill add the API_KEY to a github secret and retry
6 - asked claude if i should do it as an Environment secret or Repository Secret - it suggested Repository Secret for simplicity so i went for that
7 - i then asked claude how do i access it in my GH workflow as its always find that finikity
8 - pushed that up to test it out again - <>