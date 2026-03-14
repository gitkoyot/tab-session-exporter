# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tab Session Exporter is a vanilla JavaScript browser extension (Manifest v3) for Chrome and Firefox that exports open tabs to CSV and imports them back. No build process, no dependencies, no package manager.

## Loading the Extension

- **Chrome:** `chrome://extensions` → Enable "Developer mode" → "Load unpacked" → select project root
- **Firefox:** `about:debugging` → "This Firefox" → "Load Temporary Add-on" → select `manifest.json`

## Architecture

Two independent features, each with its own HTML/JS pair:

**Export flow** (`popup.html` + `popup.js`):
- Popup opens → user clicks "Export to CSV"
- `chrome.tabs.query({ currentWindow: true })` fetches all tabs
- Generates CSV with `URL,Title` columns, quote-escaped
- Downloads as `tabs_session_YYYY-MM-DD.csv` via Blob + ObjectURL

**Import flow** (`popup.html` → `import.html` + `import.js`):
- User clicks "Import from CSV" in popup → opens `import.html` as a new tab
- User selects a CSV file → `FileReader` reads it
- Custom `parseCSVRow()` handles quoted fields and escaped quotes (`""`)
- Only URLs starting with `http://` or `https://` are opened
- Each valid URL opens as a background tab via `chrome.tabs.create({ url, active: false })`

## Key Constraints

- **Manifest v3** — no background pages, use service workers if background processing is ever needed
- **Permissions:** only `tabs` is declared; avoid expanding permissions without good reason
- **Browser compatibility:** must work in both Chrome and Firefox (Firefox min version 109.0, browser ID `tab-exporter@example.com` in `manifest.json`)
- **No build step** — all files are loaded directly by the browser; keep everything in plain JS
