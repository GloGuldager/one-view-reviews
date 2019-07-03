chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'analyzeReviews') {
        alert("Your reviews have been analyzed");
        // var url = window.location.search;
        // alert(url);
    }
});

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