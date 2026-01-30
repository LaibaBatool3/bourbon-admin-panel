@echo off
cd /d "%~dp0"

echo ============================================
echo   Bourbon Admin Panel - Starting...
echo ============================================
echo.

echo Step 1: Installing dependencies (this may take a minute)...
call npm install
if errorlevel 1 (
  echo.
  echo ERROR: npm install failed. Check your internet connection.
  pause
  exit /b 1
)

echo.
echo Step 2: Starting dev server...
echo.
echo When you see "Local: http://localhost:5173" open that URL in your browser.
echo.
call npm run dev

pause
