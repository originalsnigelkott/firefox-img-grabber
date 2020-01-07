function listenForClicks() {
    document.addEventListener("click", (e) => {
        function actionToExecute(action) {
            switch(action) {
                case "Both": {
                    return "both";
                }
                case "Normal": {
                    return "normal";
                }
                case "Full": {
                    return "full";
                }
            }
        }

        function sendMode(tabs) {
            let action = actionToExecute(e.target.textContent);
            browser.tabs.sendMessage(tabs[0].id, {
                command: action
            });
        }

        function reportError(error) {
            console.error(`Could not send mode: ${error}`);
        }

        if (e.target.classList.contains("action")) {
            browser.tabs.query({active: true, currentWindow: true})
            .then(sendMode)
            .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute imgcapture content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/imgcapture.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);