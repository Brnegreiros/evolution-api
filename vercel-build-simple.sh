#!/bin/bash
# Ultra-simple Vercel build script

echo "🚀 Starting Vercel build..."

# Set database provider
export DATABASE_PROVIDER=postgresql

# Generate Prisma
echo "🔧 Generating Prisma..."
npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build with tsup only
echo "🏗️ Building..."
npx tsup

echo "✅ Done!"
