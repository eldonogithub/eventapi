var defaultUser ={
    "id": "", // Required for logged in app users
    "email": "",
    "firstName": "",
    "lastName": "",
}

var user={}

function print( node, str, value ) {
	"use strict";
	node.appendChild(document.createTextNode(str + value ));
	node.appendChild(document.createElement("br"));
}

function loaded() {
	"use strict";
    for( let key in defaultUser ) {
        user[key]=sessionStorage.getItem(key)
    }

	let span=document.getElementById("user")
	span.innerHTML="";
	let text=document.createTextNode(user.firstName + " " + user.lastName)
	span.appendChild(text)

	let sendEvents = document.getElementById("send-custom-events")
	sendEvents.addEventListener('click', sendCustomEvents);

    sendEvents = document.getElementById("send-custom-jump-item")
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
