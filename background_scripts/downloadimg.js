function handleMessage(message) {
    switch(message.size) {
        case "both": {
            break;
        }
        case "normal": {
            downloadImg(message.url)
            break;
        }
        case "full": {
            break;
        }
    }
    browser.downloads.download({url: message.url})
}

function getFullSizeUrl(){

}

function downloadImg(url) {
    browser.downloads.download({url: url})
}


browser.runtime.onMessage.addListener(handleMessage);

//66 ska med