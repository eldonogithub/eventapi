function loginUser(login) {
    d = new Date();
    now = d.getTime();
    console.log("Logging in user: login=", login, ",time=", now);

    window.aptrinsic('reset')

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

    for (key in login) {
        localStorage.setItem(key, login[key])
    }

    let span = document.getElementById("user")
    span.innerHTML = "";
    let text = document.createTextNode(login.firstName + " " + login.lastName)
    span.appendChild(text)
}

function sendCustomEvents() {
    // Tracking examples with event properties

    console.log("Sending custom events")

    aptrinsic('track', 'Video', { "name": "Welcome Video", "Category": "Onboarding", "Length": 5000, "Launched": true, "Launched date": "2018-03-08T18:11:00Z" });

    // Track search
    aptrinsic('track', 'Search', { "terms": "profile setting how-to", "results": 10, "Category": "Admin" });

    d = new Date()

    aptrinsic("track", "rep", {
        "timestamptz": d.toISOString(),
        "company_name": "eo"
    });
}
