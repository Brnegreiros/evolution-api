#!/bin/bash
# Direct Vercel build - bypasses all npm scripts

echo "🚀 Direct Vercel build starting..."

# Set environment
export DATABASE_PROVIDER=postgresql

# Generate Prisma directly
echo "🔧 Generating Prisma client..."
npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build with tsup directly
echo "🏗️ Building with tsup..."
npx tsup

echo "✅ Direct build completed!"
