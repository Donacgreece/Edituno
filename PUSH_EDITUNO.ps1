# ============================================================
# EDITUNO v1.0 LIVE
# Replace the old prototype and push the complete static PWA
# Repository: https://github.com/Donacgreece/Edituno
# ============================================================

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

function Pause-End {
    Write-Host ""
    Read-Host "Press ENTER to close"
}

try {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "                  EDITUNO v1.0 LIVE" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""

    # Downloads folder
    try {
        $downloadsRaw = (Get-ItemProperty `
            "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" `
            -Name "{374DE290-123F-4565-9164-39C4925E467B}" `
        )."{374DE290-123F-4565-9164-39C4925E467B}"
        $Downloads = [Environment]::ExpandEnvironmentVariables($downloadsRaw)
    }
    catch {
        $Downloads = Join-Path $env:USERPROFILE "Downloads"
    }

    if (-not (Test-Path $Downloads)) {
        throw "Downloads folder was not found."
    }

    Write-Host "Downloads:" -ForegroundColor DarkGray
    Write-Host $Downloads -ForegroundColor White
    Write-Host ""

    # Find newest package ZIP
    $Zip = Get-ChildItem -Path $Downloads -Filter "Edituno-v1.0-live*.zip" -File |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if (-not $Zip) {
        throw "Edituno-v1.0-live.zip was not found in Downloads."
    }

    Write-Host "Package:" -ForegroundColor Green
    Write-Host $Zip.FullName -ForegroundColor White
    Write-Host ""

    # Git / GitHub authentication checks
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw "Git is not installed or is not available in PATH."
    }

    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "Checking GitHub login..." -ForegroundColor Cyan
        gh auth status
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "GitHub login is required." -ForegroundColor Yellow
            gh auth login
            if ($LASTEXITCODE -ne 0) { throw "GitHub login failed." }
        }
    }

    # Extract new release
    $ExtractRoot = Join-Path $Downloads "Edituno-v1.0-live-extracted"
    if (Test-Path $ExtractRoot) { Remove-Item $ExtractRoot -Recurse -Force }
    New-Item -ItemType Directory -Path $ExtractRoot | Out-Null
    Expand-Archive -Path $Zip.FullName -DestinationPath $ExtractRoot -Force

    $Source = $ExtractRoot
    $index = Get-ChildItem -Path $ExtractRoot -Filter "index.html" -Recurse -File | Select-Object -First 1
    if (-not $index) { throw "index.html was not found inside the release ZIP." }
    $Source = $index.Directory.FullName

    Write-Host "Release extracted to:" -ForegroundColor DarkGray
    Write-Host $Source -ForegroundColor White
    Write-Host ""

    # Reuse existing Git working copy when available
    $RepoFolder = Join-Path $Downloads "Edituno-GitHub-Push\edituno-build"

    if (-not (Test-Path (Join-Path $RepoFolder ".git"))) {
        Write-Host "Existing Git working copy was not found." -ForegroundColor Yellow
        Write-Host "Cloning repository..." -ForegroundColor Cyan

        $RepoFolder = Join-Path $Downloads "Edituno-Live-Repo"
        if (Test-Path $RepoFolder) { Remove-Item $RepoFolder -Recurse -Force }

        git clone "https://github.com/Donacgreece/Edituno.git" $RepoFolder
        if ($LASTEXITCODE -ne 0) { throw "git clone failed." }
    }

    Set-Location $RepoFolder

    Write-Host "Repository working copy:" -ForegroundColor Green
    Write-Host $RepoFolder -ForegroundColor White
    Write-Host ""

    # Verify remote
    $Remote = git remote get-url origin 2>$null
    if ($Remote -notmatch "Donacgreece/Edituno") {
        if ($Remote) { git remote remove origin }
        git remote add origin "https://github.com/Donacgreece/Edituno.git"
    }

    git fetch origin
    if ($LASTEXITCODE -ne 0) { throw "Could not reach GitHub repository." }

    git checkout main
    if ($LASTEXITCODE -ne 0) { throw "Could not switch to main branch." }

    # Make local branch match current remote before replacing files
    git reset --hard origin/main
    if ($LASTEXITCODE -ne 0) { throw "Could not synchronize main branch." }

    # Remove old prototype but preserve .git
    Write-Host "Removing old prototype files..." -ForegroundColor Yellow
    Get-ChildItem -Force -Path $RepoFolder |
        Where-Object { $_.Name -ne ".git" } |
        Remove-Item -Recurse -Force

    # Copy complete v1.0 release
    Write-Host "Copying Edituno v1.0..." -ForegroundColor Cyan
    Get-ChildItem -Force -Path $Source | ForEach-Object {
        Copy-Item $_.FullName -Destination $RepoFolder -Recurse -Force
    }

    # The deployment helper itself is useful locally but should not ship publicly
    $LocalPush = Join-Path $RepoFolder "PUSH_EDITUNO.ps1"
    if (Test-Path $LocalPush) { Remove-Item $LocalPush -Force }

    # Sanity checks
    $Required = @(
        "index.html",
        "assets\app.css",
        "assets\app.js",
        "manifest.webmanifest",
        "sw.js",
        ".github\workflows\deploy-pages.yml",
        "icons\icon-192.png",
        "icons\icon-512.png",
        "icons\apple-touch-icon.png"
    )

    foreach ($File in $Required) {
        if (-not (Test-Path (Join-Path $RepoFolder $File))) {
            throw "Required release file is missing: $File"
        }
    }

    Write-Host "Static release structure: OK" -ForegroundColor Green
    Write-Host ""

    # Commit replacement
    git add -A
    Write-Host "Changes to be committed:" -ForegroundColor Cyan
    git status --short
    Write-Host ""

    git commit -m "feat: release Edituno v1.0 mobile-first PWA editor"
    if ($LASTEXITCODE -ne 0) {
        $Pending = git status --porcelain
        if ($Pending) { throw "git commit failed." }
        Write-Host "Nothing new to commit." -ForegroundColor Yellow
    }

    # Push
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    git push origin main
    if ($LASTEXITCODE -ne 0) { throw "git push failed." }

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "                 EDITUNO v1.0 PUSHED" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository:" -ForegroundColor Cyan
    Write-Host "https://github.com/Donacgreece/Edituno" -ForegroundColor White
    Write-Host ""
    Write-Host "GitHub Actions:" -ForegroundColor Cyan
    Write-Host "https://github.com/Donacgreece/Edituno/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "Live app after the Actions deployment turns green:" -ForegroundColor Cyan
    Write-Host "https://donacgreece.github.io/Edituno/" -ForegroundColor Green
    Write-Host ""
    Write-Host "No npm command is required for this release." -ForegroundColor Green
    Write-Host "The application is a dependency-free static PWA." -ForegroundColor Green
}
catch {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "                     PUSH FAILED" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Copy the error above and send it to me." -ForegroundColor Yellow
}
finally {
    Pause-End
}
