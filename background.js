async function handleCommand() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
  
    // Ask content.js to copy
    chrome.tabs.sendMessage(tab.id, { action: "copy", text: url });
  
    // Save in storage only if it's not already in the list
    chrome.storage.local.get({ copiedLinks: [] }, ({ copiedLinks }) => {
      if (!copiedLinks.includes(url)) {
        copiedLinks.unshift(url);
        if (copiedLinks.length > 10) copiedLinks = copiedLinks.slice(0, 10);
        chrome.storage.local.set({ copiedLinks });
      }
    });
  }
  
  chrome.commands.onCommand.addListener((command) => {
    if (command === "copy_url") {
      handleCommand();
    }
  });
  