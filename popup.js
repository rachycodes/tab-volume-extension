const tabsContainer = document.getElementById("tabs");

chrome.tabs.query({ audible: true }, (tabs) => {
  tabsContainer.innerHTML = "";

 if (tabs.length === 0) {
  tabsContainer.innerHTML = `<div class="empty">No audible tabs right now.</div>`;
  return;
}

  tabs.forEach((tab) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tab";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = tab.title || "Untitled tab";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.value = "70";

    slider.addEventListener("input", async () => {
      const volume = Number(slider.value) / 100;

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPageVolume,
        args: [volume],
      });
    });

    wrapper.appendChild(title);
    wrapper.appendChild(slider);
    tabsContainer.appendChild(wrapper);
  });
});

function setPageVolume(volume) {
  const mediaElements = document.querySelectorAll("audio, video");

  mediaElements.forEach((media) => {
    media.volume = volume;
  });
}