(function() {
    if(window.hasRun) {
        return;
    };
    window.hasRun = true;
    let mode;
    let isListeningForClicks = false;

    function listenForClicks() {
        if (!isListeningForClicks) {
            document.addEventListener("click", clickHandler);
            isListeningForClicks = true; 
        }
    }

    function clickHandler(e) {
        if(e.target.tagName === "IMG") {
            captureImg(e);
        }
    }

    function removeListenForClicks() {
        document.removeEventListener("click", clickHandler);
        isListeningForClicks = false;
    }

    function captureImg(e) {
        let targetUrl = e.target.src;
        browser.runtime.sendMessage({url: targetUrl, size: mode});
    }
    
    browser.runtime.onMessage.addListener((message) => {
        if(message.command !== 'reset') {
            mode = message.command;
            listenForClicks()
        } else if(message.command === 'reset') {
            removeListenForClicks();
        }        
    });
}
)();