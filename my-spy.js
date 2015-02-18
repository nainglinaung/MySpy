﻿/*!
 * MySpy JavaScript Library v1.0.0
 * http://www.myanmarlinks.net/
 *
 * Copyright 2012, Nyan Lynn Htut
 *
 *
 * Date: Wed June 20 22:08:24 2012
 */
var MySpy = function () {};

MySpy.version = "1.0.0";


// Get Client's OS Type
MySpy.getOS = function (param) {
	
	param = param || {};
	
	var pack_ios = param.pack_ios ? true : false;
	
	if (navigator.platform.indexOf("Win") != -1) {
		return "Windows";
	} else if (navigator.platform.indexOf("Linux") != -1){
		return result='Linux';
	}else {
		if (navigator.platform.indexOf("Mac") != -1) {
			return "Mac";
		} else {
			if (navigator.platform.indexOf("iPhone") != -1) {
				return pack_ios ? "iOS" : "iPhone";
			} else {
				if (navigator.platform.indexOf("iPad") != -1) {
					return pack_ios ? "iOS" : "iPad";
				} else {
					if (navigator.platform.indexOf("iPod") != -1) {
						return pack_ios ? "iOS" : "iPod";
					} else {
						if (navigator.appVersion.indexOf("Android") != -1) {
							return "Android";
						}
					}
				}
			}
		}
	}
	return "Other";
};

// Get Client's OS Version
MySpy.getOSVersion = function () {
	var version = "";
	switch (MySpy.getOS()) {
	case "Windows":
		var a = navigator.oscpu ? navigator.oscpu.match(/Windows NT ((\d+\.?)+)/) : navigator.appVersion.match(/Windows NT ((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break;
	case "Linux":
		var parts = navigator.userAgent.split(/\s*[;)(]\s*/);
		var a = parts[2];
		if(a) {
			version = a;
		}
		break;
	case "Mac":
		var a = navigator.oscpu ? navigator.oscpu.match(/Intel Mac OS X ((\d+\.?)+)/) : navigator.appVersion.match(/Intel Mac OS X ((\d+_?)+)/);
		if (a) {
			version = a[1].replace(/_/g, ".");
		}
		break;
	case "Android":
		var a = navigator.appVersion.match(/Android ((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break;
	case "iPhone":
	case "iPod":
		var a = navigator.appVersion.match(/iPhone OS ((\d+_?)+)/);
		if (a) {
			version = a[1].replace(/_/g, ".");
		}
		break;
	case "iPad":
		var a = navigator.appVersion.match(/OS ((\d+_?)+)/);
		if (a) {
			version = a[1].replace(/_/g, ".");
		}
		break
	}
	return version;
};

// Get Client's Browser
MySpy.getBrowser = function () {
	if (navigator.appName.indexOf("Internet Explorer") != -1) {
		if (navigator.cpuClass == "x64") {
			return "IE64";
		}
		return "IE";
	} else {
		if (navigator.appName.indexOf("Opera") != -1) {
			return "Opera";
		} else {
			if (navigator.appName == "Netscape") {
				if (navigator.vendor.indexOf("Apple") != -1) {
					return "Safari";
				} else {
					if (navigator.vendor.indexOf("Google") != -1) {
						return navigator.appVersion.indexOf("Chrome") != -1 ? "Chrome" : "Safari";
					} else {
						if (navigator.userAgent.indexOf("Firefox") != -1) {
							return "Firefox";
						}
					}
				}
			}
		}
	}
	return "Other";
};

// Get Client's Browser Version
MySpy.getBrowserVersion = function () {
	var version = "";
	switch (MySpy.getBrowser()) {
	case "IE":
	case "IE64":
		var a = navigator.appVersion.match(/MSIE ((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break;
	case "Opera":
		var a = navigator.userAgent.match(/Opera\/((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break;
	case "Safari":
		var a = navigator.appVersion.match(/Version\/((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break;
	case "Chrome":
		var a = navigator.appVersion.match(/Chrome\/((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break;
	case "Firefox":
		var a = navigator.userAgent.match(/Firefox\/((\d+\.?)+)/);
		if (a) {
			version = a[1];
		}
		break
	}
	return version;
};

MySpy.getBrowserType = function () {
	var a = 2;
	if (navigator.appVersion.search(/Safari\//) != -1) {
		a = 1;
	}
	return a;
};

// Get Client's Browser Adobe Reader PlugIn Version
MySpy.getAdobeReaderVersion = function () {
	var version = "";
	navigator.plugins.refresh(false);

	if (version.length == 0) {
		if (MySpy.getBrowser() == "IE") {
			try {
				var ActiveXObj = new ActiveXObject("AcroPDF.PDF");
				if (ActiveXObj) {
					version = ActiveXObj.GetVersions().split(",")[0].split("=")[1];
				}
			} catch (j) {}
			
		} else {
			for (var f in navigator.plugins) {
				var plugIns = navigator.plugins[f];
				if (plugIns.name && plugIns.name.indexOf("Adobe Acrobat") == 0) {
					ActiveXObj = plugIns;
					break
				}
			}
			if (ActiveXObj) {
				if (ActiveXObj.version) {
					version = ActiveXObj.version;
				} else {
					var h = ActiveXObj.description.match(/(\d+\.?)+/);
					if (h) {
						version = h[0];
					} else {
						version = "?";
					}
				}
			}
		}
	}
	return version;
};

// Get Client's Browser Adobe Flash Player PlugIn Version
MySpy.getAdobeFlashPlayerVersion = function () {
	var version = "";
	navigator.plugins.refresh(false);
	if (MySpy.getBrowser() == "IE") {
		try {
			var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = c.GetVariable("$version").split(" ")[1].split(",").join(".");
		} catch (d) {}
		
	} else {
		navigator.plugins.refresh(false);
		var plugIn = navigator.plugins["Shockwave Flash"];
		if (plugIn && plugIn.description) {
			version = plugIn.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".");
		}
	}
	return version;
};

//Get Screen Size (Not window size, Not document size)
MySpy.getScreenSize = function(){
	var size,
		w = screen.width,
		h = screen.height;
	size = { 'width' : w, 'height' : h};
	return size;
}

//Get Window Size
MySpy.getWindowSize = function(){
	var size,
		w = window.innerWidth  ? window.innerWidth  : document.documentElement.clientWidth,
		h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
	size = { 'width' : w, 'height' : h};
	return size;
}

MySpy.createElementHtml = function (b, a, d) {
	var c = "<" + b;
	if (a) {
		for (key in a) {
			c += " " + key + "='" + a[key] + "'";
		}
	}
	c += ">";
	if (d) {
		c += d;
	}
	c += "</" + b + ">";
	return c;
};

// Add new Style link at header
MySpy.cssLink = function(file, media) {
	if(!file) {
		return;
	}
	
	var tag = document.createElement("link");
	if(media != undefined) {
		tag.media = media;
	}
	tag.href = file;
	tag.type = "text/css";
	tag.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(tag);
	return document.styleSheets[document.styleSheets.length - 1];
}

// Add new JS link at header
MySpy.jsLink = function(file) {
	if(!file) {
		return;
	}
	
	var tag = document.createElement("script");

	tag.src = file;
	tag.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(tag);
	return document.styleSheets[document.styleSheets.length - 1];
}
