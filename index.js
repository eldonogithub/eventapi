var defaultUser = {
    "id": "9999", // Required for logged in app users
    "email": "jon.snow@example.com",
    "firstName": "Jon",
    "lastName": "Snow",
}
var login = {}

var allusers = {
    "9999": {
        "id": "9999", // Required for logged in app users
        "email": "jon.snow@example.com",
        "firstName": "Jon",
        "lastName": "Snow",
    },
    "8888": {
        "id": "8888", // Required for logged in app users
        "email": "bran.stark@example.com",
        "firstName": "Bran",
        "lastName": "Stark",
    },
    "7777": {
        "id": "7777", // Required for logged in app users
        "email": "sansa.stark@example.com",
        "firstName": "Sansa",
        "lastName": "Stark",
    },
    "6666": {
        "id": "6666", // Required for logged in app users
        "email": "arya.stark@example.com",
        "firstName": "Arya",
        "lastName": "Stark",
    },
    "5555": {
        "id": "5555", // Required for logged in app users
        "email": "robb.stark@example.com",
        "firstName": "Robb",
        "lastName": "Stark",
    },
}

function updateUser(event) {
	"use strict";
    let id = event.target.value;

    if (id in allusers) {
        login = allusers[id]
        loginUser(login)
    }
}

function populateForm() {
	"use strict";
    let docFrag = document.createDocumentFragment()
    let select = document.getElementById("user-select")

    for (let id in allusers) {
        let user = allusers[id]
        let option = document.createElement("option")
        let text = document.createTextNode(user["firstName"] + " " + user["lastName"])
        option.setAttribute("value", user["id"])
        if (Object.hasOwn(login, "id")) {
            if (login["id"] == id) {
                option.selected = true
            }
            else {
                option.selected=false
            }
        }
        option.appendChild(text)
        docFrag.appendChild(option)
    }

    select.appendChild(docFrag)
    select.addEventListener('input', updateUser);
}

function loaded() {
	"use strict";
    // attempt to get the current logged in user
    for (let key in defaultUser) {
        login[key] = sessionStorage.getItem(key)
    }

    // Is a user already logged in?
    if (login["id"] == null) {
        login = defaultUser // login with the default user
    }

    loginUser(login)

    populateForm()

    let sendEvents = document.getElementById("send-custom-jump-item")
	sendEvents.addEventListener('click', sendJumpItem);

    sendEvents = document.getElementById("send-custom-session")
	sendEvents.addEventListener('click', sendSessionEvent);

    sendEvents = document.getElementById("send-custom-rep")
	sendEvents.addEventListener('click', sendRepEvent);

    sendEvents = document.getElementById("send-custom-vault-account")
	sendEvents.addEventListener('click', sendVaultAccountEvent);

    sendEvents = document.getElementById("send-custom-jumppoint")
	sendEvents.addEventListener('click', sendJumpPointEvent);
}
