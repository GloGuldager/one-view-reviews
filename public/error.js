chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'analyzeReviews') {
        alert("Your reviews have been analyzed");

    }
}); 