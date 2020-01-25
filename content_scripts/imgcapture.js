(function() {
    if(window.hasRun) {
        return;
    };
    window.hasRun = true;
    let mode;

    function listenForClicks() {
        document.addEventListener("click", (e) => {
            if(e.target.tagName === "IMG") {
                switch(mode){
                    case 'both':
                        break;
                    case 'normal':
                        captureNormalImg(e)
                        break;
                    case 'full':
                        break;
                }
            }
        });   
    }

    function captureNormalImg(e) {
        let targetUrl = e.target.src;
        browser.runtime.sendMessage({url: targetUrl, size: mode});
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
    });
}
)();