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
  // Remove previously rendered table
  const tableId = "YouTube-tracklist-linker-table";
  removePreviouslyRenderedTable(tableId);

  const videoId = getVideoIdFromURL(message["url"]);
  if (videoId === null) { return null; }

  console.log("DMX videoId CS: ", videoId);

  // Hit BE
  const videoInfo = fetchJSON(videoId);
  if (videoInfo === undefined) { return null; }

  displayTracklist(tableId, videoInfo);
  console.log("DMX Displayed!!!");
}

chrome.runtime.onMessage.addListener(uponTabMsgReceipt);
