const tabsContainer = document.getElementById("tabs");

chrome.tabs.query({ audible: true }, (tabs) => {
  tabsContainer.innerHTML = "";

  if (tabs.length === 0) {
    tabsContainer.innerHTML = `<div class="empty">No audible tabs right now.</div>`;
    return;
  }

  tabs.forEach((tab) => {
    const tabId = tab.id;

    const wrapper = document.createElement("div");
    wrapper.className = "tab";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = tab.title || "Untitled tab";

    const volumeText = document.createElement("div");
    volumeText.className = "volume-text";
    volumeText.textContent = "70%";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.value = "70";

    slider.addEventListener("input", async () => {
      const percent = Number(slider.value);
      const volume = percent / 100;

      volumeText.textContent = `${percent}%`;

      try {
        await chrome.tabs.sendMessage(tabId, {
          type: "SET_VOLUME",
          volume: volume,
        });
      } catch (error) {
        console.error("Could not message tab:", error);
        volumeText.textContent = "Refresh this tab";
      }
    });

    wrapper.appendChild(title);
    wrapper.appendChild(volumeText);
    wrapper.appendChild(slider);
    tabsContainer.appendChild(wrapper);
  });
});