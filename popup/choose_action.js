const menuOptions = ['Both', 'Normal', 'Full'];
const imgHoverEffects = 'img:hover { cursor: grab; box-shadow: 0 0 5px green; }'

function listenForClicks() {
    document.addEventListener('click', (e) => {
        function sendMode() {
            let action = e.target.textContent.toLowerCase();
            browser.tabs.sendMessage(tabs[0].id, {
                command: action
            });
        }

        function highlightChoice() {
            let popupContent = document.querySelector('#popup-content').children;
            for(let i = 0; i < popupContent.length; i++) {
                popupContent[i].classList.remove('highlighted');
            }
            e.target.classList.add('highlighted');
        }

        function injectCSS() {
            browser.tabs.insertCSS({code: imgHoverEffects})
        }

        function actionClicked() {
            highlightChoice();
            injectCSS();
            sendMode();
        }

        function reportError(error) {
            console.error(`Could not send mode: ${error}`);
        }

        if (e.target.classList.contains('action')) {
            browser.tabs.query({active: true, currentWindow: true})
            .then(actionClicked)
            .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector('#popup-content').classList.add('hidden');
    document.querySelector('#error-content').classList.remove('hidden');
    console.error(`Failed to execute imgcapture content script: ${error.message}`);
}


for (let option of menuOptions) {
    let div = document.createElement('div');
    div.innerHTML = option;
    div.classList.add('button', 'action');
    document.querySelector('#popup-content').appendChild(div);
}
browser.tabs.executeScript({file: '/content_scripts/imgcapture.js'})
.then(listenForClicks)
.catch(reportExecuteScriptError);