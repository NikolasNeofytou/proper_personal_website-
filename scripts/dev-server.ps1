# Development Server Script
# Kills any existing Python HTTP servers and starts a fresh one

Write-Host "Stopping any existing Python HTTP servers..." -ForegroundColor Yellow

# Kill any existing Python HTTP server processes
Get-Process -Name python -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*http.server*" -or $_.CommandLine -like "*SimpleHTTPServer*"
} | Stop-Process -Force

# Wait a moment to ensure processes are terminated
Start-Sleep -Seconds 1

Write-Host "Starting new development server..." -ForegroundColor Green

# Navigate to the project root (parent of scripts directory)
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

# Start the Python HTTP server on port 8000
Write-Host "Server starting at http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray

python -m http.server 8000
