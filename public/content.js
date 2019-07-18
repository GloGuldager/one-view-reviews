
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

    dummyTargetResults = [
        { 'text': 'value', 'score': 0.432 }, { 'text': 'quality', 'score': 0.034 }, { 'text': 'value', 'score': -0.432 }, { 'text': 'quality', 'score': 0.234 }, { 'text': 'longer query', 'score': 0.634 }
    ]
    dummyReviewArray = [
        { 'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!' },
        { 'reviewTitle': 'A totally different title!', 'reviewText': 'Amazing donut revenge never saw me coming left on Polaski Highway all the way to heaven if several small discombobulated loners never once said hi when they went to sleep I could never live it down no never live it down now let me be.' },
        { 'reviewTitle': 'This is what it looks like if somebody puts way too much text in the title!', 'reviewText': 'And nothing in body.' },
        { 'reviewTitle': 'Ok', 'reviewText': 'This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. This is a very long review text. ' },
        { 'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!' },
        { 'reviewTitle': 'This is amazing!', 'reviewText': 'I love having this garden gnome. I say hi to him every morning, and he makes my dog eat cheese! I could not live without him, he is my special boy!' }
    ];
    const usage = 37777;
    return printData(82, dummyReviewArray, dummyTargetResults, usage);

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
                <form class="OneViewModal" id="queryForm"> 
                <input class="OneViewModal" style="margin: 5px;" type="text" name="first" id="1" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px;" type="text" name="second" id="2" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px;" type="text" name="third" id="3" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px; padding: 5px 12px; background-color: #f68c1e; color: white; font-size:  16px; border-radius: 4px" type="submit" value="Analyze">
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
        let input1 = document.getElementById('1').value;
        let input2 = document.getElementById('2').value;
        let input3 = document.getElementById('3').value;
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
        // document.getElementById('queryForm').reset();
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

function createLoadModal(rawURL, path, keywords) {
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

    AJAXRequest(ASIN, keywords);
}

function AJAXRequest(ASIN, keywords) {

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

    const loadingModal = document.getElementById("loadModal");
    loadingModal.close();

    const overallSentiment = data.analysis.sentiment.document.score;
    const overallScore = Math.floor(overallSentiment * 50 + 50);
    console.log(overallScore);

    const targetSentiments = data.analysis.sentiment.targets;

    const matchedReviews = data.matchedReviews;

    const usage = data.analysis.usage.text_characters;

    printData(overallScore, matchedReviews, targetSentiments, usage);
}

