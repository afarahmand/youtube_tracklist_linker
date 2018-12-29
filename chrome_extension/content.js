function receiver(message) {
  console.log("DMX message: ", message);
}

chrome.runtime.onMessage.addListener(receiver);
chrome.runtime.sendMessage({ "message": "show_page_action" });
