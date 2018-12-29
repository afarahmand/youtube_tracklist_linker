const getVideoIdFromURL = url => {
  let videoId = "";

  let indexOfVideoId = url.search("v=");

  if (indexOfVideoId === -1) { return null; }

  let i = indexOfVideoId + 2;
  while (i < url.length && url[i] !== "&") {
    videoId+=url[i];
    i++;
  }

  return videoId;
};

function receiver(message) {
  const videoId = getVideoIdFromURL(message["url"]);
  if (videoId === null) { return null; }

  console.log("DMX videoId CS: ", videoId);

  // Hit BE
  let tracklist = fetchJSON(videoId);

  console.log("Tracklist Keys: ", Object.keys(tracklist));

  displayTracklist(tracklist);
  console.log("DMX Displayed!!!");
}

chrome.runtime.onMessage.addListener(receiver);
chrome.runtime.sendMessage({ "message": "show_page_action" });