function printData(score, matchedReviews, targets, usage) {

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
                    <h6 class="OneViewModal">* Data Reliability based on quantity of review text</h6>
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

            
            
            
            <div class="OneViewModal" id="bottomLeft">
                <button id="loginButton">Login</button>
                <button id="signupButton">New User</button>
                <button id="logoutButton">Logout</button>
                <div id="userPrint"></div>
            </div>
            <div class="OneViewModal" id="tag">
                <button id="tagButton">Add Tags</button>
                <div id="formContainer">
                    <form class="OneViewModal" id="tagForm"> 
                        <input class="OneViewModal" type="text" name="first" id="tag1" class="tagInput" value="">
                        <input class="OneViewModal" type="text" name="second" id="tag2" class="tagInput" value="">
                    </form>
                </div>
                <button class="OneViewModal" type="submit" id="saveButton" form="tagForm">Save Reviews</button>
            </div>
            </div>

        </div>`;
    document.body.appendChild(printModal);
    const thisModal = document.getElementById('printModal');
    // const thisModal = document.getElementById('printModalTest');
    thisModal.showModal();


    const iframe = document.getElementById("printIFrame");
    iframe.frameBorder = 0;

    // localStorage.removeItem(oneViewID);
    printButtons();
    function printButtons() {
        // localStorage.oneViewID = 3;

        if (localStorage.oneViewID && localStorage.oneViewUsername) {
            //will determine which buttons are visible and which are displayed
            const saveButton = document.getElementById('saveButton');
            saveButton.style.display = 'block';
            const tagButton = document.getElementById('tagButton');
            tagButton.style.display = 'block';
            const userPrint = document.getElementById('userPrint');
            userPrint.style.display = 'block';
            userPrint.innerHTML = `Hi, ${localStorage.oneViewUsername}!`;
            const loginButton = document.getElementById('loginButton');
            loginButton.style.display = 'none';
            const signupButton = document.getElementById('signupButton');
            signupButton.style.display = 'none';
            const logoutButton = document.getElementById('logoutButton');
            logoutButton.style.display = 'block';
            
        } else {
            const loginButton = document.getElementById('loginButton');
            loginButton.style.display = 'block';
            const signupButton = document.getElementById('signupButton');
            signupButton.style.display = 'block';
            const saveButton = document.getElementById('saveButton');
            saveButton.style.display = 'none';
            const tagButton = document.getElementById('tagButton');
            tagButton.style.display = 'none';
            tagContainer = document.getElementById('formContainer');
            tagContainer.style.display = 'none';
            const userPrint = document.getElementById('userPrint');
            userPrint.style.display = 'none';
            const logoutButton = document.getElementById('logoutButton');
            logoutButton.style.display = 'none';
        }
    }

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
        const scoreHeight = score * 1.5;

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
        if (event.target.id === "logoutButton") {
            localStorage.removeItem('oneViewUsername'); 
            localStorage.removeItem('oneViewID');
            printButtons(); 
        } else if (event.target.id === "loginButton") {
            loginModal();
        } else if (event.target.id === "signupButton") {
            console.log("signupButton pressed");
            signupModal();
        } else if (event.target.id === "tagButton") {
            const tagButton = document.getElementById('tagButton');
            tagButton.style.display = 'none';
            const tagContainer = document.getElementById('formContainer');
            tagContainer.style.display = 'block';
        } else if (event.target.id === "saveButton") {
            saveTags();
        } else if (event.target.id === "signupModal" || event.target.id === "loginModal") {
            return;
        }
        else if (!(event.target.className === "OneViewModal" || event.target.className === "OneViewModal reviewTitles"
            || event.target.className === "OneViewModal reviewText" || event.target.className === "OneViewModal chartValues") || event.target.id === "exitButton") {
            exitReset();
        }
    }
    document.body.addEventListener("click", _parseClick);


    function removeListeners() {
        document.body.removeEventListener("click", _parseClick);
    }


    function saveTags() {
        event.preventDefault();
        const tag1 = document.getElementById('tag1').value;
        const tag2 = document.getElementById('tag2').value;
        const tag3 = document.getElementById('tag3').value;
        const tags = [];
        if (tag1) {
            tags.push(tag1);
        }
        if (tag2) {
            tags.push(tag2);
        }
        if (tag3) {
            tags.push(tag3);
        }
        saveSearch(score, matchedReviews, targets, usage, tags);
    }

    function saveSearch(score, matchedReviews, targets, usage, tags) {
        // console.log(ASIN);
        var url = `http://localhost:3000/api/savereviews/${localStorage.oneViewID}`;
        // var url = `https://one-view-reviews-api.herokuapp.com/api/reviews/${id}`;
        var data = {
            "score": score,
            "reviews": matchedReviews,
            "targets": targets,
            "usage": usage,
            "tags": tags
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
            .then(data => successModal())
            .catch(error => alert('Save failed'));
    }

    function successModal () {
        const successModal = document.createElement('dialog');
        successModal.setAttribute("style", "height:180px");
        successModal.setAttribute("id", "successModal");
        successModal.innerHTML =
            `<iframe class="OneViewModal" id="successIFrame" style="height:100%; width: 322px;"></iframe>
            <div class="OneViewModal" style="position:absolute; top: 10px; left:5px; margin: 5px; padding: 0px 20px">
                <div class="OneViewModal" id="successText" style="height: 45px; border-bottom-style: dotted; border-width: 1px; border-color: rgba(43,57,144, 0.6)">Save Successful!</div>
                <div class="OneViewModal" id="visitWebsite" style="margin-top: 15px; font-size: 24px; line-height: 1.8rem">
                    Visit our <a href="OUR DEPLOYED URL NEEDS TO GO HERE DONT FORGET">WEBSITE</a> to see your saved reviews!
                </div>
            </div>`;
        document.body.appendChild(successModal);
        const successDialog = document.getElementById("successModal");
        successDialog.showModal();


        const iframe = document.getElementById("successIFrame");
        iframe.frameBorder = 0;

        const _cancelClick = event => {
            if (!(event.target.className === "OneViewModal")) {
                successDialog.close();
                removeListeners();
            }
        }
        document.body.addEventListener("click", _cancelClick);


        function removeListeners() {
            document.body.removeEventListener("click", _cancelClick);
        }
    }



    function loginModal() {
        // modal form
        const loginModal = document.createElement('dialog');
        loginModal.setAttribute("style", "height:270px");
        loginModal.setAttribute("id", "loginModal");
        loginModal.innerHTML =
            `<iframe class="OneViewModal" id="loginIFrame" style="height:100%;"></iframe>
            <div class="OneViewModal" style="position:absolute; top:1px; left:1px; padding: 3px; padding-top: 2px;">  
                <button class="OneViewModal" id="closeLogin" style="background-color: #f68c1e; color: white; font-size: 14px; font-weight: bold;">x</button>
            </div>
            <div class="OneViewModal" style="position:absolute; top: 10px; left:5px; margin: 5px; padding: 0px 20px">
                <img class="OneViewModal" src="https://drive.google.com/uc?export=download&id=1e7eAPsvTk66LsrWIaSbbeMqZYOOarXdl" alt="OneView Logo">
            </div>
            <div class="OneViewModal" style="position:absolute; top: 130px; left:5px;">
                <form class="OneViewModal"> 
                Username: <input class="OneViewModal" style="margin: 5px;" type="text" name="first" id="logUser" class="input" value=""><br>
                Password:  <input class="OneViewModal" style="margin: 5px 5px 5px 9px;" type="password" name="second" id="logPass" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px 5px 5px 148px; padding: 5px 12px; background-color: #f68c1e; color: white; font-size: 16px; border-radius: 4px" type="submit" value="Login">
                </form>
            </div>`;
        document.body.appendChild(loginModal);
        const loginDialog = document.getElementById("loginModal");
        loginDialog.showModal();


        const iframe = document.getElementById("loginIFrame");
        iframe.frameBorder = 0;

        loginDialog.querySelector("#closeLogin").addEventListener("click", () => {
            loginDialog.close();
        });

        const _formSubmit = () => {

            event.preventDefault();

            // alert('submitted');
            const username = document.getElementById('logUser').value;
            const password = document.getElementById('logPass').value;
            if (!username || !password) {
                return alert("Username and Password required");
            }
            loginDialog.close();
            removeListeners();
            getUser(username, password);
            // username = '';
            // password = '';
        }
        loginDialog.querySelector("form").addEventListener("submit", _formSubmit);


        const _cancelClick = event => {
            if (!(event.target.className === "OneViewModal")) {
                loginDialog.close();
                removeListeners();
            }
        }
        document.body.addEventListener("click", _cancelClick);


        function removeListeners() {
            document.body.removeEventListener("click", _cancelClick);
            loginDialog.querySelector("form").removeEventListener("submit", _formSubmit);
        }

    }

    function signupModal() {
        console.log("in signup Modal");
        const signupModal = document.createElement('dialog');
        signupModal.setAttribute("style", "height:310px");
        signupModal.setAttribute("id", "signupModal");
        signupModal.innerHTML =
            `<iframe class="OneViewModal" id="keywordInput" style="height:100%;"></iframe>
            <div class="OneViewModal" style="position:absolute; top:1px; left:1px; padding: 3px; padding-top: 2px;">  
                <button class="OneViewModal" id="closeSignup" style="background-color: #f68c1e; color: white; font-size: 14px; font-weight: bold;">x</button>
            </div>
            <div class="OneViewModal" style="position:absolute; top: 10px; left:5px; margin: 5px; padding: 0px 20px">
                <img class="OneViewModal" src="https://drive.google.com/uc?export=download&id=1e7eAPsvTk66LsrWIaSbbeMqZYOOarXdl" alt="OneView Logo">
            </div>
            <div class="OneViewModal" style="position:absolute; top: 130px; left:5px;">
                <form class="OneViewModal" style="margin-left: 10px;"> 
                Username: <input class="OneViewModal" style="margin: 5px;" type="text" name="username" id="signUser" class="input" value=""><br>
                Password:  <input class="OneViewModal" style="margin: 5px 5px 5px 9px;" type="password" name="password" id="signPass" class="input" value=""><br>
                Confirm:  <input class="OneViewModal" style="margin: 5px 5px 5px 17px;" type="password" name="confirm" id="signConfirm" class="input" value=""><br>
                <input class="OneViewModal" style="margin: 5px 5px 5px 78px; padding: 5px 12px; background-color: #f68c1e; color: white; font-size: 16px; border-radius: 4px" type="submit" value="Create Account">
                </form>
            </div>`;
        document.body.appendChild(signupModal);
        const signupDialog = document.getElementById("signupModal");
        signupDialog.showModal();


        const iframe = document.getElementById("keywordInput");
        iframe.frameBorder = 0;

        signupDialog.querySelector("#closeSignup").addEventListener("click", () => {
            signupDialog.close();
        });

        const _formSubmit = () => {

            event.preventDefault();

            // alert('submitted');
            const username = document.getElementById('signUser').value;
            const password = document.getElementById('signPass').value;
            const confirmPass = document.getElementById('signConfirm').value;

            if (!username || !password || !confirmPass) {
                return alert('Please fill out all fields');
            } else if (username.length > 8) {
                return alert("Keep usernames to 8 characters. We're not that fancy around here!");
            } else if (password != confirmPass) {
                return alert('Passwords do not match');
            }
            signupDialog.close();
            removeListeners();
            postUser(username, password);
            // username = '';
            // password = '';
        }
        signupDialog.querySelector("form").addEventListener("submit", _formSubmit);


        const _cancelSignup = event => {
            if (!(event.target.className === "OneViewModal")) {
                signupDialog.close();
                removeListeners();
            }
        }
        document.body.addEventListener("click", _cancelSignup);


        function removeListeners() {
            document.body.removeEventListener("click", _cancelSignup);
            signupDialog.querySelector("form").removeEventListener("submit", _formSubmit);
        }

    }

    function getUser(username, password) {
        var url = `http://localhost:3000/api/users/${username}`;
        // var url = 'https://one-view-reviews-api.herokuapp.com/api/users';
        var data = {
            "username": username,
            "password": password
        };
        console.log(data);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data),
            mode: 'cors'
        }).then(response => response.json())
            .then(data => saveLocalID(data))
            .catch(error => alert('Login Failed. Try Again.'));
    }

    function postUser(username, password) {
        var url = 'http://localhost:3000/api/users';
        // var url = 'https://one-view-reviews-api.herokuapp.com/api/users';
        var data = {
            "username": username,
            "password": password
        };
        console.log(data);
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data),
            mode: 'cors'
        }).then(response => response.json())
            .then(data => saveLocalID(data))
            .catch(error => console.log(error));
    }

    function saveLocalID(data) {
        console.log('response received');
        console.log(data);
        if (data.code === 11000) {
            return alert('Username already exists');
        }
        localStorage.oneViewID = data._id;
        localStorage.oneViewUsername = data.username;
        printButtons();
    }

}

    // console.log("should go to printAnalysis now");
    // chrome.runtime.sendMessage({ type: 'printAnalysis', json: results});
    // console.log("this is the line after");

