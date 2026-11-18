# Hello API frontend

A small React + TypeScript app that requests `http://localhost:8080/hello` and displays the response. During local development, Vite proxies `/api/hello` to the backend to avoid browser CORS restrictions.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). Make sure the backend is running on port `8080`, then restart Vite after configuration changes.

To use another endpoint, copy `.env.example` to `.env.local` and set `VITE_HELLO_API_URL`. A direct cross-origin URL must allow the frontend origin through its CORS configuration.

## Verify

```bash
npm test
npm run build
```
