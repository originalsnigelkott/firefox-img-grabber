(function() {
    if(window.hasRun) {
        return;
    };
    window.hasRun = true;
    let mode;

    function listenForClicks() {
        document.addEventListener("click", clickHandler);   
    }

    function clickHandler(e) {
        if(e.target.tagName === "IMG") {
            captureImg(e);
        }
    }

    function removeListenForClicks() {
        document.removeEventListener("click", clickHandler);
        console.log("listener removed")
    }

    function captureImg(e) {
        let targetUrl = e.target.src;
        browser.runtime.sendMessage({url: targetUrl, size: mode});
    }

    window.onload = listenForClicks();
    
    browser.runtime.onMessage.addListener((message) => {
        if(message.command !== 'reset') {
            mode = message.command;
        } else if(message.command === 'reset') {
            removeListenForClicks();
        }        
    });
}
)();