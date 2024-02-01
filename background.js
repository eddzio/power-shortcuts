chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0]) {
      return; // No active tab found
    }

    if (command === "duplicate_tab") {
      chrome.tabs.duplicate(tabs[0].id);
    } else if (command === "pin_tab") {
      const currentlyPinned = tabs[0].pinned;
      chrome.tabs.update(tabs[0].id, {pinned: !currentlyPinned});
    } else if (command === "close_other_tabs") {
      chrome.tabs.query({currentWindow: true}, function(allTabs) {
        const tabsToClose = allTabs.filter(tab => tab.id !== tabs[0].id);
        for (const tab of tabsToClose) {
          chrome.tabs.remove(tab.id);
        }
      });
    }
  });
});
