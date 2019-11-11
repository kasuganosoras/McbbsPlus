var isOpenedEmoji = false;
function simpleAjax(url, method, isAsync, data, callback) {
	var headers = new Headers();
	if(method.toLowerCase() == "post") {
		headers.append("Content-Type", "application/x-www-form-urlencoded");
	}
	fetch(url, {
		method: method,
		body: data,
		headers: headers,
		referrerPolicy: "origin"
	}).then(function(response) {
		return response.text().then(function(text) {
			callback({
				text: text,
				ok: response.ok,
				status: response.status
			});
		});
	});
}
window.onload = function() {
	injectJs();
	var fastpostbar = document.querySelector("#f_pst .pnpost");
	var editorboxbar = document.querySelector("#editorbox .pnpost");
	if(fastpostbar != null || editorboxbar != null) {
		if(fastpostbar != null) {
			fastpostbar.innerHTML += `
				<span class='y' style='margin-right:8px;'><a href='javascript:;' id='moreEmoji'>更多表情</a></span>
				<div id='imagesDiv'></div>
			`;
		} else {
			editorboxbar.innerHTML += `
				<span class='y' style='margin-right:8px;'><a href='javascript:;' id='moreEmoji'>更多表情</a></span>
				<div id='imagesDiv'></div>
			`;
		}
		moreEmoji.onclick = function(e) {
			if(isOpenedEmoji) {
				imagesDiv.style.display = 'none';
				isOpenedEmoji = false;
			} else {
				simpleAjax(
					'https://cdn.zerodream.net/images/emoji/',
					'get',
					true,
					null,
					function(result) {
						if(result.ok) {
							imagesDiv.innerHTML = result.text;
							imagesDiv.style.display = 'block';
							isOpenedEmoji = true;
						} else {
							alert("无法加载表情列表，请稍后重试。");
						}
					}
				);
			}
		};
	}
}
function injectJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
}