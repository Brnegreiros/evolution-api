#!/bin/bash
# Vercel build script for Evolution API

echo "🚀 Starting Vercel build process..."

# Set default database provider if not set
if [ -z "$DATABASE_PROVIDER" ]; then
  export DATABASE_PROVIDER=postgresql
  echo "📊 Setting DATABASE_PROVIDER to postgresql"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Build TypeScript
echo "🏗️ Building TypeScript..."
npm run build

echo "✅ Build completed successfully!"
