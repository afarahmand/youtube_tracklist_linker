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

// Listening for messages
// chrome.runtime.onMessage.addListener(receiver);
//
// function receiver(request, sender, sendResponse) {
//   console.log("DMX Sender BS: ", sender);
//
//   // Showing the page action if the content script says to
//   if (request.message === "show_page_action") {
//     chrome.pageAction.show(sender.tab.id, function() {
//       chrome.tabs.sendMessage(sender.tab.id, {"url": sender.tab.url});
//     });
//   }
// }