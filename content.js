function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#323232";
    toast.style.color = "#fff";
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "999999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
  
    document.body.appendChild(toast);
  
    // Fade in
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
    });
  
    // Fade out and remove
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 1500);
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "copy" && message.text) {
      navigator.clipboard.writeText(message.text).then(() => {
        showToast("URL copied!");
      });
    }
  });
  