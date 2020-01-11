const menuOptions = ['Both', 'Normal', 'Full'];

function listenForClicks() {
    document.addEventListener('click', (e) => {
        function actionToExecute(action) {
            switch(action) {
                case 'Both': {
                    return 'both';
                }
                case 'Normal': {
                    return 'normal';
                }
                case 'Full': {
                    return 'full';
                }
            }
        }

        function sendMode() {
            let action = actionToExecute(e.target.textContent);
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

        function actionClicked() {
            sendMode();
            highlightChoice();
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


for (let i = 0; i < menuOptions.length; i++) {
    let div = document.createElement('div');
    div.innerHTML = menuOptions[i];
    div.classList.add('button', 'action');
    if (menuOptions[i] === 'Normal') {
        div.classList.add('button', 'action');
    } else {
        div.classList.add('button', 'action', 'unavailable-option')
    }
    document.querySelector('#popup-content').appendChild(div);
}
browser.tabs.executeScript({file: '/content_scripts/imgcapture.js'})
.then(listenForClicks)
.catch(reportExecuteScriptError);