chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.type === 'analyzeReviews') {
            const rawURL = request.url;

            // this code evaluates the 

            if (rawURL.includes('/dp/')) {
                const path = '/dp/';
                userInputModal(rawURL, path);
                // getASIN(rawURL, path, keywords);
            } else if (rawURL.includes('/gp/product/')) {
                const path = '/gp/product/';
                userInputModal(rawURL, path);
                // getASIN(rawURL, path, keywords);
            } else if (rawURL.includes('/product-reviews/')) {
                const path = '/product-reviews/';
                userInputModal(rawURL, path);
                // getASIN(rawURL, path, keywords);
            } else {
                alert("This extension gives results for one Amazon product at a time. Navigate to a product page and try again!")
            }
        }
    });


function userInputModal(rawURL, path) {
    const modal = document.createElement('dialog');
    modal.setAttribute("style", "height:350px" );
    modal.innerHTML =
        `<iframe id="keywordInput" style="height:100%;"></iframe>
            <div style="position:absolute; top:1px; left:1px; padding: 3px;">  
                <button style="background-color: #f68c1e; color: white; font-size: 14px; font-weight: bold;">x</button>
            </div>
            <div style="position:absolute; top: 10px; left:5px; margin: 5px; padding: 0px 20px">
                <img src="https://doc-10-0o-docs.googleusercontent.com/docs/securesc/pgq6srcuslbp8nf1ljrbaamsdu1s4gmd/ucsqfnqomdsc2s608guhmgf1k5tqs3fr/1562364000000/14303230788414761217/14303230788414761217/1329K8Ttgo5QkypVhld8ekkZ4sn_3uOIE?e=view&nonce=uglso8m5e2m5i&user=14303230788414761217&hash=534ni81urr8kuj07mie4iea21qpgsing" alt="OneView Logo">
            </div>
            <div style="position:absolute; top: 130px; left:5px;">
                <div style="margin: 2px 5px;">Add target words or phrases to refine your review search (optional):</div> 
                <form> 
                <input style="margin: 5px;" type="text" name="first" id="1" class="input" value=""><br>
                <input style="margin: 5px;" type="text" name="second" id="2" class="input" value=""><br>
                <input style="margin: 5px;" type="text" name="third" id="3" class="input" value=""><br>
                <input style="margin: 5px; padding: 5px 12px; background-color: #f68c1e; color: white; font-size: 16px;" type="submit" value="Analyze">
                </form>
            </div>`;
    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();

    const iframe = document.getElementById("keywordInput");
    iframe.frameBorder = 0;

    dialog.querySelector("form").addEventListener("submit", () => {
        const input1 = document.getElementById('1').value;
        const input2 = document.getElementById('2').value;
        const input3 = document.getElementById('3').value;
        [];
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
    });

    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });
}

function getASIN(rawURL, path, keywords) {
    const splitASIN = rawURL.split(path)[1];
    const ASIN = splitASIN.substring(0, 10);
    console.log(ASIN);
    alert(keywords);
    // createQueryURLs(ASIN);
    AJAXRequest(ASIN, keywords)
}

function AJAXRequest(ASIN, keywords) {
    $.ajax({
        type: "POST",
        url: "http://one-view-reviews-api.herokuapp.com/post",
        data: {"ASIN": ASIN,
               "keywords": keywords},
        success: parseData(data),
        dataType: "json"
    });
}

function parseData(data) {
    alert("data came back!")
}



