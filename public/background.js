chrome.contextMenus.create({
    id: 'ReviewAnalyzers',
    title: 'Analyze Reviews',
    contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        console.log(tabs[0].url);
        chrome.tabs.sendMessage(tabs[0].id, { type: 'analyzeReviews', url: tabs[0].url });
    });
});

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

//     // since only one tab should be active and in the current window at once
//     // the return variable should only have one entry
//     var activeTab = tabs[0];
//     var activeTabId = activeTab.id; // or do whatever you need

//  });