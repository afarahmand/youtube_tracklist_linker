chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.pageAction.show(tab.id, function() {
      chrome.tabs.sendMessage(tab.id, {"url": tab.url});
    });
  }
});

console.log("DMX BS!!!");
