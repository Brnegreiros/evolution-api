#!/bin/bash
# Ultra-robust Vercel build script - No TypeScript check at all

echo "🚀 Starting Vercel build process (Ultra-robust mode)..."

# Set database provider
export DATABASE_PROVIDER=postgresql

# Generate Prisma client directly (no npm scripts)
echo "🔧 Generating Prisma client..."
npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build with tsup only
echo "🏗️ Building with tsup..."
npx tsup

echo "✅ Build completed successfully!"
