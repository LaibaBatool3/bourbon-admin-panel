# Bourbon Admin Panel - Run script
Set-Location $PSScriptRoot

Write-Host "Step 1: Installing dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
  Write-Host "npm install failed. Check your internet connection and try again." -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "Step 2: Starting dev server..." -ForegroundColor Cyan
npm run dev
