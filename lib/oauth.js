var imgur = "https://api.imgur.com/oauth2/authorize?client_id=";
var client_id;
var type;
var callback;

function init(data) {
	 client_id = data["client_id"];
	 type = data["type"];
	 callback = data["callback_func"];
}

function login() {
   $(window.open('https://api.imgur.com/oauth2/authorize?client_id=' + 
    client_id + '&response_type=' + type + '&state='));
}

