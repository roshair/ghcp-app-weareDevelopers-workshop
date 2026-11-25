# Mastering the GitHub Copilot App

WeAreDevelopers India, 25 November 2026, 15:30–17:30 IST. Romaan Shair and Siddhat Joshi.

This repository starts with a working, dependency-free session planner using fictional talks. The missing track filter is intentional.

[Workshop landing page](https://roshair.github.io/ghcp-app-weareDevelopers-workshop/) · [Lab guide](docs/guide.md)

## Run locally

Use Node.js 22.22.0, pinned in `.nvmrc` so local development and CI use the same version. With nvm, run `nvm install` and `nvm use` from the repository root; otherwise, select Node.js 22.22.0 in your Node version manager. Then, from the repository root, run:

```sh
npm ci
npm test
npm run build
npm start
```

Open [the planner](http://127.0.0.1:4173/planner/) in a browser. Use `Ctrl+C` to stop the server. Nothing needs a key, database, or external API.

If port 4173 is already in use, start the server on port 4174 instead:

```sh
PORT=4174 npm start
```

In PowerShell, use:

```powershell
$env:PORT='4174'; npm start
```

Then open [the planner on port 4174](http://127.0.0.1:4174/planner/). Use `Ctrl+C` to stop the server.

- `docs/planner/` — app source.
- `test/` — Node's built-in test runner.
- `dist/planner/` — generated static build.
