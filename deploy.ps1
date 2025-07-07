# GTA6 Landing Page Docker Deployment Script for Windows PowerShell
# This script automates the deployment process for the GTA6 landing page

param(
    [Parameter(Position=0)]
    [ValidateSet("build", "start", "prod", "monitor", "stop", "logs", "health", "deploy", "help")]
    [string]$Command = "help"
)

# Configuration
$ImageName = "gta6-landing"
$ContainerName = "gta6-landing-container"
$ComposeFile = "docker-compose.yml"
$ProdComposeFile = "docker-compose.prod.yml"

# Function to write colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Function to check if Docker is running
function Test-Docker {
    try {
        docker info | Out-Null
        Write-Success "Docker is running"
        return $true
    }
    catch {
        Write-Error "Docker is not running. Please start Docker Desktop and try again."
        return $false
    }
}

# Function to build the Docker image
function Build-Image {
    Write-Status "Building Docker image..."
    docker build -t $ImageName .
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Docker image built successfully"
    } else {
        Write-Error "Failed to build Docker image"
        exit 1
    }
}

# Function to stop and remove existing containers
function Remove-Containers {
    Write-Status "Cleaning up existing containers..."
    docker-compose -f $ComposeFile down --remove-orphans 2>$null
    docker stop $ContainerName 2>$null
    docker rm $ContainerName 2>$null
    Write-Success "Cleanup completed"
}

# Function to start the application
function Start-Application {
    Write-Status "Starting the application..."
    docker-compose -f $ComposeFile up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Application started successfully"
    } else {
        Write-Error "Failed to start application"
        exit 1
    }
}

# Function to start production deployment
function Start-Production {
    Write-Status "Starting production deployment..."
    docker-compose -f $ProdComposeFile up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production deployment started successfully"
    } else {
        Write-Error "Failed to start production deployment"
        exit 1
    }
}

# Function to start with monitoring
function Start-Monitoring {
    Write-Status "Starting with monitoring..."
    docker-compose -f $ProdComposeFile --profile monitoring up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Application started with monitoring"
        Write-Status "Monitoring URLs:"
        Write-Status "  - Prometheus: http://localhost:9090"
        Write-Status "  - Grafana: http://localhost:3001 (admin/admin)"
    } else {
        Write-Error "Failed to start monitoring deployment"
        exit 1
    }
}

# Function to check application health
function Test-Health {
    Write-Status "Checking application health..."
    Start-Sleep -Seconds 10  # Wait for application to start
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "Application is healthy and running on http://localhost:3000"
        } else {
            Write-Warning "Application responded with status code: $($response.StatusCode)"
        }
    }
    catch {
        Write-Warning "Application might not be ready yet. Check logs with: docker-compose logs"
    }
}

# Function to show logs
function Show-Logs {
    Write-Status "Showing application logs..."
    docker-compose -f $ComposeFile logs -f
}

# Function to stop the application
function Stop-Application {
    Write-Status "Stopping the application..."
    docker-compose -f $ComposeFile down
    Write-Success "Application stopped"
}

# Function to show usage
function Show-Usage {
    Write-Host "Usage: .\deploy.ps1 [COMMAND]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Cyan
    Write-Host "  build       Build the Docker image"
    Write-Host "  start       Start the application (development)"
    Write-Host "  prod        Start production deployment"
    Write-Host "  monitor     Start with monitoring (Prometheus + Grafana)"
    Write-Host "  stop        Stop the application"
    Write-Host "  logs        Show application logs"
    Write-Host "  health      Check application health"
    Write-Host "  deploy      Full deployment (build + start)"
    Write-Host "  help        Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\deploy.ps1 deploy"
    Write-Host "  .\deploy.ps1 prod"
    Write-Host "  .\deploy.ps1 monitor"
}

# Main script logic
switch ($Command) {
    "build" {
        if (Test-Docker) {
            Build-Image
        }
    }
    "start" {
        if (Test-Docker) {
            Remove-Containers
            Start-Application
            Test-Health
        }
    }
    "prod" {
        if (Test-Docker) {
            Remove-Containers
            Start-Production
            Test-Health
        }
    }
    "monitor" {
        if (Test-Docker) {
            Remove-Containers
            Start-Monitoring
            Test-Health
        }
    }
    "stop" {
        Stop-Application
    }
    "logs" {
        Show-Logs
    }
    "health" {
        Test-Health
    }
    "deploy" {
        if (Test-Docker) {
            Build-Image
            Remove-Containers
            Start-Application
            Test-Health
        }
    }
    "help" {
        Show-Usage
    }
    default {
        Show-Usage
    }
} 