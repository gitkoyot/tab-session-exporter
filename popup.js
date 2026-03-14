document.getElementById('exportBtn').addEventListener('click', async () => {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    let csvContent = "URL,Title\n";
    
    tabs.forEach(tab => {
      const url = tab.url ? tab.url.replace(/"/g, '""') : '';
      const title = tab.title ? tab.title.replace(/"/g, '""') : '';
      csvContent += `"${url}","${title}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tabs_session_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export tabs.");
  }
});

document.getElementById('importBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("import.html") });
});