function customer(afm, firstname, lastname, username, passwd){
	this.afm=afm;
	this.firstname=firstname;
	this.lastname=lastname;
	this.username=username;
	this.passwd=passwd;
}

function getCustomer(username, passwd) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if ( this.responseText.startsWith("No") ){
			document.getElementById("txtResponse").innerHTML = "Server responded with: "+this.responseText;
			} else {
				window.location.href = "/search-car.html";
			}
		}
	};
	xmlhttp.open("GET","conn_db.php?username="+username +"&password="+passwd,true);
	xmlhttp.send();
	
	document.getElementById("txtResponse").innerHTML = 'request is login with ' +username +" , " +passwd;
}

function createAccount(username, passwd) {
	var afm = document.getElementById("afm").value;
	var firstname = document.getElementById("firstName").value;
	var lastname = document.getElementById("lastName").value;
	//var username = document.getElementById("username").value;
	//var passwd = document.getElementById("password").value;
	var newCustomer = new customer(afm, firstname, lastname, username, passwd);
	var str_json = JSON.stringify(newCustomer);
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var message = JSON.parse(this.responseText);
			document.getElementById("txtResponse").innerHTML = message;
		}
	};
	xmlhttp.open("POST", "conn_db.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + str_json);
	document.getElementById("txtResponse").innerHTML = 'request is sign in with: ' +afm +firstname +lastname + username + passwd;
}

function searchVehicle(licence_plate){
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText.startsWith("[") || this.responseText.startsWith("{")) {
				var array = JSON.parse(this.responseText);
				var temp="<table><tr><th>Licence Plate</th><th>Model</th><th>Fuel Type</th><th>Year</th><th>Condition</th><th>Reward</th><th>Supervisor</th><th>Owner's AFM</th></tr>";
							for (var i=0; i<array.length; i++) {
								temp+="<tr><td>"+array[i].licence_plate+"</td><td>"+array[i].model+"</td><td>"+array[i].fuel_type+"</td><td>"+array[i].year+"</td><td>"+array[i].condition+"</td><td>"+array[i].reward+"</td><td>"+array[i].worker_id+"</td><td>"+array[i].customer_afm+"</td></tr>"; 
							}
							document.getElementById("txtResponse").innerHTML = temp +"</table>";
							//document.getElementById("txtResponse").innerHTML = this.responseText;
			} else {				
				document.getElementById("txtResponse").innerHTML = "Server responded with: "+this.responseText;
			}
		}
	};
	xmlhttp.open("GET","conn_db.php?licence_plate="+licence_plate,true);
	xmlhttp.send();
	
	document.getElementById("txtResponse").innerHTML = 'request is search for vehicle with: '+licence_plate;
}








