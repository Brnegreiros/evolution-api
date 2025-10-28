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

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Build TypeScript with Vercel-specific config
echo "🏗️ Building TypeScript..."
if [ -f "tsconfig.vercel.json" ]; then
  echo "📝 Using Vercel-specific TypeScript config"
  npx tsc --project tsconfig.vercel.json --noEmit
  npx tsup --config tsup.config.ts
else
  echo "📝 Using default TypeScript config"
  npm run build
fi

echo "✅ Build completed successfully!"
