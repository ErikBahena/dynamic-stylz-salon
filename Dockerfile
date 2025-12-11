# Simple Dockerfile for Payload CMS + Next.js
# Builds at startup instead of during image build (allows DB access)

FROM node:22-alpine

# Install libc-compat for some native deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy app source
COPY . .

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Build and start at runtime (not build time)
CMD ["/docker-entrypoint.sh"]
