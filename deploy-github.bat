@echo off
title Push Portofolio ke GitHub
color 0b
echo ===================================================
echo     UPLOAD PORTOFOLIO KE GITHUB & GITHUB PAGES
echo ===================================================
echo.
echo Pastikan Anda sudah membuat repository baru di GitHub (misal: "portofolio")
echo.
set /p REPO_URL="Masukkan URL Repository GitHub Anda (contoh: https://github.com/Sugiati-jia/portofolio.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] URL repository tidak boleh kosong!
    pause
    exit /b
)

echo.
echo [1/3] Menghubungkan remote GitHub...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Mengatur branch main...
git branch -M main

echo [3/3] Mengunggah file ke GitHub (Push)...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo [SUKSES] Berhasil di-upload ke GitHub!
    echo.
    echo LANGKAH TERAKHIR AKTIFKAN WEBSITE (GITHUB PAGES):
    echo 1. Buka halaman repository di browser GitHub
    echo 2. Klik menu "Settings" ^> "Pages" di menu kiri
    echo 3. Di bagian "Branch", pilih "main", lalu klik "Save"
    echo 4. Dalam 1-2 menit website Anda akan online di:
    echo    https://^<username-anda^>.github.io/portofolio/
    echo ===================================================
) else (
    echo.
    echo [GAGAL] Gagal melakukan push. Pastikan Anda sudah login ke akun GitHub di browser/Windows Credential.
)

echo.
pause
