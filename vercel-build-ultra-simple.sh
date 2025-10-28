#!/bin/bash
# Ultra-simple Vercel build - NO TypeScript check at all

echo "🚀 Ultra-simple Vercel build starting..."

# Set environment
export DATABASE_PROVIDER=postgresql

# Generate Prisma directly
echo "🔧 Generating Prisma client..."
npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build with tsup only (NO TypeScript check)
echo "🏗️ Building with tsup (NO TypeScript check)..."
npx tsup --config tsup.config.ts

echo "✅ Ultra-simple build completed!"
