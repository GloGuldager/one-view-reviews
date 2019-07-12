
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.type === 'analyzeReviews') {

            const rawURL = request.url;

            // this code evaluates the 

            if (rawURL.includes('/dp/')) {
                const path = '/dp/';
                userInputModal(rawURL, path);

            } else if (rawURL.includes('/gp/product/')) {
                const path = '/gp/product/';
                userInputModal(rawURL, path);

            } else if (rawURL.includes('/product-reviews/')) {
                const path = '/product-reviews/';
                userInputModal(rawURL, path);

            } else if (rawURL.includes('/asin/')) {
                const path = '/asin/';
                userInputModal(rawURL, path);

            } else if (rawURL.includes('/asin/')) {
                const path = '/gp/aw/d/';
                userInputModal(rawURL, path);

            } else {
                alert("This extension gives results for one Amazon product at a time. Navigate to a product page and try again!")
            }
        }
    });


function userInputModal(rawURL, path) {
    dummyReviewArray = [
        {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
        {'reviewTitle': 'This is amazing!', 'reviewText': 'Amazing donut revenge never saw me coming left on Polaski Highway all the way to heaven if several small discombobulated loners never once said hi when they went to sleep I could never live it down no never live it down know let me be.'},
        {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
        {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
        {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
        {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'}
    ];
    return printData(82, dummyReviewArray);
    const modal = document.createElement('dialog');
    modal.setAttribute("style", "height:350px");
    modal.setAttribute("id", "inputModal");
    modal.innerHTML =
        `<iframe class="OneViewModal" id="keywordInput" style="height:100%;"></iframe>
            <div class="OneViewModal" style="position:absolute; top:1px; left:1px; padding: 3px; padding-top: 2px;">  
                <button style="background-color: #f68c1e; color: white; font-size: 14px; font-weight: bold;">x</button>
            </div>
            <div class="OneViewModal" style="position:absolute; top: 10px; left:5px; margin: 5px; padding: 0px 20px">
                <img class="OneViewModal" src="https://drive.google.com/uc?export=download&id=1e7eAPsvTk66LsrWIaSbbeMqZYOOarXdl" alt="OneView Logo">
            </div>
            <div class="OneViewModal" style="position:absolute; top: 130px; left:5px;">
                <div class="OneViewModal" style="margin: 2px 5px;">Add target words or phrases to refine your review search (optional):</div> 
                <form class="OneViewModal"> 
                <input class="OneViewModal" style="margin: 5px;" type="text" name="first" id="1" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px;" type="text" name="second" id="2" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px;" type="text" name="third" id="3" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px; padding: 5px 12px; background-color: #f68c1e; color: white; font-size: 16px; border-radius: 4px" type="submit" value="Analyze">
                </form>
            </div>`;
    document.body.appendChild(modal);
    const dialog = document.getElementById("inputModal");
    dialog.showModal();


    const iframe = document.getElementById("keywordInput");
    iframe.frameBorder = 0;

    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });

    const _formSubmit = () => {

        event.preventDefault();

        // alert('submitted');
        const input1 = document.getElementById('1').value;
        const input2 = document.getElementById('2').value;
        const input3 = document.getElementById('3').value;
        const keywords = [];
        if (input1) {
            keywords.push(input1);
        }
        if (input2) {
            keywords.push(input2);
        }
        if (input3) {
            keywords.push(input3);
        }
        dialog.close();
        removeListeners();
        getASIN(rawURL, path, keywords);
    }
    dialog.querySelector("form").addEventListener("submit", _formSubmit);


    const _cancelClick = event => {
        if (!(event.target.className === "OneViewModal")) {
            dialog.close();
            removeListeners();
        }
    }
    document.body.addEventListener("click", _cancelClick);


    function removeListeners() {
        document.body.removeEventListener("click", _cancelClick);
        dialog.querySelector("form").removeEventListener("submit", _formSubmit);
    }
}

function getASIN(rawURL, path, keywords) {
    const splitASIN = rawURL.split(path)[1];
    const ASIN = splitASIN.substring(0, 10);
    console.log(ASIN);
    // alert(ASIN + ' / ' + keywords);

    AJAXRequest(ASIN, keywords);
}

function AJAXRequest(ASIN, keywords) {
    // alert("about to post");

    var url = 'http://localhost:3000/api/post';
    // var url = 'https://one-view-reviews-api.herokuapp.com/api/post';
    var data = {
        "ASIN": ASIN,
        "keywords": keywords
    };
console.log(data);
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data), // data can be `string` or {object}!
        mode: 'cors'
    }).then(response => response.json())
        .then(data => parseData(data))
        .catch(error => console.error('Error:', error));

}

