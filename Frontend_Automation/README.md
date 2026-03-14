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
- The duplication is minimal — the overlap is really just typescript, eslint, prettier, and dotenv. That's not expensive to repeat.
```

claude did note that:

```claude text
The one thing worth sharing: linting/formatting config (eslint.config.mjs, .prettierrc) can reasonably live at the root and be referenced by both suites, avoiding true duplication of rules without merging dependency trees.
```

2 - I then asked claude to reorganise the project as suggested and then test it by running the existing API tests via the npm test script