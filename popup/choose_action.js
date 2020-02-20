const menuOptions = ['Both', 'Normal', 'Full', 'Reset'];
const imgHoverEffects = 'img:hover { cursor: grab; box-shadow: 0 0 10px 10px green; }'

function listenForClicks() {
    document.addEventListener('click', (e) => {
        function sendCommand(tabs) {
            let action = e.target.textContent.toLowerCase();
            browser.tabs.sendMessage(tabs[0].id, {
                command: action
            });
        }

        function highlightChoice() {
            e.target.classList.add('highlighted');
        }

        function removeHighlights() {
            let buttons = document.querySelectorAll('.button')
            buttons.forEach( function(button) {
                button.classList.remove('highlighted')
            })
        }

        function injectCSS() {
            browser.tabs.insertCSS({code: imgHoverEffects});
        }

        function actionClicked(tabs) {
            removeHighlights();
            highlightChoice();
            injectCSS();
            sendCommand(tabs);
        }
        function reset(tabs){
            browser.tabs.removeCSS({code: imgHoverEffects});
            removeHighlights();
            sendCommand(tabs);
        }

        function reportError(error) {
            console.error(`Could not send mode: ${error}`);
        }

        if (e.target.classList.contains('action')) {
            if(e.target.innerHTML !== 'Reset'){
                browser.tabs.query({active: true, currentWindow: true})
                .then(actionClicked)
                .catch(reportError);
            } else {
                browser.tabs.query({active: true, currentWindow: true})
                .then(reset)
            }
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