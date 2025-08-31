# Copilot Instructions for SIGMAXIS (MetaMask SDK Examples Monorepo)

## Project Overview
- This is a Turborepo monorepo for MetaMask SDK integration examples across multiple frameworks (React, Next.js, Vue, Vanilla JS).
- The main focus is on demonstrating wallet connection, network switching, and Ethereum smart contract interaction using MetaMask SDK.
- The `examples/quickstart` app is a Next.js + wagmi quickstart dApp template.

## Architecture & Structure
- **Root**: Contains Turborepo config (`turbo.json`), workspace config (`pnpm-workspace.yaml`), and root `package.json` for shared scripts/deps.
- **examples/**: Each subfolder is a standalone example app. `quickstart/` is a full-featured Next.js dApp template.
- **packages/**: Shared configs (eslint, tsconfig) for all examples.
- **examples/quickstart/app/**: Next.js app directory (routes, layout, providers, main page).
- **examples/quickstart/components/**: UI and dApp components (navbar, forms, visualizations, etc).
- **examples/quickstart/lib/**: Utility functions, context providers, wagmi config, and custom hooks for blockchain logic.

## Key Workflows
- **Install dependencies**: Run `pnpm install` from the repo root to install all packages and link workspaces.
- **Run an example**: `cd examples/quickstart && pnpm dev` (or `npm run dev` if using npm).
- **Build all**: Use Turborepo (`pnpm build` at root) to build all packages/examples.
- **Lint**: `pnpm lint` at root uses shared eslint config from `packages/eslint-config`.

## Patterns & Conventions
- Use TypeScript throughout (strict mode recommended).
- Shared configs live in `packages/` and are referenced via workspace protocol.
- Environment variables for dApps are set in `next.config.ts` (see `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY`).
- UI is modular: components are split by feature and type (e.g., `components/ui/`, `components/visualizations/`).
- Blockchain logic is abstracted into hooks (`lib/hooks/`) and context providers (`lib/context/`).
- Use `wagmi` for Ethereum wallet and network management.

## Integration Points
- MetaMask SDK is the primary external dependency for wallet connection.
- `wagmi` is used for blockchain state and actions.
- Next.js is used for SSR/SSG in the quickstart example.
- Images from IPFS and w3s.link are allowed in Next.js config.

## Examples
- To add a new example, create a new folder in `examples/`, scaffold your app, and update the root README.
- For custom dApp logic, add new hooks or context providers in `lib/` and new UI in `components/`.

## References
- See `examples/quickstart/README.md` for detailed quickstart app docs.
- See root `README.md` for monorepo and workflow overview.
- See `next.config.ts` in each example for environment/config patterns.

---

If you are unsure about a workflow or pattern, check the relevant README or existing example for reference. If a convention is unclear, ask for clarification or propose a change in this file.
