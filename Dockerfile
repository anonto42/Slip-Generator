# ---------- Base ----------
FROM node:24-slim AS base

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---------- Dependencies ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

# Install all deps (needed for build)
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build NestJS app
RUN pnpm build

# ---------- Production ----------
FROM node:24-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm in runtime container (for node_modules resolution)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only required runtime files
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]
