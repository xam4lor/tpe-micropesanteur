var min_version = 57; // 57
var background_image_display = true; // true -> affichage de l'image de fond sur les titre

function get_browser() {
	var ua = navigator.userAgent,
		tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return {
			name: 'IE',
			version: (tem[1] || '')
		};
	}

	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR|Edge\/(\d+)/)
		if (tem != null) {
			return {
				name: 'Opera',
				version: tem[1]
			};
		}
	}

	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1]);
	}
	return {
		name: M[0],
		version: M[1]
	};
}


function calcStyleBackgroundImg() {
	var navigator = get_browser();

	if(navigator.name.toString() == "Firefox".toString() && navigator.version.toString() < min_version.toString()) {
		background_image_display = false;
	}
}

calcStyleBackgroundImg();


if(background_image_display) {
	$('head').append('<link rel="stylesheet" type="text/css" href="/css/image-css.css">');
}
else {
	$('head').append('<link rel="stylesheet" type="text/css" href="/css/no-image-css.css">');
}
