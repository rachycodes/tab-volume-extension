let currentVolume = 0.7;

function applyVolume() {
  const mediaElements = document.querySelectorAll("audio, video");

  mediaElements.forEach((media) => {
    media.volume = currentVolume;
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_VOLUME") {
    currentVolume = message.volume;
    applyVolume();
  }
});

setInterval(() => {
  applyVolume();
}, 1000);