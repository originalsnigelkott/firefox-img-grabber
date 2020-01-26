function handleMessage(message) {
    let url = message.url;
    console.log
    switch(message.size) {
        case "both": {
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
    let urlAsArray = url.split('');
    let lastHyphenIndex;
    let lastDotIndex;
    let isDotFound = false;
    for(let i = urlAsArray.length - 1; i > 0; i--) {
        if(urlAsArray[i] == '.' && !isDotFound) {
            lastDotIndex = i;
            isDotFound = true;
        }
        if(urlAsArray[i] == '-') {
            lastHyphenIndex = i;
            break;
        }
    }
    urlAsArray = uralAsArray.splice(lastHyphenIndex, lastDotIndex - lastHyphenIndex);
    let newUrl = urlAsArray.toString();
    return newUrl;
}

function downloadImg(url) {
    browser.downloads.download({url: url});
}


browser.runtime.onMessage.addListener(handleMessage);