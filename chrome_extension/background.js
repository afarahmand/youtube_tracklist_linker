chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    // console.log("DMX BS tab: ", tab.url);
    chrome.pageAction.show(tab.id, function() {
      chrome.tabs.sendMessage(tab.id, {"url": tab.url});
    });
  }
});

// This is the background script for the extension
console.log("DMX BS!!!");
