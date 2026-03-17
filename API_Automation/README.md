# API Automation

API endpoint - <https://reqres.in/>
openAPI spec <https://reqres.in/api-docs#>

## Tooling

- jest
- typescript
- axios - (explain why I chose axios over fetch)
- (see API_Automation/package.json for further details of packages)

## Install Requirements to run locally

- node 24 LTS or newer running locally
- from a terminal cd into API_Automation
- run `npm i` to install the node dependencies
- run `npm run test` to execute the API test suite locally
- once the tests finish executing it should automatically open a report in your default browser

## Guidance and AI

- used the api-docs OAS Spec to view the various api endpoints
- online guide part followed - <https://medium.com/codingmountain-blog/setting-up-jest-in-typescript-a-step-by-step-guide-baeac91f4b0a>
- AI agent to assist when i got stuck - Claude Sonnet 4.6

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
11 - install ts-jest for compilation and type-checking automatically
12 - `npx ts-jest config:init` to setup ts-jest and jest config
13 - add extra npm scripts for triggering linting and typechecking easily
14 - tidied up spurious tsconfig configurations with help of claude sonnet 4.6
15 - created dummy jest test to trial out setup - it failed to compile the trial.test.ts
16 - had some configuration issues which claude helped me correct
17 - trial.test.ts test passing
18 - created initial commit for working jest + typescript + pushed up to github

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

1 - installed <https://www.npmjs.com/package/jest-html-reporters> - potentially wouldn't on a major project due to it not looking that well supported (last updated 2 years ago and only from 1 source - Harry Hou) - though on the other side sockets security analysis seems positive - <https://socket.dev/npm/package/jest-html-reporters>
2 - configured jest to create this html report and open it automatically
3 - added report files to .gitignore to not pollute the repo

## Steps to refine the api testing models

1 - refined the user data model to fit what is actually returned in the responses for GET user and GET users (by page) and POST a user - i did this by adding console.log in a bunch of places to see what the response is then building up models accordingly
2 - used these new models in assertions across the tests
3 - renamed the test file for clarity now its no longer a trial to see if i can run jest locally or not

## Steps to add CI execution of tests

1 - Firstly i wasn't sure if this is possible on a free github account so i asked claude to do some research and it said that yes it is up to 2000minutes/month so i decided to setup CI execution of the tests
2 - At the same time i asked this claude suggested some yaml so i went ahead and used the suggested yml file then refined it from there (to add things like saving the html report into the job artefacts to improve dev experience)
3 - also claude always seems to suggest old version of dependencies and github actions so bumped these to latest
4 - pushed up to main to test it out - <https://github.com/williamjameswillis/servita/actions/runs/23063102863>
5 - above failed due to lack of API_KEY which makes sense as i added that locally and then added that file to `.gitignnore` - ill add the API_KEY to a github secret and retry
6 - asked claude if i should do it as an Environment secret or Repository Secret - it suggested Repository Secret for simplicity so i went for that
7 - i then asked claude to help me setup access to it in my GH workflow
8 - pushed that up to test it out again - <https://github.com/williamjameswillis/servita/actions/runs/23084215345/job/67058350798> - Passed - and test-results artefact surfaced in the summary correctly contains the desired html report
9 - pushed up a change to one of my readmes to see the cache of npm dependencies work as this took 5seconds (the second longest step on the successful run) - <https://github.com/williamjameswillis/servita/actions/runs/23084418471/job/67058868707>
10 - however i then went on a side mission as while caching seemed to be working looking at the logs (and the Install dependencies job went from 5s to 4s a 20% speed up) - the actual Set Up Node.js step took 9s instead of 7s (so 2s longer). Claude helped me figure out why - i need to use the latest LTS release of node (ie 24) rather than the latest release as that is bundled into the stock ubuntu image - pushed up again to test this out <https://github.com/williamjameswillis/servita/actions/runs/23084579106/job/67059276828> - passed and Set up Node.js went down to 3s so a massive speedup from 8/9s
