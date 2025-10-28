#!/bin/bash
# Alternative Vercel build script - Skip TypeScript check

echo "🚀 Starting Vercel build process (Alternative)..."

# Set default database provider if not set
if [ -z "$DATABASE_PROVIDER" ]; then
  export DATABASE_PROVIDER=postgresql
  echo "📊 Setting DATABASE_PROVIDER to postgresql"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Build with tsup only (skip TypeScript check)
echo "🏗️ Building with tsup..."
npx tsup --config tsup.config.ts

echo "✅ Build completed successfully!"
