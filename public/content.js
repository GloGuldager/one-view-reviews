
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

            } else {
                alert("This extension gives results for one Amazon product at a time. Navigate to a product page and try again!")
            }
        }
    });


function userInputModal(rawURL, path) {
    const modal = document.createElement('dialog');
    modal.setAttribute("style", "height:350px");
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
    const dialog = document.querySelector("dialog");
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
        getASIN(rawURL, path, keywords);
    }
    dialog.querySelector("form").addEventListener("submit", _formSubmit);


    const _cancelClick = event => {
        // console.log(event.target);
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
    // createQueryURLs(ASIN);
    AJAXRequest(ASIN, keywords);
}

function AJAXRequest(ASIN, keywords) {
    // alert("about to post");

    var url = 'http://localhost:3000/api/post';
    var data = {
        "ASIN": ASIN,
        "keywords": keywords
    };

    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data), // data can be `string` or {object}!
        mode: 'cors'
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));


    // console.log("should go to printAnalysis now");
    // chrome.runtime.sendMessage({ type: 'printAnalysis', json: results});
    // console.log("this is the line after");
}
