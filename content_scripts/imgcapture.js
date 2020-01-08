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
            }
        });   
    }

    function captureNormalImg(e) {
        let targetUrl = e.target.src;
        browser.runtime.sendMessage({url: targetUrl, size: mode});
        console.log("Message sent");
        console.log(mode);
    }

    window.onload = listenForClicks();

    browser.runtime.onMessage.addListener((message) => {
        mode = message.command;
    });
}
)();