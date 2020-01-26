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

    function setMouseHoverIcon() {
        let css = 'img:hover { cursor: grab; box-shadow: 0 0 5px red; }';
        let sheet = window.document.styleSheets[0];
        sheet.insertRule(css, sheet.cssRules.length)
    }

    window.onload = listenForClicks();
    setMouseHoverIcon();

    browser.runtime.onMessage.addListener((message) => {
        mode = message.command;
        console.log(`This is the mode recived: ${mode}`)
    });
}
)();