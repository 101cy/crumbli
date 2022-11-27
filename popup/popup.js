async function submittedDefaultPolicy(defaultPolicy) {
    chrome.storage.local.set({"defaultPolicy": defaultPolicy}, () => {
        console.log("Default Policy set to " + defaultPolicy);
    });
}

var defaultPolicyForm = document.getElementById("defaultPolicyForm");
defaultPolicyForm.onsubmit = (event) => {
    const formData = new FormData(event.target);
    const defaultPolicy = formData.get("defaultPolicy");
    submittedDefaultPolicy(defaultPolicy);
}