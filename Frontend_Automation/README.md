# Frontend Automation

## Steps to setup project

1 - at this point i was happy with the start of the API_Automation project (though i still had more to do) and wanted to make a start on the Frontend Automation task so i started to think how i should structure the project. I was concerned about package/setup duplication between API_Automation and Frontend_Automation so i consulted with claude on this but specifically asked it not to make any changes. Initially i was leaning towards having one global package.json at the top level that had both jest and playwright in it, however it suggested, and convinced me of the benefit of going with what it called a 'monorepo-lite pattern' that looks like:

```text
servita/
├── package.json          ← optional: just shared lint/format scripts
├── API_Automation/
│   └── package.json      ← jest, axios, ts-jest, etc.
└── Frontend_Automation/
    └── package.json      ← @playwright/test, typescript, etc.
```

for the following reasons:

```claude text
- Different runtimes/runners — Jest and Playwright have overlapping but distinct dependency trees (e.g. ts-jest is irrelevant to Playwright; Playwright has its own browser binaries and @playwright/test types). Mixing them creates noise and version conflict risk.
- Different configs — jest.config.js, playwright.config.ts, tsconfig.json settings often need to be tuned differently per suite. Sharing a root makes this messy.
- Different execution contexts — API tests likely run in CI headlessly and quickly; E2E Playwright tests need browser installs (npx playwright install). Isolating them lets you install/run only what you need per CI job.
- The duplication is minimal — the overlap is really just typescript, eslint, prettier. That's not expensive to repeat.
```

claude did note that:

```claude text
The one thing worth sharing: linting/formatting config (eslint.config.mjs, .prettierrc) can reasonably live at the root and be referenced by both suites, avoiding true duplication of rules without merging dependency trees.
```

2 - I then asked claude to reorganise the project as suggested and then test it by running the existing API tests via the npm test script.
3 - had to cleanup/improve its work as follows:
- as it added unneeded packages at this level (`dotenv`, `@eslint/js`, `eslint-config-prettier`, `eslint-plugin-prettier`, `typescript-eslint` ).
- it didn't configure playwright well (ie for local vs CI and cross browser was limited).
- auto formatting (ie prettier) wasn't working on save of file in my IDE any longer so had to fix that in the vscode settings.json then test it out from top level and from both test directories.
- i needed to add and configure new `.gitignore` files for top level and Frontend_Automation.

4 - i added a simple `trial.test.ts` file to test out the playwright configuration ie that it would run locally with the top level `npm run test:e2e` script + also checked the top level `npm run test:api` command worked
5 - tested out the npm commands in the Frontend_Automation `package.json` file that claude added to make sure they all work with the trial test
6 - <https://github.com/williamjameswillis/servita/actions/runs/23108438066> pushed that up and checked API tests still passing in CI

## Steps to add CI execution

1 - As the flow for running the E2E tests is very similar I cloned the existing api-tests.yml file and renamed as appropriate
2 - I pushed that up to see if it worked <https://github.com/williamjameswillis/servita/actions/runs/23111096696/job/67128555319> it failed as i havent installed the chromium browser inside the CI runner
3 - added installation of the chromium browser and pushed again <https://github.com/williamjameswillis/servita/actions/runs/23111162844/job/67128724387> - this worked but downloading chromium took 24 seconds so asked claude how best to add this to the caching approach
4 - I liked the look of the claude suggestion so pushed up again here <https://github.com/williamjameswillis/servita/actions/runs/23111222856/job/67128891259> this still took 26 seconds as it was the first run with cache so pushed up again here to see it use the cache correctly <https://github.com/williamjameswillis/servita/actions/runs/23111252935/job/67128975597> which it did work correctly however slightly disappointingly only cut the step down to 22 seconds
5 - checked that the test artefacts were saved out correctly and they were

## Steps to extend `trial.test.ts` file to cover full functionality of target application

## Steps to add NFT:accessibility

## Steps to add NFT:Performance testing

## Steps to add NFT:Security testing