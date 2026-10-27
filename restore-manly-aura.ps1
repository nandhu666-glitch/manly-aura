Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " MANLY AURA (www.manlyaura.com) — AUTOMATED PROJECT RESTORER" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan

$env:Path = "C:\Program Files\nodejs;" + $env:Path

if (Test-Path "restore-manly-aura.js") {
    Write-Host "[1/3] Extracting all 37 project files..." -ForegroundColor Yellow
    node restore-manly-aura.js
} else {
    Write-Host "restore-manly-aura.js not found in current directory!" -ForegroundColor Red
    exit 1
}

Write-Host "[2/3] Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "[3/3] Launching MANLY AURA local dev server..." -ForegroundColor Green
Write-Host "Opening http://localhost:3000 in your browser..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"
npm run dev
