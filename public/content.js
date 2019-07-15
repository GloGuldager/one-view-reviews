
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
    //toggle this path on if you want to bypass the server and just work on dummy data in the Results Modal

    // dummyTargetResults = [
    //     {'text':'value', 'score': 0.432}, {'text':'quality', 'score': 0.034}, {'text':'value', 'score': -0.432}, {'text':'quality', 'score': 0.234}, {'text':'longer query', 'score': 0.634}
    // ]
    // dummyReviewArray = [
    //     { 'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!' },
    //     { 'reviewTitle': 'A totally different title!', 'reviewText': 'Amazing donut revenge never saw me coming left on Polaski Highway all the way to heaven if several small discombobulated loners never once said hi when they went to sleep I could never live it down no never live it down now let me be.' },
    //     { 'reviewTitle': 'This is what it looks like if somebody puts way too much text in the title!', 'reviewText': 'And nothing in body.' },
    //     { 'reviewTitle': 'Ok', 'reviewText': 'This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. ' },
    //     { 'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!' },
    //     { 'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!' }
    // ];
    // const usage = 37777;
    // return printData(82, dummyReviewArray, dummyTargetResults, usage);

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
        console.log(dialog);
        dialog.close();
        removeListeners();
        createLoadModal(rawURL, path, keywords);
        // getASIN(rawURL, path, keywords);
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

function createLoadModal (rawURL, path, keywords) {
    const modal = document.createElement('dialog');
    modal.setAttribute("style", "outline-width:none");
    modal.setAttribute("id", "loadModal");
    modal.innerHTML =
        `<div class="OneViewModal">
            <div id="loadText">Analyzing Reviews...</div>
            <div id="loadGif">
                <img src="https://drive.google.com/uc?export=download&id=1vcrUSKxnMnBLm7_JplaW7l1NB39BHkMQ" alt="loadingGif" style= "height: 96px; width: 96px"></img>
            </div>            
        </div>`;
    document.body.appendChild(modal);
    const loadModal = document.getElementById("loadModal");
    loadModal.showModal();
    getASIN(rawURL, path, keywords);
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
        .catch(error => alert('No Watson data returned. Try a different query. Products with more reviews and queries with more target words tend to yield better results!'));

}

function parseData(data) {
    console.log(data);

    const overallSentiment = data.analysis.sentiment.document.score;
    const overallScore = Math.floor(overallSentiment * 50 + 50);
    console.log(overallScore);

    const targetSentiments = data.analysis.sentiment.targets;

    const matchedReviews = data.matchedReviews;

    const usage = data.analysis.usage.text_characters;


    printData(overallScore, matchedReviews, targetSentiments, usage);
}

