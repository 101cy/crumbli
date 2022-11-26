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

updateDefaultPolicy("1:q0");