function setChecked() {
    chrome.storage.local.get(["defaultPolicy"], (defaultPolicy) => {
        const selectedRadio = document.getElementById("RADIO:" + defaultPolicy);
        if (selectedRadio === null) {
            return;
        }
        selectedRadio.setAttribute("checked", true);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setChecked();
});

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