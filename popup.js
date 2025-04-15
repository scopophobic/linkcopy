document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("url-list");

  chrome.storage.local.get({ copiedLinks: [] }, ({ copiedLinks }) => {
    if (copiedLinks.length === 0) {
      list.innerHTML = "<li>No copied URLs yet.</li>";
      return;
    }

    copiedLinks.forEach((url) => {
      const li = document.createElement("li");
      li.textContent = url;
      li.onclick = () => navigator.clipboard.writeText(url);
      list.appendChild(li);
    });
  });
});
