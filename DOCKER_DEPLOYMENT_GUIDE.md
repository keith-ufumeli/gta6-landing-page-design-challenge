# GTA6 Landing Page - Docker Deployment Guide

This guide provides step-by-step instructions for deploying the GTA6 landing page using Docker in both development and production environments.

## 📋 Prerequisites

Before starting the deployment, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git** (for cloning the repository)
- **curl** (for health checks)

### Installing Docker

#### Windows
1. Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Install and start Docker Desktop
3. Ensure WSL 2 is enabled if prompted

#### macOS
1. Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Install and start Docker Desktop

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd gta6-landing-page-design-challenge
```

### 2. Make the Deployment Script Executable
```bash
chmod +x deploy.sh
```

### 3. Deploy the Application
```bash
# For development deployment
./deploy.sh deploy

# For production deployment
./deploy.sh prod

# For production with monitoring
./deploy.sh monitor
```

## 📁 Project Structure

The deployment setup includes the following files:

```
gta6-landing-page-design-challenge/
├── Dockerfile                 # Multi-stage Docker build configuration
├── .dockerignore             # Files to exclude from Docker build
├── docker-compose.yml        # Development Docker Compose configuration
├── docker-compose.prod.yml   # Production Docker Compose configuration
├── nginx.conf               # Nginx reverse proxy configuration
├── prometheus.yml           # Prometheus monitoring configuration
├── deploy.sh                # Automated deployment script
└── DOCKER_DEPLOYMENT_GUIDE.md # This guide
```

## 🔧 Configuration Files Explained

### Dockerfile
The `Dockerfile` uses a multi-stage build approach for optimal performance:

1. **Base Stage**: Uses Node.js 18 Alpine for a lightweight base image
2. **Dependencies Stage**: Installs pnpm and project dependencies
3. **Builder Stage**: Builds the Next.js application
4. **Runner Stage**: Creates the final production image with only necessary files

Key features:
- Multi-stage build for smaller final image
- Non-root user for security
- Optimized for Next.js standalone output
- Health check support

### docker-compose.yml
Development configuration with:
- Single service setup
- Port mapping (3000:3000)
- Health checks
- Environment variables

### docker-compose.prod.yml
Production configuration with:
- Nginx reverse proxy
- Optional monitoring (Prometheus + Grafana)
- Logging configuration
- Network isolation
- Volume management

### nginx.conf
Production-grade Nginx configuration with:
- SSL/TLS support
- Rate limiting
- Gzip compression
- Security headers
- Static file caching
- Health check endpoint

## 🛠️ Deployment Options

### Development Deployment
```bash
./deploy.sh start
```
- Runs on port 3000
- Includes hot reloading
- Suitable for development and testing

### Production Deployment
```bash
./deploy.sh prod
```
- Includes Nginx reverse proxy
- Runs on ports 80 (HTTP) and 443 (HTTPS)
- Production-optimized settings
- Logging and health monitoring

### Production with Monitoring
```bash
./deploy.sh monitor
```
- Includes all production features
- Adds Prometheus metrics collection
- Adds Grafana dashboard (http://localhost:3001)
- Comprehensive monitoring setup

## 🔍 Monitoring and Health Checks

### Application Health
The application includes health check endpoints:
- `/health` - Basic health status
- `/api/health` - Detailed health information

### Monitoring Stack (Optional)
When using the monitoring profile:
- **Prometheus**: Metrics collection (http://localhost:9090)
- **Grafana**: Dashboard (http://localhost:3001, admin/admin)

### Logs
```bash
# View application logs
./deploy.sh logs

# View specific service logs
docker-compose logs gta6-landing
docker-compose logs nginx
```

## 🔒 Security Considerations

### Production Security
1. **SSL/TLS**: Configure SSL certificates in `nginx.conf`
2. **Environment Variables**: Use `.env` files for sensitive data
3. **Network Isolation**: Services run in isolated Docker networks
4. **Non-root User**: Application runs as non-root user
5. **Security Headers**: Nginx includes security headers

### SSL Configuration
To enable SSL in production:

1. Create SSL certificates:
```bash
mkdir ssl
# Add your SSL certificates to the ssl/ directory
# - ssl/cert.pem (certificate)
# - ssl/key.pem (private key)
```

2. Update `nginx.conf`:
```nginx
ssl_certificate /etc/nginx/ssl/cert.pem;
ssl_certificate_key /etc/nginx/ssl/key.pem;
```

3. Uncomment SSL configuration lines in `nginx.conf`

## 📊 Performance Optimization

### Docker Optimizations
- Multi-stage builds reduce image size
- Alpine Linux base for smaller footprint
- Layer caching for faster builds
- Non-root user for security

### Nginx Optimizations
- Gzip compression for text assets
- Static file caching (1 year for assets)
- Rate limiting to prevent abuse
- HTTP/2 support

### Application Optimizations
- Next.js standalone output
- Optimized build process
- Environment-specific configurations

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Stop conflicting services
sudo systemctl stop <service-name>
```

#### Docker Permission Issues
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker
```

#### Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t gta6-landing .
```

#### Application Not Starting
```bash
# Check logs
./deploy.sh logs

# Check container status
docker ps -a

# Restart services
./deploy.sh stop
./deploy.sh start
```

### Debug Commands
```bash
# Check Docker status
docker info

# Check container logs
docker logs <container-name>

# Access container shell
docker exec -it <container-name> /bin/sh

# Check network connectivity
docker network ls
docker network inspect <network-name>
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and deploy
        run: |
          chmod +x deploy.sh
          ./deploy.sh prod
```

### Environment Variables
Create `.env` files for different environments:
```bash
# .env.production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 📈 Scaling Considerations

### Horizontal Scaling
```bash
# Scale the application
docker-compose up -d --scale gta6-landing=3
```

### Load Balancing
Update `nginx.conf` for multiple backend instances:
```nginx
upstream gta6_app {
    server gta6-landing:3000;
    server gta6-landing:3001;
    server gta6-landing:3002;
}
```

## 🧹 Maintenance

### Regular Maintenance Tasks
```bash
# Update dependencies
docker-compose pull

# Clean up unused images
docker image prune

# Clean up unused volumes
docker volume prune

# Full system cleanup
docker system prune -a
```

### Backup Strategy
```bash
# Backup application data
docker run --rm -v gta6-landing_data:/data -v $(pwd):/backup alpine tar czf /backup/app-backup.tar.gz -C /data .

# Restore application data
docker run --rm -v gta6-landing_data:/data -v $(pwd):/backup alpine tar xzf /backup/app-backup.tar.gz -C /data
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker and application logs
3. Ensure all prerequisites are met
4. Verify network connectivity and firewall settings

## 📝 License

This deployment guide is part of the GTA6 Landing Page project. Please refer to the main project license for usage terms. 