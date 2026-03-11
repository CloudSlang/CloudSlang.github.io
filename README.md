# CloudSlang.github.io

CloudSlang website — [https://cloudslang.io](https://cloudslang.io)

A project by [OpenText](https://www.opentext.com/).

## Prerequisites

- **Node.js 20.x** or later
- npm 9+

## Development

Install dependencies and start the Vite dev server with hot-reload:

```sh
npm install
npm run dev
```

The site is served at `http://localhost:5173` by default.

## Production build

```sh
npm run build
```

Vite compiles the site into the `public/` directory, which is then served by the Express server.

## Running the production server locally

```sh
npm run build
npm start
```

The Express server listens on `http://localhost:5000` (or the port defined by the `PORT` environment variable).

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML / CSS / JavaScript |
| Build tool | [Vite](https://vitejs.dev/) |
| Server | [Express](https://expressjs.com/) 4.x |
| Security headers | [Helmet](https://helmetjs.github.io/) |
| License | Apache 2.0 |

