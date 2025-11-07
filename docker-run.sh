#!/bin/bash

# Build and run the production Docker container

echo "Building Docker image..."
docker build -t dexsandro-frontend .

echo "Running container on port 3000..."
docker run -d -p 3000:80 --name dexsandro-frontend-container dexsandro-frontend

echo "Container is running at http://localhost:3000"
echo "To stop: docker stop dexsandro-frontend-container"
echo "To remove: docker rm dexsandro-frontend-container"