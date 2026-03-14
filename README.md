# Tab Session Exporter

> **Warning:** This is a vibe-coded browser extension. It was built quickly with AI assistance and has not been thoroughly tested. Use at your own risk.

A lightweight browser extension for Chrome and Firefox that lets you export your open tabs to a CSV file and import them back later.

## Features

- **Export** all open tabs in the current window to a CSV file (`URL,Title`)
- **Import** tabs from a previously exported CSV file

## Installation

### Chrome
1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this project folder

### Firefox
1. Go to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on** and select `manifest.json`

## Usage

1. Click the extension icon in your browser toolbar
2. **Export to CSV** — downloads a `tabs_session_YYYY-MM-DD.csv` file with all your current tabs
3. **Import from CSV** — opens a page where you can select a previously exported CSV to restore tabs

## Permissions

This extension only requires the `tabs` permission to read and create tabs. No data is sent anywhere — everything runs locally.

## License

MIT
