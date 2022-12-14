var defaultUser = {
	"id": "0000", // Required for logged in app users
	"email": "admin.user@example.com",
	"firstName": "Admin",
	"lastName": "User",
}

var user = {}

function account_sort(a, b) {
	"use strict";
	if (a["name"] > b["name"]) {
		return 1;
	}
	else if (a["name"] < b["name"]) {
		return -1;
	}
	else {
		return 0;
	}
}

function user_sort(a, b) {
	"use strict";

	if (a["firstName"] > b["firstName"]) {
		return 1;
	}
	else if (a["firstName"] < b["firstName"]) {
		return -1;
	}
	else if (a["lastName"] > b["lastName"]) {
		return 1;
	}
	else if (a["lastName"] < b["lastName"]) {
		return -1;
	}
	else {
		return 0;
	}
}

function custom_sort(a, b) {
	"use strict";

	if (a["date"] > b["date"]) {
		return 1;
	}
	else if (a["date"] < b["date"]) {
		return -1;
	}
	else {
		return 0;
	}
}

function renderUsersTable(arr) {
	"use strict";
	let div = document.createElement("div")
	div.setAttribute("id", "users")
	let h2 = document.createElement("h2")
	h2.textContent = "Users"
	div.appendChild(h2)

	if (arr.length == 0) {
		let span = document.createElement("span")
		span.textContent = "No rows returned"
		div.appendChild(span)
		return div
	}

	let table = document.createElement("table")
	div.appendChild(table)

	arr.sort(user_sort)

	table.classList.add("users_table")
	let thead = document.createElement("thead")
	table.appendChild(thead)
	let thr = document.createElement("tr")
	thead.appendChild(thr)

	let th = document.createElement("th")
	th.appendChild(document.createTextNode("Id"))
	thr.appendChild(th)

	th = document.createElement("th")
	th.appendChild(document.createTextNode("First Name"))
	thr.appendChild(th)

	th = document.createElement("th")
	th.appendChild(document.createTextNode("Last Name"))
	thr.appendChild(th)

	th = document.createElement("th")
	th.appendChild(document.createTextNode("Email"))
	thr.appendChild(th)

	th = document.createElement("th")
	th.appendChild(document.createTextNode("Number of Visits"))
	thr.appendChild(th)

	th = document.createElement("th")
	th.appendChild(document.createTextNode("Action"))
	thr.appendChild(th)

	let tbody = document.createElement("tbody")
	table.appendChild(tbody)

	for (let i = 0; i < arr.length; i++) {
		let tr = document.createElement("tr")
		let td = document.createElement("td")
		td.classList.add("id")
		td.appendChild(document.createTextNode(arr[i].id))
		tr.appendChild(td)

		td = document.createElement("td")
		td.classList.add("firstname")
		td.appendChild(document.createTextNode(arr[i].firstName))
		tr.appendChild(td)

		td = document.createElement("td")
		td.classList.add("lastname")
		td.appendChild(document.createTextNode(arr[i].lastName))
		tr.appendChild(td)

		td = document.createElement("td")
		td.classList.add("email")
		td.appendChild(document.createTextNode(arr[i].email))
		tr.appendChild(td)

		td = document.createElement("td")
		td.classList.add("numberOfVisits")
		td.appendChild(document.createTextNode(arr[i].numberOfVisits))
		tr.appendChild(td)

		button = document.createElement("button")
		button.addEventListener("click", addDeleteUser(arr[i].id, tr))
		button.textContent = "Delete"

		td = document.createElement("td")
		td.classList.add("userAction")
		td.appendChild(button)
		tr.appendChild(td)

		tbody.appendChild(tr)
	}
	return div;
}

