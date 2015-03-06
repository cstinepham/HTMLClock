function redirect_init() {
  // First, parse the query string
  var params = {}, queryString = location.hash.substring(1),
      regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }


	// store token and call callback
	window.localStorage.setItem('access_token', params['access_token']);
	// window.opener or event listener; pass through callback using window.opener
	window.opener.callback(params['access_token']);
	//redirect.html gets closed
	window.close();
	
}