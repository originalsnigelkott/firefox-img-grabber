(function() {
    if(window.hasRun) {
        return;
    };
    window.hasRun = true;
    let mode;

    function listenForClicks() {
        document.addEventListener("click", (e) => {
            if(e.target.tagName === "IMG") {
                captureImg(e);
            }
        });   
    }

    function captureImg(e) {
        let targetUrl = e.target.src;
        browser.runtime.sendMessage({url: targetUrl, size: mode});
        console.log(`This is the mode sent: ${mode}`)
    }

    window.onload = listenForClicks();
    
    browser.runtime.onMessage.addListener((message) => {
        mode = message.command;
        console.log(`This is the mode recived: ${mode}`)
    });
}
)();