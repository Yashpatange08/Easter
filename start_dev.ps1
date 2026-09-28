# start_dev.ps1 - Run both Django backend and React frontend concurrently

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Starting Easter Full-Stack Development " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if Backend .venv exists
$backendVenv = ".\Backend\.venv\Scripts\python.exe"
if (-not (Test-Path $backendVenv)) {
    Write-Host "Error: Virtual environment not found at $backendVenv" -ForegroundColor Red
    exit 1
}

Write-Host "`n[1/2] Starting Django Backend on http://127.0.0.1:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Backend'; .\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000"

Write-Host "`n[2/2] Starting React Vite Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "`nBoth servers have been launched in separate terminal windows." -ForegroundColor Yellow
Write-Host "Open http://localhost:5173 in your browser to view the Easter app." -ForegroundColor Cyan
