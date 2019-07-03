chrome.contextMenus.create({
    id: 'ReviewAnalyzers',
    title: 'Analyze Reviews',
    contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        console.log("in tabs query backgroundjs");
        console.log(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {type: 'analyzeReviews'});
    });
});