# Hannah Training Logger

Mobile-first local training logger for Hannah's solo gym session.

## Run Locally

```bash
npm install
npm run dev
```

The editable programme content lives in:

```text
src/data/programme.js
```

Future 4-week programme updates should only need changes to that file.

## Build

```bash
npm run build
```

## GitHub Pages

This repo includes a GitHub Actions workflow at:

```text
.github/workflows/deploy.yml
```

It builds and deploys automatically when changes are pushed to the `main` branch.

The Vite config uses a relative base by default for local/static preview:

```js
base: process.env.VITE_BASE_PATH || './'
```

The GitHub Pages workflow sets `VITE_BASE_PATH` automatically from the repository name. For a manual GitHub Pages build, set it to the repository path, for example:

```bash
VITE_BASE_PATH=/hannah-training-logger/ npm run build
```

On Windows PowerShell:

```powershell
$env:VITE_BASE_PATH='/hannah-training-logger/'; npm run build
```
