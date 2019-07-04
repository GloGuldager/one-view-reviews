chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.type === 'analyzeReviews') {
            const rawURL = request.url;
            console.log(rawURL);

            if (rawURL.includes('/dp/')) {
                const path = '/dp/';
                getASIN(rawURL, path);
            } else if (rawURL.includes('/gp/product/')) {
                const path = '/gp/product/';
                getASIN(rawURL, path);
            } else if (rawURL.includes('/product-reviews/')) {
                const path = '/product-reviews/';
                getASIN(rawURL, path);
            } else {
                alert("This extension gives results for one Amazon product at a time. Navigate to a product page and try again!")
            }




        }
    });

function getASIN(rawURL, path) {
    const splitASIN = rawURL.split(path)[1];
    const ASIN = splitASIN.substring(0, 10);
    console.log(ASIN);

    createQueryURLs(ASIN);
}

function createQueryURLs(ASIN) {
    alert(`This product's ASIN code is ${ASIN}`)
}















// const modal = document.createElement('dialog');
// modal.setAttribute("style", "height:40%");
// modal.innerHTML =
//     `<iframe id="reviewAnalyzer" style="height:100%"></iframe>
//         <div style="position:absolute; top:0px; left:5px;">  
//             <button>x</button>
//         </div>`;
// document.body.appendChild(modal);
// const dialog = document.querySelector("dialog");
// dialog.showModal();

// const iframe = document.getElementById("reviewAnalyzer");  
// iframe.src = chrome.extension.getURL("index.html");
// iframe.frameBorder = 0;

// dialog.querySelector("button").addEventListener("click", () => {
//     dialog.close();
//  });