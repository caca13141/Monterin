# Ethereal Luster

The "Pagani of E-commerce" — A futuristic, high-performance jewelry platform.

## Architecture

This project is a Monorepo powered by Turborepo, containing:

### Apps
- **web**: Next.js 15+ Storefront (React Server Components, Tailwind, Shadcn).
- **api**: High-performance Rust Backend (Axum, Tokio, SQLx) [Port 8080].
- **admin**: (Planned) Internal Dashboard.
- **ws-server**: (Planned) Real-time WebSocket server.

### Packages
- **ui**: Shared React components and design system.
- **wasm-gem**: Rust crate compiled to WASM for client-side heavy math (gem physics).
- **config**: Shared configurations (ESLint, TSConfig).
- **db**: (Planned) Shared database schemas/types.

## Getting Started

### 1. Prerequisites
- Node.js 20+ & pnpm (or npm)
- Rust (latest stable) & Cargo
- PostgreSQL & TimescaleDB (Running locally or Docker)

### 2. Install Dependencies

```bash
# Frontend/JS dependencies
npm install

# Rust dependencies
cargo build
```

### 3. Run Development Servers

```bash
# Start Next.js (Port 3000)
npm run dev

# Start Rust API (Port 8080)
cargo run -p api
```

## Vision & Documentation

See [VISION_AND_ARCHITECTURE.md](./VISION_AND_ARCHITECTURE.md) for the complete architectural blueprint and roadmap.
