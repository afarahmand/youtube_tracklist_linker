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

function uponTabMsgReceipt(message) {
  const videoId = getVideoIdFromURL(message["url"]);
  if (videoId === null) { return null; }

  console.log("DMX videoId CS: ", videoId);

  // Hit BE
  const videoInfo = fetchJSON(videoId);
  if (videoInfo === undefined) { return null; }

  displayTracklist(videoInfo);
  console.log("DMX Displayed!!!");
}

chrome.runtime.onMessage.addListener(uponTabMsgReceipt);
chrome.runtime.sendMessage({ "message": "show_page_action" });