function renderAccountsTable(arr) {
	"use strict";
	let div = document.createElement("div")
	div.setAttribute("id", "accounts")
	let h2 = document.createElement("h2")
	h2.textContent = "Accounts"
	div.appendChild(h2)

	if (arr.length == 0) {
		let span = document.createElement("span")
		span.textContent = "No rows returned"
		div.appendChild(span)
		return div
	}

	let table = document.createElement("table")
	div.appendChild(table)

	arr.sort(account_sort)

	table.classList.add("accounts_table")
	let thead = document.createElement("thead")
	table.appendChild(thead)
	let thr = document.createElement("tr")
	thead.appendChild(thr)

	let th1 = document.createElement("th")
	th1.appendChild(document.createTextNode("Id"))
	thr.appendChild(th1)

	let th2 = document.createElement("th")
	th2.appendChild(document.createTextNode("Name"))
	thr.appendChild(th2)

	let th3 = document.createElement("th")
	th3.appendChild(document.createTextNode("Number Of Users"))
	thr.appendChild(th3)

	let tbody = document.createElement("tbody")
	table.appendChild(tbody)

	for (let i = 0; i < arr.length; i++) {
		let tr = document.createElement("tr")
		let td = document.createElement("td")
		td.classList.add("id")
		td.appendChild(document.createTextNode(arr[i].id))
		tr.appendChild(td)

		td = document.createElement("td")
		td.classList.add("name")
		td.appendChild(document.createTextNode(arr[i].name))
		tr.appendChild(td)

		td = document.createElement("td")
		td.classList.add("numberOfUsers")
		td.appendChild(document.createTextNode(arr[i].numberOfUsers))
		tr.appendChild(td)

		tbody.appendChild(tr)
	}
	return div;
}

function getAccounts(event) {
	"use strict";
	var request = new XMLHttpRequest();

	request.open('GET', 'https://api.aptrinsic.com/v1/accounts?filter=&pageSize=&scrollId=&sort=');
	request.setRequestHeader('X-APTRINSIC-API-KEY', "dcafaea2-0c5d-472b-80b1-261bfa1c7bf8")
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			let content = document.getElementById("content")

			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);

			results = JSON.parse(this.responseText)

			if (Object.hasOwn(results, "accounts")) {
				table = renderAccountsTable(results['accounts'])
				accounts = document.getElementById("accounts")
				if (accounts != null) {
					content.replaceChild(table, accounts)
				}
				else {
					content.appendChild(table)
				}
			}
		}
	};

	request.send();
}

function getUsers(event) {
	"use strict";
	var request = new XMLHttpRequest();

	request.open('GET', 'https://api.aptrinsic.com/v1/users?filter=&pageSize=&scrollId=&sort=');
	request.setRequestHeader('X-APTRINSIC-API-KEY', "dcafaea2-0c5d-472b-80b1-261bfa1c7bf8")

	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);

			results = JSON.parse(this.responseText)

			if (Object.hasOwn(results, "users")) {
				table = renderUsersTable(results['users'])
				users = document.getElementById("users")
				if (users != null) {
					content.replaceChild(table, users)
				}
				else {
					content.appendChild(table)
				}
			}
		}
	};

	request.send(); var request = new XMLHttpRequest();

}

