document.addEventListener('DOMContentLoaded', () => {
  const mute = document.getElementById('mute');
  const maxTime = document.getElementById('maxTime');
  const save = document.getElementById('save');
  const status = document.getElementById('status');
  chrome.storage.sync.get({
    muteTab: false,
    maxTime: 1200000
  }, (options) => {
    mute.checked = options.muteTab;
    maxTime.value = options.maxTime/60000
  });

  mute.onchange = () => {
    status.innerHTML = "";
  }

  maxTime.onchange = () => {
    status.innerHTML = "";
    if(maxTime.value > 20) {
      maxTime.value = 20;
    } else if (maxTime.value < 1) {
      maxTime.value = 1;
    } else if (isNaN(maxTime.value)) {
      maxTime.value = 20;
    }
  }
  save.onclick = () => {
    chrome.storage.sync.set({
      muteTab: mute.checked,
      maxTime: maxTime.value*60000
    });
    status.innerHTML = "Settings saved!"
  }
});
