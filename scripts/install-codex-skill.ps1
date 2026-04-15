param(
  [switch]$Copy,
  [string]$CodexHome = ""
)

$ErrorActionPreference = "Stop"

$RootDir = Resolve-Path (Join-Path $PSScriptRoot "..")
$Source = Join-Path $RootDir "skills\nexai-content-publisher"
if ([string]::IsNullOrWhiteSpace($CodexHome)) {
  if ($env:CODEX_HOME) {
    $CodexHome = $env:CODEX_HOME
  } else {
    $CodexHome = Join-Path $HOME ".codex"
  }
}

$SkillsDir = Join-Path $CodexHome "skills"
$Target = Join-Path $SkillsDir "nexai-content-publisher"

New-Item -ItemType Directory -Force -Path $SkillsDir | Out-Null

if (Test-Path $Target) {
  $Item = Get-Item $Target -Force
  if ($Item.LinkType -eq "Junction" -or $Item.LinkType -eq "SymbolicLink") {
    Remove-Item $Target -Force
  } else {
    throw "Target exists and is not a link: $Target"
  }
}

if ($Copy) {
  Copy-Item $Source $Target -Recurse -Force
  Write-Output "Installed by copy: $Target"
  exit 0
}

New-Item -ItemType Junction -Path $Target -Target $Source | Out-Null
Write-Output "Installed by junction: $Target"
