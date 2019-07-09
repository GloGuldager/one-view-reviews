
chrome.runtime.onMessage.addListener(
    function (request) {
        console.log(request.type);
        if (request.type === 'printAnalysis') {
            console.log(request.json);
            // console.log(request.greeting);
        } if (request.type === 'analyzeReviews') {
            console.log('well at least the other one works');
        }




    }
);