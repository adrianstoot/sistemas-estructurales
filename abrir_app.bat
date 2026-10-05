@echo off
title CIV_L3 - Sistemas Estructurales
echo Iniciando servidor y abriendo la aplicacion...

:: Comprobar si el servidor ya esta activo
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:8080/index.html' -TimeoutSec 2; exit 0 } catch { exit 1 }"
if %errorlevel% neq 0 (
    echo Iniciando servidor en segundo plano...
    start /b python server.py
    timeout /t 1 /nobreak >nul
)

:: Abrir en el navegador predeterminado
start http://localhost:8080

echo Aplicacion abierta correctamente en http://localhost:8080
exit
