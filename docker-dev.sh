#!/bin/bash

# Start development environment with hot reloading

echo "Stopping any existing containers..."
docker-compose down

echo "Starting development environment with hot reloading..."
docker-compose --profile dev up --build

echo "Development server will be available at http://localhost:3001"