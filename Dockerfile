# Stage 1: Build the static site
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
# We use npm ci for reproducible builds
COPY package*.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the Astro site
RUN npm run build

# Stage 2: Serve the site with NGINX
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for performance optimization
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (Dokploy will route to this)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
