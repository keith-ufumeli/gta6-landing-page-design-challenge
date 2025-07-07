#!/bin/bash

# GTA6 Landing Page Docker Deployment Script
# This script automates the deployment process for the GTA6 landing page

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="gta6-landing"
CONTAINER_NAME="gta6-landing-container"
COMPOSE_FILE="docker-compose.yml"
PROD_COMPOSE_FILE="docker-compose.prod.yml"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Function to build the Docker image
build_image() {
    print_status "Building Docker image..."
    docker build -t $IMAGE_NAME .
    print_success "Docker image built successfully"
}

# Function to stop and remove existing containers
cleanup_containers() {
    print_status "Cleaning up existing containers..."
    docker-compose -f $COMPOSE_FILE down --remove-orphans 2>/dev/null || true
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    print_success "Cleanup completed"
}

# Function to start the application
start_application() {
    print_status "Starting the application..."
    docker-compose -f $COMPOSE_FILE up -d
    print_success "Application started successfully"
}

# Function to start production deployment
start_production() {
    print_status "Starting production deployment..."
    docker-compose -f $PROD_COMPOSE_FILE up -d
    print_success "Production deployment started successfully"
}

# Function to start with monitoring
start_with_monitoring() {
    print_status "Starting with monitoring..."
    docker-compose -f $PROD_COMPOSE_FILE --profile monitoring up -d
    print_success "Application started with monitoring"
}

# Function to check application health
check_health() {
    print_status "Checking application health..."
    sleep 10  # Wait for application to start
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Application is healthy and running on http://localhost:3000"
    else
        print_warning "Application might not be ready yet. Check logs with: docker-compose logs"
    fi
}

# Function to show logs
show_logs() {
    print_status "Showing application logs..."
    docker-compose -f $COMPOSE_FILE logs -f
}

# Function to stop the application
stop_application() {
    print_status "Stopping the application..."
    docker-compose -f $COMPOSE_FILE down
    print_success "Application stopped"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build       Build the Docker image"
    echo "  start       Start the application (development)"
    echo "  prod        Start production deployment"
    echo "  monitor     Start with monitoring (Prometheus + Grafana)"
    echo "  stop        Stop the application"
    echo "  logs        Show application logs"
    echo "  health      Check application health"
    echo "  deploy      Full deployment (build + start)"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 prod"
    echo "  $0 monitor"
}

# Main script logic
case "${1:-help}" in
    "build")
        check_docker
        build_image
        ;;
    "start")
        check_docker
        cleanup_containers
        start_application
        check_health
        ;;
    "prod")
        check_docker
        cleanup_containers
        start_production
        check_health
        ;;
    "monitor")
        check_docker
        cleanup_containers
        start_with_monitoring
        check_health
        print_status "Monitoring URLs:"
        print_status "  - Prometheus: http://localhost:9090"
        print_status "  - Grafana: http://localhost:3001 (admin/admin)"
        ;;
    "stop")
        stop_application
        ;;
    "logs")
        show_logs
        ;;
    "health")
        check_health
        ;;
    "deploy")
        check_docker
        build_image
        cleanup_containers
        start_application
        check_health
        ;;
    "help"|*)
        show_usage
        ;;
esac 