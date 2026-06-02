# FiveM Monorepo

Local FiveM development workspace using Bun, Turbo, Docker, and a shared resource package layout.

## Requirements

- Docker or Docker Desktop
- Bun 1.3.0 or newer
- A valid FiveM license key

## Project layout

```text
.
├── docker-compose.dev.yml   # Local fxserver runtime
├── fxserver/                # FiveM server configuration
└── packages/                # FiveM resources and shared packages
    ├── bundler/             # flowbuild CLI for Bun-based resource builds
    └── core-auth/           # Example server resource
```

## Install

```bash
bun install
```

## Build resources

```bash
bun run build
```

For active development, run the watcher:

```bash
bun run watch
```

The resource build pipeline compiles `src/server/server.ts` to `dist/server.js` and `src/client/client.ts` to `dist/client.js` when those entrypoints exist.

## Configure the server

Copy or update the server config and set your own license key:

```bash
cp fxserver/server.example.cfg fxserver/server.cfg
```

Then edit `fxserver/server.cfg` and replace the placeholder value in:

```cfg
set sv_licenseKey "your license key"
```

## Run FiveM locally

Start the development server:

```bash
docker compose -f docker-compose.dev.yml up
```

The compose file starts the FiveM runtime and mounts:

- `fxserver/server.cfg` into `/config/server.cfg`
- `packages/` into `/config/resources/[core]`
- `txData/` into `/txData`

## Ports

- FiveM server: `30120/tcp`
- FiveM server UDP: `30120/udp`
- fxAdmin: `http://localhost:40120`

The local Docker runtime creates and exposes fxAdmin on port `40120`.

## Stopping the server

```bash
docker compose -f docker-compose.dev.yml down
```
