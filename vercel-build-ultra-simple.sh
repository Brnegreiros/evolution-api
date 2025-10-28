#!/bin/bash
# Ultra-simple Vercel build for ES Modules

echo "🚀 Ultra-simple Vercel build starting (ES Modules)..."

# Set environment
export DATABASE_PROVIDER=postgresql

# Generate Prisma directly
echo "🔧 Generating Prisma client..."
npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build with tsup only (ES Modules)
echo "🏗️ Building with tsup (ES Modules)..."
npx tsup --config tsup.config.ts

echo "✅ Ultra-simple build completed!"
