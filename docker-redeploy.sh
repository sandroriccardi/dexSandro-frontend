#!/bin/bash

# Quick redeploy script - stops existing container, rebuilds, and runs new one

echo "Stopping existing container..."
docker stop dexsandro-frontend-container 2>/dev/null || true
docker rm dexsandro-frontend-container 2>/dev/null || true

echo "Rebuilding Docker image..."
docker build -t dexsandro-frontend .

echo "Running new container..."
docker run -d -p 3000:80 --name dexsandro-frontend-container dexsandro-frontend

echo "✅ Redeployment complete!"
echo "🌐 Application available at: http://localhost:3000"
echo "📊 Health check: http://localhost:3000/health"