function loginUser(login) {
    let d = new Date();
    let now = d.getTime();
    console.log("Logging in user: login=", login, ",time=", now);

    //passing user and account objects:
    aptrinsic("identify",
        {
            ...login,
            //User Fields
            "signUpDate": now, //unix time in ms
        },
        {
            //Account Fields
            "id": "House Stark", //Required
            "name": "House Stark - Winterfell",
            "website": window.location.href
        });

    for (let key in login) {
        sessionStorage.setItem(key, login[key])
    }

    let span = document.getElementById("user")
    span.innerHTML = "";
    let text = document.createTextNode(login.firstName + " " + login.lastName)
    span.appendChild(text)
}

function sendCustomEvents() {
    // Tracking examples with event properties

    aptrinsic('track', 'Video', { "name": "Welcome Video", "Category": "Onboarding", "Length": 5000, "Launched": true, "Launched date": "2018-03-08T18:11:00Z" });

    // Track search
    aptrinsic('track', 'Search', { "terms": "profile setting how-to", "results": 10, "Category": "Admin" });
}

function sendSessionEvent() {
    let d = new Date()

    console.log("Sending Session Event")

    aptrinsic("track", "session", {
        "timestamptz": d.toISOString(),
        "company_name": "eo"
    });
}
function sendRepEvent() {
    let d = new Date()

    console.log("Sending Rep Event")

    aptrinsic("track", "rep", {
        "timestamptz": d.toISOString(),
        "company_name": "eo"
    });
}

function sendVaultAccountEvent() {
    let d = new Date()

    console.log("Sending Vault Account Event")

    aptrinsic("track", "vault_account", {
        "timestamptz": d.toISOString(),
        "company_name": "eo"
    });
}

function sendJumpPointEvent() {
    let d = new Date()

    console.log("Sending Jump Point Event")

    aptrinsic("track", "jumppoint", {
        "timestamptz": d.toISOString(),
        "company_name": "eo"
    });
}

function sendJumpItem()  {
    "use strict";

    console.log("Sending jump item event")

    let d = new Date()

    aptrinsic("track", "jump_item", {
        "timestamptz": d.toISOString(),
        "company_name": "eo"
    });

}