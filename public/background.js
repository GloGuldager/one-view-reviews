chrome.contextMenus.create({
    id: 'ReviewAnalyzers',
    title: 'Analyze Reviews',
    contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
    
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        // chrome.tabs.sendMessage( tabs[0].id, {type: 'printAnalysis', greeting: "Coming from background"});
        console.log(tabs[0].url);
        chrome.tabs.sendMessage(tabs[0].id, { type: 'analyzeReviews', url: tabs[0].url });
    });
});


// editable