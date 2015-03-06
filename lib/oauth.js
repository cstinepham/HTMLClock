var imgur = "https://api.imgur.com/oauth2/authorize?client_id=";

init(data) {
	var client_id = data["client_id"];
	var type = data["type"];
	var callback = data["callback_func"];
	var imgur += client_id + "&response_type=" + type;
}

login() {
	window.open(imgur, "", width=500, height=500)

}