function printData(score, matchedReviews, targets, usage) {
    loadModal.close();
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
                    <h4 class="OneViewModal" id="notesTitle" style="display: grid; justify-content: center;">OneView Extension Notes</h4>
                    <h6 class="OneViewModal">* Scores based on Sentiment Analysis by IBM WATSON</h6>
                    <h6 class="OneViewModal">* Scores are on a 100 pt scale</h6>
                    <h6 class="OneViewModal">* Data Reliability based on quantity of reviews</h6>
                    <h6 class="OneViewModal">* Target words omitted if too few matches</h6>
                </div>
            </div>

            <div class="OneViewModal" id="overallScore">
                <h1 class="OneViewModal" id="scoreText">Overall Score:</h1>
                <div class="OneViewModal" id="scoreValue">${score}</div>
            </div>

            <div class="OneViewModal" id="dataReliability">
                <div class="OneViewModal" id="dataText">Data Reliability: </div>
                <div class="OneViewModal" id="dataScore"></div>
            </div>

            <div class="OneViewModal" id="chartContainer">
                <div class="OneViewModal" id="chartContent">
                    <div class="OneViewModal chartValues" id="chartValue0">            
                        <div class="OneViewModal" id="chart0color"></div>
                        <h5 class="OneViewModal" id="chart0text"></h5>
                    </div>
                    <div class="OneViewModal chartValues" id="chartValue1">            
                        <div class="OneViewModal" id="chart1color"></div>
                        <h5 class="OneViewModal" id="chart1text"></h5>
                    </div>
                    <div class="OneViewModal chartValues" id="chartValue2">            
                        <div class="OneViewModal" id="chart2color"></div>
                        <h5 class="OneViewModal" id="chart2text"></h5>
                    </div>
                    <div class="OneViewModal chartValues" id="chartValue3">            
                        <div class="OneViewModal" id="chart3color"></div>
                        <h5 class="OneViewModal" id="chart3text"></h5>
                    </div>
                    <div class="OneViewModal chartValues" id="chartValue4">            
                        <div class="OneViewModal" id="chart4color"></div>
                        <h5 class="OneViewModal" id="chart4text"></h5>
                    </div>
                </div>
                <div class="OneViewModal" id="chart">
                    <div class="OneViewModal" id="chart0"></div>
                    <div class="OneViewModal" id="chart1"></div>
                    <div class="OneViewModal" id="chart2"></div>
                    <div class="OneViewModal" id="chart3"></div>
                    <div class="OneViewModal" id="chart4"></div>
                </div>
                
            </div>

            <div class="OneViewModal" id="topReviews"></div>

            <div class="OneViewModal" id="save">
                <button id="saveButton">Save Results</button>
            </div>

        </div>`;
    document.body.appendChild(printModal);
    const thisModal = document.getElementById('printModal');
    // const thisModal = document.getElementById('printModalTest');
    thisModal.showModal();


    const iframe = document.getElementById("printIFrame");
    iframe.frameBorder = 0;
    
    addReviews();
    function addReviews() {

        const allReviewContainer = document.createElement('div');
        allReviewContainer.setAttribute('class', 'OneViewModal');
        allReviewContainer.setAttribute('id', 'allReviewContainer');

        for (let i = 0; i < matchedReviews.length; i++) {

            const titleDiv = document.createElement('div');
            titleDiv.setAttribute('class', 'OneViewModal reviewTitles');
            titleDiv.append(matchedReviews[i].reviewTitle);

            const reviewDiv = document.createElement('div');
            reviewDiv.setAttribute('class', 'OneViewModal reviewText');
            reviewDiv.append(matchedReviews[i].reviewText);

            allReviewContainer.appendChild(titleDiv);
            allReviewContainer.appendChild(reviewDiv);
        }

        const rev = document.getElementById("topReviews");
        rev.appendChild(allReviewContainer);
    }
    for (let i = 0; i < targets.length; i++) {
        let text = targets[i].text;
        if (text === 'price') {
            text = 'value';
        }
        const rawScore = targets[i].score;
        const score = Math.floor(rawScore * 50 + 50);
        const scoreHeight = score*1.5;

        const chartVal = document.getElementById(`chart${i}`);
        chartVal.style.height = `${scoreHeight}px`;
        chartVal.innerHTML = score;

        // const chartDisplay = document.getElementById(`chartValue${i}`);
        // chartDisplay.style.display = 'inherit';

        const chartText = document.getElementById(`chart${i}text`);
        chartText.innerHTML = `${text}:  ${score}`;
    }
    const dataScore = document.getElementById('dataScore');
    if (usage <= 10000) {
        dataScore.innerHTML = 'POOR';
        dataScore.style.backgroundColor = 'red';
    } else if (usage <= 20000) {
        dataScore.innerHTML = 'SUBPAR';
        dataScore.style.backgroundColor = 'rgb(172, 59, 78)';
    } else if (usage <= 30000) {
        dataScore.innerHTML = 'ACCEPTABLE';
        dataScore.style.backgroundColor = 'rgb(56, 55, 73)';
    } else if (usage <= 40000) {
        dataScore.innerHTML = 'GOOD';
        dataScore.style.backgroundColor = 'rgb(91, 163, 95)';
    } else {
        dataScore.innerHTML = 'GREAT';
        dataScore.style.backgroundColor = 'green';
    }


    function exitReset() {
        thisModal.close();
        removeListeners();
        const reviews = document.getElementById("allReviewContainer");
        reviews.parentNode.removeChild(reviews);
    }
    const _parseClick = event => {

        console.log(event.target);
        if (event.target.id === "saveButton") {
            // checkAuth();
        }
        else if (!(event.target.id === "exitButton" || event.target.className === "OneViewModal" || event.target.className === "OneViewModal reviewTitles"
                || event.target.className === "OneViewModal reviewText" || event.target.className === "OneViewModal chartValues")) {
            exitReset();
        }
    }
    document.body.addEventListener("click", _parseClick);


    function removeListeners() {
        document.body.removeEventListener("click", _parseClick);
    }
}



    // console.log("should go to printAnalysis now");
    // chrome.runtime.sendMessage({ type: 'printAnalysis', json: results});
    // console.log("this is the line after");

