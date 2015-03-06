var imgur = "https://api.imgur.com/oauth2/authorize?client_id=";

function init(data) {
	var client_id = data["client_id"];
	var type = data["type"];
	var callback = data["callback_func"];
}

function login() {
   $(window.open('https://api.imgur.com/oauth2/authorize?client_id=' + 
    client_id + '&response_type=' + type + '&state='));
}

