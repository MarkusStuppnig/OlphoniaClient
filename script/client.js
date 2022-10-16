const net = require("net");
const crypto = require("crypto");

var socket = new net.Socket();
var user;

function connect(ip, port) {
	socket.connect(port, ip, function() {
		console.log("Connected");
		socket.setTimeout(0);
		return true;
	})
	return false; 
}

function disconnect() {
	if(!socket.destroyed) socket.resetAndDestroy();
	this.user = null;
}

/**
 * @param {string} username username to log in
 * @param {string} password password
 * @param {boolean} register true if you want to register
 */
function login(username, password, register) {
	if(socket.destroyed) return false;
	
	var request = new Object();
	if(register) request.request = "register";
	else request.request = "login";

	request.password = crypto.createHash("SHA256").update(password).digest("hex");
	request.uname= username;

	socket.write(JSON.stringify(request));
	socket.on('data', function(data) {
		if(data.equals('sucessfull')) {
			user = username;
		}
	})
}

function sendMessage(dest, message) {

}
