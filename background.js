const AVAILABLE_RESOURCE_TYPES = [
    "main_frame",
    "sub_frame",
    "stylesheet",
    "script",
    "image",
    "font",
    "object",
    "xmlhttprequest",
    "ping",
    "csp_report",
    "media",
    "websocket",
    "other",
  ];


async function takeOverDNT(bool) {
    chrome.privacy.websites.doNotTrackEnabled.get({}, function(dnt) {
        if (dnt.levelOfControl === "controllable_by_this_extension") {
            chrome.privacy.websites.doNotTrackEnabled.set( {"value": bool}, function() {
                if (chrome.runtime.lastError === undefined && dnt === true) {
                    console.log("Could not overwrite enabled DNT");
                } else {
                    console.log("Successfully took control over the browser DNT setting");
                }
            });
        } else {
            if (dnt === true) {
                console.log("Could not overwrite enabled DNT");
            }
        }
    });
}

async function updateDefaultPolicy(policy) {

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules:[{
            "id": 1,
            "priority": 1,
            "action": {
                "type": "modifyHeaders",
                "requestHeaders": [
                    { "header": "DNT", "operation": "set", "value": policy},
                ]
            },
            "condition": { "resourceTypes": AVAILABLE_RESOURCE_TYPES }
        }]
    });

}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
    console.log('matched rule');
});

takeOverDNT(false);
updateDefaultPolicy("1:q0");