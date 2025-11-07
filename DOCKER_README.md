# Docker Setup for DexSandro Frontend

This document explains how to dockerize and run the DexSandro React frontend application.

## Files Created

- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Container orchestration
- `nginx.conf` - Nginx configuration for production
- `.dockerignore` - Files to exclude from Docker build
- `docker-run.sh` - Quick build and run script

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Production build
docker-compose up --build

# Development mode
docker-compose --profile dev up --build
```

### Option 2: Using Docker directly

```bash
# Production build
docker build -t dexsandro-frontend .
docker run -p 3000:80 dexsandro-frontend

# Development build
docker build -f Dockerfile.dev -t dexsandro-frontend-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules dexsandro-frontend-dev
```

### Option 3: Using the provided script

```bash
./docker-run.sh
```

## Docker Setup Explained

### Production Setup (Dockerfile)

The production setup uses a **multi-stage build**:

1. **Builder stage**: Uses Node.js to install dependencies and build the React app
2. **Production stage**: Uses lightweight Nginx to serve the built static files

Benefits:
- Small final image size (only contains built files + Nginx)
- Fast startup times
- Production-optimized Nginx configuration
- Security headers included
- Gzip compression enabled
- React Router support (SPA routing)

### Development Setup (Dockerfile.dev)

For development, the setup:
- Uses Node.js directly
- Mounts source code as volume for hot reloading
- Installs all dependencies including dev dependencies
- Runs `npm start` for development server

### Nginx Configuration

The custom nginx.conf includes:
- Gzip compression for better performance
- Security headers (XSS protection, content type options, etc.)
- React Router support (fallback to index.html)
- Static asset caching (1 year for JS/CSS/images)
- Health check endpoint at `/health`
- Service worker cache prevention

## Environment Variables

You can pass environment variables to the container:

```bash
docker run -p 3000:80 -e REACT_APP_API_URL=https://your-api.com dexsandro-frontend
```

Or using docker-compose:

```yaml
services:
  dexsandro-frontend:
    environment:
      - REACT_APP_API_URL=https://your-api.com
```

## Available Commands

### Docker Compose Commands

```bash
# Build and start production container
docker-compose up --build

# Start in background
docker-compose up -d

# Start development environment
docker-compose --profile dev up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

### Docker Commands

```bash
# Build production image
docker build -t dexsandro-frontend .

# Build development image
docker build -f Dockerfile.dev -t dexsandro-frontend-dev .

# Run production container
docker run -d -p 3000:80 --name dexsandro-app dexsandro-frontend

# Run development container with volume mounting
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules dexsandro-frontend-dev

# View container logs
docker logs dexsandro-app

# Stop and remove container
docker stop dexsandro-app && docker rm dexsandro-app
```

## Accessing the Application

- **Production**: http://localhost:3000
- **Development**: http://localhost:3001 (if using docker-compose profiles)
- **Health Check**: http://localhost:3000/health

## Performance Optimizations

The Docker setup includes several optimizations:

1. **Multi-stage builds** reduce final image size
2. **Nginx gzip compression** reduces bandwidth usage
3. **Static asset caching** improves load times
4. **Layer caching** in Dockerfile speeds up rebuilds
5. **.dockerignore** excludes unnecessary files from build context

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find and stop the process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Container fails to start**
   ```bash
   # Check logs
   docker logs container-name
   
   # Run container interactively for debugging
   docker run -it dexsandro-frontend sh
   ```

3. **Build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker build --no-cache -t dexsandro-frontend .
   ```

4. **Hot reloading not working in development**
   - Ensure volume mounting is correct
   - Set `CHOKIDAR_USEPOLLING=true` environment variable
   - Check that node_modules volume is properly mounted

## Security Considerations

The production setup includes:
- Non-root user execution
- Security headers in Nginx
- Minimal attack surface (only static files served)
- No development dependencies in production image
- Regular base image updates (Alpine Linux)

## Monitoring

You can monitor the container with:

```bash
# Container stats
docker stats

# Container processes
docker top dexsandro-app

# Health check
curl http://localhost:3000/health
```