// I may build an error for running extension on all other sites, but it's probably not necessary because logo is grayed out so user should know

chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'analyzeReviews') {
        alert("Your reviews have been analyzed");

    }
}); 