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
            "condition": { }
        }]
    });

}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
    console.log('matched rule');
});

updateDefaultPolicy("1:q0");