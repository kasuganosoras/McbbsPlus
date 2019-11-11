function selimage(img) {
	try {
		if(document.getElementById('e_iframe') != null && document.getElementById('e_textarea') != null) {
			e_iframe.contentWindow.document.body.innerHTML += '<img src="' + img + '" border="0" alt="" style="max-width:400px">';
			e_textarea.value += '[img]' + img + '[/img]';
		} else if(document.getElementById('fastpostmessage') != undefined) {
			fastpostmessage.value += '[img]' + img + '[/img]';
		}
	} catch(e) {
		console.log(e);
	}
}