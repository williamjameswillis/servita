# Frontend Automation§

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

## Steps to extend `trial.test.ts` file to cover required functionality of target application

### 1. Login and Logout flows

1 - reviewed set exercise and the target application and decided a industry best practice Page Object Model approach would work best. this approach is maintainable and easy to extend - each of the 3 flows requested to be automated can reuse functions that only need to be maintained in one place. POM also allows us to use  class inheritance which fits the target applications behavior nicely ie the always visible cart and burger menu can be on a base object page that specific pages like inventory can inherit.
2 - also decided to have three test files, one for each flow for readability
3 - inspected the target application with dev tools and found a lot of ui elements have data-test attributes allowing for accurate and stable interaction - decided on selector strategy as follows: use data-test primarily and fall back to displayed text then fallback to html ids
4 - built a basePage object first - used <https://playwright.dev/docs/pom> as a starting point/refresher 
5 - then built inventoryPage to inherit basePage - this is to bake in the structure early. Of note is that i was going to call this page the homePage as its the one a user lands on in happy path after login however i decided not to as the page is named inventory - so for ease of maintenance and readability i think it works better to match the actual page names
6 - i wanted to create a type for ProductSortOption to scope the options that could be passed to clickProductSortDropdownOption but couldn't quite remember/get it right so got help from claude on implementing this.
7 - now that i have the start of a basePage and inventoryPage (essentially the homepage) i decided to create the loginPage - once this in place i should be able to start fleshing out UI flow 1 from the exercise
8 - i built a loginCredentials.ts file to store the login credentials displayed on the login page, i did consider getting these at run time so that if they change it handles it, however though that the overhead of doing this wasn't worth it + the code is more readable and maintainable storing them. Of note that the ai auto type on this object somehow knew all the options so expect the training data for the LLM model is in no small part based off this saucedemo `:)`
9 - i had to add the dotenv package into this directory to store the password locally + a github secret for in CI - for the usernames - although its displayed in plaintext on the website i wanted to follow best practice and manage it as a secret.
10 - updated `.gitignore` so that the `.env` is not added to source control.
11 - pushed this up as needed to walk the dog and didn't want to lose my work locally `:)`
12 - built up the loginPage and the menu component to allow me to use these in the first test to be tackled `login_and_logout.test`
13 - was planning on looping through all 6 of the users in the same test but seeing as some are happy path and some are sad path i thought they could end up a very complicated test that is hard to read and maintain ie with <https://playwright.dev/docs/test-parameterize> - decided to have dedicated tests - might revisit this if and when i decide on implementing BDD <https://github.com/vitalets/playwright-bdd>
14 - to get instances of my POM classes in my test file i considered using `new LoginPage(page)` approach but given previous experience this leads to a lot of boilerplate code - i read up online and consulted claude and both suggested going with extending Playwrights test fixture - i asked claude to add a basic `fixture.ts` file and then tidied it up
15 - i then wrote the first test of the login - logout flow with standard user 
16 - i wasnt satisfied with just checking the UI - and since i cannot check a DB backend i decided to add a check of the logged in session cookie once logged in + check its cleared by logout - followed <https://www.browserstack.com/guide/playwright-cookies>
17 - ran into an issue with clicking the menu button - the data-test attribute wasnt working as it seemed to be trying to click an image so i switched to getting it by its `Open Menu` text instead and that did the trick
18 - pushed that up to see if it works in CI <https://github.com/williamjameswillis/servita/actions/runs/23119556807/job/67151002296> - it failed due to not successfully logging in - it was useful at this point to see the retry strategy i had configured working 
19 - i consulted the test aretfacts and it was immediately apparent that it had failed as i forgot to pass the github secret for the password through to the test - so i fixed that and re-pushed <https://github.com/williamjameswillis/servita/actions/runs/23119629526> - this passed - though i noticed from a github warning that i wasn't using the latest actions/cache@v version so i bumped that to latest and repushed <https://github.com/williamjameswillis/servita/actions/runs/23119698163/job/67151384011> - this went green again and with no warning message `:)`
20 - worked through adding the remaining tests - once instance where i did consult claude was around how to handle the unhappy paths in terms of the expects - ie assert that things are wrong. - see verifyIfDuplicateProductImages for what i settled on + it also helped me simplify the logic as it knew that Set constructor only stores unique values (so de-dupes automatically)
21 - for the performance test user i part followed this guide <https://www.browserstack.com/guide/playwright-performance-testing> and consulted with claude on best cross browser options for checking for slow performance - i went with node performance.now() as its cross browser.
22 - at this point i went through and added some JSDoc strings to the more complicated functions so devs get the nice explanation on what a function is doing and its parameters when they hover it
23 - of note when i was creating the error_user test i tried to use .all() on the locator for data-test^='add-to-cart-' but that was failing due to the UI change of the button - claude helped me with a rewrite
24 - i wanted to explicity check for an error to be thrown in the browser console so read up <https://playwright.dev/docs/api/class-consolemessage> and function in basePage to listen and assert for console errors - also consulted claude here as i couldn't get the event to be detected because i was waiting for a console message when i should have been waiting for pageerror
25 - for the visual user test where the UI has the regression of the shopping cart being in the wrong place i considered using either screenshot testing (images + pixels) or snapshot testing (DOM structure) - given previous experience with screenshot testing + the larger overhead i decided to try DOM snapshot testing first. This went fine except the fact ARIA snapshots can differ across browsers when text nodes are structured differently - so i needed to configure specific snapshots on a per browser basis in the `playwright.config.ts` file using snapshotPathTemplate
26 - got all these tests passing locally and pushed up to see CI behaviour <https://github.com/williamjameswillis/servita/actions/runs/23148633839> this passed 

### 2. Single Item Checkout

1 - firstly i decided to use Playwright session in flows 2 and 3  - this way we still test the login+logout flow fully but don't have the overhead of having to go through the login flow for each test - article partly followed <https://medium.com/@Gayathri_krish/mastering-persistent-sessions-in-playwright-keep-your-logins-alive-8e4e0fd52751>
2 - made a start on `single_item_checkout.test.ts` and pushed that up as needed a break <https://github.com/williamjameswillis/servita/actions/runs/23149908061/job/67248467386> - this failed as i had forgot to remove the .only on the test `:)` - i am retrospectively claiming that this was actually a test of the playwright config `forbidOnly: isCI,` line `:)`
3 - when i was building up this test i was running the full suite locally as i went to detect any rare flakes - i did encounter one with the visual_user test in the login and logout flow - the DOM snapshots were not always matching so i asked claude what it thought and it suggested adding a wait for the network to be idle before performing the assertion and this seemed to help
4 - decided to use faker to create my checkout data - probably overkill but its such a nice library and it meets the 'random' data requirement specified `:)`

## Steps to add Visual Regression testing

Decided against this as used DOM snapshots already.

## Steps to add NFT:accessibility

## Steps to add NFT:Performance testing

## Steps to add NFT:Security testing

