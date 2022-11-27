async function submittedDefaultPolicy(defaultPolicy) {
    chrome.storage.local.set({"defaultPolicy": defaultPolicy}, () => {
        console.log("Default Policy set to " + defaultPolicy);
    });
}

const defaultPolicyForm = document.getElementById("defaultPolicyForm");
defaultPolicyForm.onsubmit = (event) => {
    const formData = new FormData(event.target);
    const defaultPolicy = formData.get("defaultPolicy");
    submittedDefaultPolicy(defaultPolicy);
    window.close();
}

function getActiveDefaultPolicy() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["defaultPolicy"], (data) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(data.defaultPolicy);
        });
    });
}

async function setChecked(defaultPolicy) {
    const selectedRadio = document.getElementById("RADIO:" + defaultPolicy);
    if (selectedRadio === null) {
        return;
    }
    selectedRadio.setAttribute("checked", true);
}

function init() {
    getActiveDefaultPolicy().then(defaultPolicy => {
        setChecked(defaultPolicy);
    });
}

init();