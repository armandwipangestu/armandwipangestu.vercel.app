# ---- 1. Build Stage ----
FROM node:22-alpine AS builder

# Set wokring directory
WORKDIR /app

# Receive NEXT_PUBLIC_* environment variable when build
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

ARG NEXT_PUBLIC_PUBLIC_ASSETS
ENV NEXT_PUBLIC_PUBLIC_ASSETS=$NEXT_PUBLIC_PUBLIC_ASSETS

# Copy package.json & lock file (if exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build Next.js project
RUN npm run build
RUN npm run export

# ---- 2. Production Stage ----
FROM nginx:1.29.3-alpine

# Delete default nginx static page
RUN rm -rf /usr/share/nginx/html/*

# Copy SPA fallback nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy from build previous stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]