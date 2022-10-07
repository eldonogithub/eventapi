var defaultUser ={
    "id": "", // Required for logged in app users
    "email": "",
    "firstName": "",
    "lastName": "",
}

var user={}

function print( node, str, value ) {
	"use string";
	node.appendChild(document.createTextNode(str + value ));
	node.appendChild(document.createElement("br"));
}

function loaded() {
	"use string";
    for( key in defaultUser ) {
        user[key]=localStorage.getItem(key)
    }

	span=document.getElementById("user")
	span.innerHTML="";
	text=document.createTextNode(user.firstName + " " + user.lastName)
	span.appendChild(text)

	sendEvents = document.getElementById("send-custom-events")
	sendEvents.addEventListener('click', sendCustomEvents);
}
