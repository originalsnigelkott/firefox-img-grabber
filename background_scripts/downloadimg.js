function handleMessage(message) {
    let url = message.url;
    switch(message.size) {
        case "both": {
            downloadImg(url)
            downloadImg(getFullSizeUrl(url));
            break;
        }
        case "normal": {
            downloadImg(url)
            break;
        }
        case "full": {
            downloadImg(getFullSizeUrl(url));
            break;
        }
    }
    browser.downloads.download({url: message.url})
}

function getFullSizeUrl(url){
    let lastHyphenIndex = url.lastIndexOf('-');
    let lastDotIndex = url.lastIndexOf('.');
    let urlAsArray = url.split('');
    urlAsArray.splice(lastHyphenIndex, (lastDotIndex - lastHyphenIndex));
    return urlAsArray.join('');
}

function downloadImg(url) {
    browser.downloads.download({url: url});
}


browser.runtime.onMessage.addListener(handleMessage);