function parseData(data) {
    console.log(data);

    const overallSentiment = data.analysis.sentiment.document.score;
    const overallScore = Math.floor(overallSentiment * 50 + 50);
    console.log(overallScore);

    const matchedReviews = data.matchedReviews;
    // const targetSentiment = [];
    // const targ = data.sentiment.targets;
    // // if (targ[0] = "''") {
    // //     return;
    // // } else
    // for (let i = 0; i < targ.length; i++) {
    //     targetSentiment.push(`{text: ${targ[i].text}, score: ${targ[i].score}}`)

    // }
    // console.log(targetSentiment);

    printData(overallScore, matchedReviews);
}

function printData(score, matchedReviews) {

    // dummyReviewArray = [
    //     {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
    //     {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
    //     {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
    //     {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
    //     {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'},
    //     {'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!'}
    // ];

    let printModal = document.createElement("dialog");
    printModal.setAttribute("id", "printModal");
    printModal.innerHTML =
        `<iframe class="OneViewModal" id="printIFrame" style="height:100%;"></iframe>
            <div id="exitButtonDiv" class="OneViewModal">  
                <button class="OneViewModal" id="exitButton">x</button>
            </div>
        <div class="OneViewModal" id="container">
            <div class="OneViewModal" id="header" class="OneViewModal">
                <div class="OneViewModal" id="logo">
                    <img class="OneViewModal" src="https://drive.google.com/uc?export=download&id=1e7eAPsvTk66LsrWIaSbbeMqZYOOarXdl" alt="OneView Logo">
                </div>
                <div class="OneViewModal" id="notes">
                    <h6 class="OneViewModal">* Based on sentiment scores from IBM Watson</h6>
                    <h6 class="OneViewModal">** Score of 50 is neutral</h6>
                </div>
            </div>

            <div class="OneViewModal" id="resultsContainer">

                <div class="OneViewModal" id="overallScore">
                    <h1 class="OneViewModal" id="score">Overall Score: ${score}</h1>
                    <div class="OneViewModal" id="chart">
                        <img class="OneViewModal" src="https://drive.google.com/uc?export=download&id=1e7eAPsvTk66LsrWIaSbbeMqZYOOarXdl" alt="OneView Logo">
                    </div>
                </div>

                <div class="OneViewModal" id="sentimentReturns">

                </div>

                <div class="OneViewModal" id="topReviews">
                    <div class="OneViewModal" id="scrollDiv">
                    </div>
                </div>

                <div class="OneViewModal" id="userActions">
                <button>'Save Reviews'</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(printModal);
    const thisModal = document.getElementById('printModal');
    // const thisModal = document.getElementById('printModalTest');
    thisModal.showModal();


    const iframe = document.getElementById("printIFrame");
    iframe.frameBorder = 0;

    // let reviews = [];
    // for (let i = 0; i < dummyReviewArray.length; i++) {
    for (let i = 0; i < matchedReviews.length; i++) {
        const titleDiv = document.createElement('div');
        titleDiv.setAttribute('class', 'reviewTitles');
        // titleDiv.append(dummyReviewArray[i].title);
        titleDiv.append(matchedReviews[i].reviewTitle);

        const reviewDiv = document.createElement('div');
        reviewDiv.setAttribute('class', 'reviewText');
        // reviewDiv.append(dummyReviewArray[i].review);
        reviewDiv.append(matchedReviews[i].reviewText);
        const rev = document.getElementById("topReviews");
        rev.append(titleDiv);
        rev.append(reviewDiv);
    }

    thisModal.querySelector("button").addEventListener("click", () => {
        thisModal.close();
    });
    const _cancelClick = event => {
        if (!(event.target.className === "OneViewModal")) {
            thisModal.close();
            removeListeners();
        }
    }
    document.body.addEventListener("click", _cancelClick);


    function removeListeners() {
        document.body.removeEventListener("click", _cancelClick);
    }
}




    // console.log("should go to printAnalysis now");
    // chrome.runtime.sendMessage({ type: 'printAnalysis', json: results});
    // console.log("this is the line after");

