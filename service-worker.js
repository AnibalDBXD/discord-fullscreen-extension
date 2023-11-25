function fullScreenVideo() {
	const exitHandler = () => {
		if (document.fullscreenElement === null) {
			document.exitFullscreen();
			video.style.position = 'absolute';
		}
	}
	const video = document.querySelector('video.media-engine-video');
	const currentPosition = video.style.position;

	if(currentPosition === 'fixed') {
		video.style.position = 'absolute';
		if (document.removeEventListener) {
			document.removeEventListener('fullscreenchange', exitHandler);
			document.removeEventListener('mozfullscreenchange', exitHandler);
			document.removeEventListener('MSFullscreenChange', exitHandler);
			document.removeEventListener('webkitfullscreenchange', exitHandler);
		}
	} else {
		video.style.position = 'fixed';
		video.requestFullscreen()
		if (document.addEventListener) {
			document.addEventListener('fullscreenchange', exitHandler);
			document.addEventListener('mozfullscreenchange', exitHandler);
			document.addEventListener('MSFullscreenChange', exitHandler);
			document.addEventListener('webkitfullscreenchange', exitHandler);
		}
	}
}

chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes('https://discord.com/channels/')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: fullScreenVideo
    });
  }
});