function addDeleteUser(id, row) {
	"use strict";

	return function deleteUser(event) {
		var request = new XMLHttpRequest();

		request.open('DELETE', 'https://api.aptrinsic.com/v1/users/' + id + '?hardDelete=true');
		request.setRequestHeader('X-APTRINSIC-API-KEY', "dcafaea2-0c5d-472b-80b1-261bfa1c7bf8")

		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				console.log('Status:', this.status);
				console.log('Headers:', this.getAllResponseHeaders());
				console.log('Body:', this.responseText);

				if (this.status == 200) {
					row.parentNode.removeChild(row)
				}
			}
		};

		request.send();
	}

}
function addDeleteCustomEvent(id, row) {
	return function deleteUser(event) {
		var request = new XMLHttpRequest();

		request.open('DELETE', 'https://api.aptrinsic.com/v1/events/custom/' + id + '?hardDelete=true');
		request.setRequestHeader('X-APTRINSIC-API-KEY', "dcafaea2-0c5d-472b-80b1-261bfa1c7bf8")

		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				console.log('Status:', this.status);
				console.log('Headers:', this.getAllResponseHeaders());
				console.log('Body:', this.responseText);

				if (this.status == 200) {
					row.parentNode.removeChild(row)
				}
			}
		};

		request.send();
	}
}
function renderCustomTable(arr) {
	"use strict";
	let columns = [ ]

	let div = document.createElement("div")
	div.setAttribute("id", "customEvents")
	let h2 = document.createElement("h2")
	h2.textContent = "Custom Events"
	div.appendChild(h2)

	if (arr.length == 0) {
		let span = document.createElement("span")
		span.textContent = "No rows returned"
		div.appendChild(span)
		return div
	}

	let table = document.createElement("table")
	div.appendChild(table)

	arr.sort(custom_sort)

	table.classList.add("custom_table")
	let thead = document.createElement("thead")
	table.appendChild(thead)
	let thr = document.createElement("tr")
	thead.appendChild(thr)

	let obj = arr[0]
	for (let item in obj) {
		if (typeof obj[item] == "string") {
			let th = document.createElement("th")
			th.appendChild(document.createTextNode(item))
			thr.appendChild(th)
		}
		else {
			let th = document.createElement("th")
			th.appendChild(document.createTextNode(item))
			thr.appendChild(th)
		}
	}

	let tbody = document.createElement("tbody")
	table.appendChild(tbody)

	for (let i = 0; i < arr.length; i++) {
		let obj = arr[i]
		let tr = document.createElement("tr")
		let parity = i % 2 == 0 ? "even" : "odd";
		tr.classList.add(parity);

		for (let item in obj) {
			if (typeof obj[item] == "string") {
				let td = document.createElement("td")
				td.classList.add("custom")
				td.classList.add("custom-string")
				td.classList.add("custom-" + item)
				td.appendChild(document.createTextNode(obj[item]))
				tr.appendChild(td)
			}
			else if (typeof obj[item] == "number") {
				if (item == "date") {
					let td = document.createElement("td")
					td.classList.add("custom")
					td.classList.add("custom-date")
					td.classList.add("custom-" + item)
					let d = new Date(obj[item]);
					let fd = [d.getFullYear(), d.getMonth() + 1, d.getDay()].join('/') + " " + [d.getHours(), d.getMinutes(), d.getSeconds() ].join(':')
					td.appendChild(document.createTextNode(fd))
					tr.appendChild(td)
				}
				else {
					let td = document.createElement("td")
					td.classList.add("custom")
					td.classList.add("custom-number")
					td.classList.add("custom-" + item)
					td.appendChild(document.createTextNode(obj[item]))
					tr.appendChild(td)
				}
			}
			else {
				let td = document.createElement("td")
				td.classList.add("custom")
				td.classList.add("custom-object")
				td.classList.add("custom-" + item)
				td.appendChild(document.createTextNode(JSON.stringify(obj[item])))
				tr.appendChild(td)
			}
		}

		tbody.appendChild(tr)
	}
	return div;
}

function getCustomEvents() {
	"use strict";
	const log = document.querySelector('.event-log');

	function handleEvent(e) {
		log.textContent = `${log.textContent}${e.type}: ${e.loaded} bytes transferred\n`;
	}

	request = new XMLHttpRequest();
	let epoch = new Date(0)

	d = new Date()
	d.setUTCHours(0)
	d.setUTCMinutes(0)
	d.setUTCSeconds(0)
	let timestamp = Math.floor((d - epoch))

	request.open('GET', `https://api.aptrinsic.com/v1/events/custom?dateRangeEnd=&dateRangeStart=${timestamp}&filter=&pageSize=&scrollId=&sort=`);
	request.setRequestHeader('X-APTRINSIC-API-KEY', "dcafaea2-0c5d-472b-80b1-261bfa1c7bf8")

	request.addEventListener('loadstart', handleEvent);
	request.addEventListener('load', handleEvent);
	request.addEventListener('progress', handleEvent);
	request.addEventListener('error', handleEvent);
	request.addEventListener('abort', handleEvent);

	request.addEventListener('loadend', function (e) {
		log.textContent = `${log.textContent}${e.type}: ${e.loaded} bytes transferred\n`;

		if (this.readyState === this.DONE) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);

			if (this.status == 200) {
				results = JSON.parse(this.responseText)

				if (Object.hasOwn(results, "customEvents")) {
					table = renderCustomTable(results['customEvents'])
					users = document.getElementById("customEvents")
					if (users != null) {
						content.replaceChild(table, users)
					}
					else {
						content.appendChild(table)
					}
				}
			}
		}
	});

	request.send();
}

function loaded() {
	"use strict";
	user = defaultUser

	let span = document.getElementById("user")
	span.innerHTML = "";
	let text = document.createTextNode(user.firstName + " " + user.lastName)
	span.appendChild(text)

	window.aptrinsic('reset')

	// remove login information from the session
	for (let key in defaultUser) {
		sessionStorage.removeItem(key)
	}

	let accounts = document.getElementById("get-accounts")
	accounts.addEventListener('click', getAccounts);

	let users = document.getElementById("get-users")
	users.addEventListener('click', getUsers);

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
