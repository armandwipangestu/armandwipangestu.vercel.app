# --------
# 1. Builder
# --------
FROM oven/bun:1.2.23-alpine AS builder

WORKDIR /app

# Install dependencies using cached layer
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy all source
COPY . .

# Build Next.js
RUN bun run build


# --------
# 2. Runner
# --------
FROM oven/bun:1.2.23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "run", "server.js"]
