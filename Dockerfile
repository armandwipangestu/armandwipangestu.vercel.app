# --------
# 1. Builder
# --------
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using cached layer
COPY package*.json ./
RUN npm ci

# Copy all source
COPY . .

# Build Next.js
RUN npm run build


# --------
# 2. Runner
# --------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
