#!/bin/sh
set -e

# Build Next.js app at startup (when database is available)
if [ ! -d ".next" ] || [ "$FORCE_REBUILD" = "true" ]; then
  echo "Building Next.js application..."
  pnpm run build
fi

# Start the production server
echo "Starting production server..."
exec node server.js
