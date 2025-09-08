# Docker Deployment Guide

This guide explains how to build and run the Asking Card application using Docker.

## 🐳 Docker Image

The application is available as a multi-architecture Docker image supporting both AMD64 and ARM64:

```bash
docker pull lynchz/asking-p-bas:latest
```

## 🏃‍♂️ Quick Start

### Using Docker Hub Image

```bash
# Pull and run the latest image
docker run -d \
  --name asking-card \
  -p 3000:3000 \
  -e DISCORD_WEBHOOK_URL="your_webhook_url_here" \
  -e DISCORD_NOTIFICATIONS_ENABLED="true" \
  lynchz/asking-p-bas:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  asking-card:
    image: lynchz/asking-p-bas:latest
    container_name: asking-card
    ports:
      - "3000:3000"
    environment:
      - DISCORD_WEBHOOK_URL=your_webhook_url_here
      - DISCORD_NOTIFICATIONS_ENABLED=true
      - NODE_ENV=production
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

## 🔧 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DISCORD_WEBHOOK_URL` | Discord webhook URL for notifications | - | No |
| `DISCORD_NOTIFICATIONS_ENABLED` | Enable/disable Discord notifications | `false` | No |
| `PORT` | Port the application runs on | `3000` | No |
| `HOSTNAME` | Hostname to bind to | `0.0.0.0` | No |
| `NODE_ENV` | Node environment | `production` | No |

## 🏗️ Building Locally

If you want to build the Docker image locally:

```bash
# Clone the repository
git clone <repository-url>
cd asking-card

# Build the image
docker build -t asking-card .

# Run the container
docker run -d \
  --name asking-card \
  -p 3000:3000 \
  asking-card
```

## 🏢 Production Deployment

### Using Docker Swarm

```bash
# Initialize swarm (if not already done)
docker swarm init

# Deploy the service
docker service create \
  --name asking-card \
  --publish 3000:3000 \
  --env DISCORD_WEBHOOK_URL="your_webhook_url" \
  --env DISCORD_NOTIFICATIONS_ENABLED="true" \
  --replicas 2 \
  lynchz/asking-p-bas:latest
```

### Using Kubernetes

Create a deployment file `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: asking-card
  labels:
    app: asking-card
spec:
  replicas: 2
  selector:
    matchLabels:
      app: asking-card
  template:
    metadata:
      labels:
        app: asking-card
    spec:
      containers:
      - name: asking-card
        image: lynchz/asking-p-bas:latest
        ports:
        - containerPort: 3000
        env:
        - name: DISCORD_WEBHOOK_URL
          value: "your_webhook_url_here"
        - name: DISCORD_NOTIFICATIONS_ENABLED
          value: "true"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: asking-card-service
spec:
  selector:
    app: asking-card
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

Deploy:

```bash
kubectl apply -f k8s-deployment.yaml
```

## 🔍 Health Checks

The application includes basic health monitoring:

```bash
# Check if the container is running
docker ps | grep asking-card

# View logs
docker logs asking-card

# Check application health
curl http://localhost:3000/
```

## 📊 Multi-Architecture Support

The Docker image is built for multiple architectures:

- **linux/amd64** - Intel/AMD 64-bit
- **linux/arm64** - ARM 64-bit (Apple Silicon, Raspberry Pi 4+)

Docker will automatically pull the correct image for your platform.

## 🔄 Updates

To update to the latest version:

```bash
# Pull latest image
docker pull lynchz/asking-p-bas:latest

# Stop and remove old container
docker stop asking-card
docker rm asking-card

# Start new container
docker run -d \
  --name asking-card \
  -p 3000:3000 \
  -e DISCORD_WEBHOOK_URL="your_webhook_url" \
  -e DISCORD_NOTIFICATIONS_ENABLED="true" \
  lynchz/asking-p-bas:latest
```

## 📝 Notes

- The application runs on port 3000 by default
- All data is stored in memory and will be lost when the container restarts
- Discord notifications are optional and can be disabled
- The application supports both text and file attachments up to 5MB
- Real-time updates work across all connected clients via Socket.IO

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker logs asking-card

# Check if port is already in use
lsof -i :3000
```

### Discord notifications not working
- Verify `DISCORD_WEBHOOK_URL` is set correctly
- Ensure `DISCORD_NOTIFICATIONS_ENABLED=true`
- Check container logs for Discord-related errors

### Performance issues
- Increase memory limits if running many containers
- Use multiple replicas for high availability
- Consider using a reverse proxy (nginx/traefik) for load balancing