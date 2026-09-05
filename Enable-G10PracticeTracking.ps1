[CmdletBinding()]
param(
  [string]$Path = $PSScriptRoot,
  [switch]$Check
)

$ErrorActionPreference = 'Stop'
$bridgeUrl = 'https://gurulinkindia-jpg.github.io/Complete-Study-Materials/g10-practice-result-bridge.js?v=20260905'
$bridgeTag = '  <script src="' + $bridgeUrl + '" defer></script>'
$files = @(Get-ChildItem -LiteralPath $Path -Recurse -Filter '*.html' -File)
$missing = [System.Collections.Generic.List[string]]::new()
$updated = 0

foreach ($file in $files) {
  $content = [IO.File]::ReadAllText($file.FullName)
  if ($content.Contains('g10-practice-result-bridge.js')) { continue }

  $missing.Add($file.FullName)
  if ($Check) { continue }

  $bodyTags = [regex]::Matches($content, '</body>', [Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($bodyTags.Count -eq 0) {
    Write-Warning "Skipped $($file.FullName): no closing </body> tag."
    continue
  }

  $position = $bodyTags[$bodyTags.Count - 1].Index
  $before = $content.Substring(0, $position).TrimEnd("`r", "`n")
  $after = $content.Substring($position)
  $updatedContent = $before + "`r`n" + $bridgeTag + "`r`n" + $after
  [IO.File]::WriteAllText($file.FullName, $updatedContent, [Text.UTF8Encoding]::new($false))
  $updated++
}

if ($Check) {
  if ($missing.Count -eq 0) {
    Write-Output "All $($files.Count) HTML files have G10 result tracking."
    exit 0
  }

  Write-Output "$($missing.Count) HTML file(s) need G10 result tracking:"
  $missing | ForEach-Object { Write-Output " - $_" }
  exit 1
}

Write-Output "Tracking enabled in $updated new HTML file(s). Total HTML files checked: $($files.Count)."
Write-Output "Run this command again with -Check before publishing."

