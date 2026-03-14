function parseCSVRow(str) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '"') {
      if (inQuotes && str[i+1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const lines = content.split('\n');
    
    let importedCount = 0;
    // Skip header (i=1)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const row = parseCSVRow(line);
      if (row.length > 0) {
        const url = row[0];
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
          chrome.tabs.create({ url: url, active: false });
          importedCount++;
        }
      }
    }
    
    if (importedCount === 0) {
      alert("No valid URLs found in the CSV file.");
    } else {
      alert(`Successfully imported ${importedCount} tabs!`);
    }
    
    // Reset file input
    event.target.value = '';
  };
  reader.readAsText(file);
});