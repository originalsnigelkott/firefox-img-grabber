(function() {
    if(window.hasRun) {
        return;
    };
    window.hasRun = true;

    let mode = "both";

    function listenForClicks() {
        document.addEventListener("click", (e) => {
            if(e.target.tagName === "IMG") {
                captureNormalImg(e)
                /*switch(mode) {
                    case "both": {
                        captureNormalImg(e);
                        captureFullImg(e);
                        break;
                    }
                    case "normal": {
                        captureNormalImg(e);
                        break;
                    } 
                    case "full": {
                        captureFullImg(e);
                        break;
                    }
                }*/
            }
        });   
    }

    function captureNormalImg(e) {
        let targetUrl = e.target.src;
        browser.runtime.sendMessage({url: targetUrl, size: mode});
    }

    function captureFullImg(e) {
        console.log("Clicked and capturing full size")
    }

    window.onload = listenForClicks();

    browser.runtime.onMessage.addListener((message) => {
        mode = message.command;
    });
}
)();