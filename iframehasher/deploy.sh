#!/bin/bash

# News Hash Verifier Deployment Script
# This script builds and prepares the React app for deployment

set -e

echo "🚀 Building News Hash Verifier..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm test -- --coverage --watchAll=false

# Build the app
echo "🔨 Building React app..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed. No build directory found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build files are in the 'build' directory"
echo "🌐 Ready for deployment to GitHub Pages or any static hosting service"

# Optional: Create deployment archive
if [ "$1" = "--archive" ]; then
    echo "📦 Creating deployment archive..."
    cd build
    tar -czf ../news-hash-verifier.tar.gz .
    cd ..
    echo "📦 Archive created: news-hash-verifier.tar.gz"
fi

echo "🎉 Deployment preparation complete!"
