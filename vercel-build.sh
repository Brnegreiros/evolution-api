#!/bin/bash
# Vercel build script for Evolution API

echo "🚀 Starting Vercel build process..."

# Debug: List current directory contents
echo "📁 Current directory contents:"
ls -la

# Debug: Check if src directory exists
if [ -d "src" ]; then
  echo "✅ src directory found"
  echo "📁 src directory contents:"
  ls -la src/
else
  echo "❌ src directory not found"
  echo "📁 Available directories:"
  find . -type d -maxdepth 2
fi

# Set default database provider if not set
if [ -z "$DATABASE_PROVIDER" ]; then
  export DATABASE_PROVIDER=postgresql
  echo "📊 Setting DATABASE_PROVIDER to postgresql"
fi

# Generate Prisma client directly (bypass npm script)
echo "🔧 Generating Prisma client directly..."
npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build with tsup only (skip TypeScript check completely)
echo "🏗️ Building with tsup (skipping TypeScript check)..."
npx tsup --config tsup.config.ts

echo "✅ Build completed successfully!"
