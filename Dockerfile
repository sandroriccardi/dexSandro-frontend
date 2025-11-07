# Multi-stage Docker build for React application

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (this will create package-lock.json if it doesn't exist)
RUN npm install

# Accept build arguments for environment variables
ARG REACT_APP_API_BASE_URL=http://localhost:5135
ARG REACT_APP_OPENAI_API_KEY
ARG GENERATE_SOURCEMAP=false

# Set environment variables for the build
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_OPENAI_API_KEY=$REACT_APP_OPENAI_API_KEY
ENV GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine AS production

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]