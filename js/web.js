
	"use strict";

	function initSSO () {
		return new Promise((resolve, reject) => {
			let webview = new xEl("webview", { src: "https://login.eveonline.com/Account/LogOff?ReturnUrl=https%3A%2F%2Flogin.eveonline.com%2Foauth%2Fauthorize%2F%3Fclient_id%3DeveLauncherTQ%26lang%3Den%26response_type%3Dcode%26redirect_uri%3Dhttps%3A%2F%2Flogin.eveonline.com%2Flauncher%3Fclient_id%3DeveLauncherTQ%26scope%3DeveClientToken%20user" });
				webview.on("did-finish-load", e => {
					if(webview.getElement().src.slice(-4) == "eula")
						webview.getElement().classList.add("eula");
					else
						webview.getElement().classList.remove("eula");
					if(webview.getElement().src.slice(0, 66) == "https://login.eveonline.com/launcher?client_id=eveLauncherTQ&code=")
						getSSO(webview.getElement().src.slice(66)).then(e => webview.destroy() || e).then(resolve);
				});
			new xEl($("#container")).append(webview);
		});
	}

	function getSSO (code) {
		return fetch("https://client.eveonline.com/launcher/en/SSOVerifyUser", { method: "POST", headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }), body: "authCode=" + code })
			.then(res => res.json());
	}

	window.addEventListener("load", e => Promise.resolve()
		.then(e => localStorage.load("sso") || initSSO().then(e => localStorage.save("sso", e) || e))
		.then(e => console.log(e))
	);