//for search.html use geolocation to get LAT and Long of users current location and display it on the screen
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		document.getElementById("status").innerHTML="Geolocation is not supported by this browser.";
	}
}
//display the coordinates of the current location to the screen 
function showPosition(position) {
	document.getElementById("status").innerHTML = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;		
}
//if not able to retrevie coordinates, then display the following error depending on the case of the error
function showError(error) {
	var msg = "";
	switch(error.code) {
		case error.PERMISSION_DENIED:
			msg = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			msg = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			msg = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			msg = "An unknown error occurred."
			break;
	}
	document.getElementById("status").innerHTML = msg;
}

//individual item displayed on map for individual_sample.html
function loadMap(){
	// create the map and load it into the div with id="mymap"
	var mymap = L.map('storeMapBox');
	// use the OpenStreetMaps tiles
	L.tileLayer(
		'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
		}
	).addTo(mymap);

	// centre the map Patria
	mymap.setView([43.64555,-79.3964642], 25);
	L.marker([43.6455508,-79.396464])
		.addTo(mymap)
}

//loadMap function that loads the map canvas on to the results_sample.html 
function loadMapResults(){
	// create the map and load it into the div with id="mymap"
	var mymap = L.map('mapBox');
	// use the OpenStreetMaps tiles
	L.tileLayer(
		'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
		}
	).addTo(mymap);

	// centre the map around downtown toronto
	mymap.setView([43.6574066,-79.4040809], 14);

	// add a marker to the map for results 1
	L.marker([43.6554, -79.4040809])
		.addTo(mymap)
		.bindPopup("<b><a href='individual_sample.html'> IQ Food</a> Best Canadian Food! Price Range: $$$</b>");

	// add a marker to the map
	L.marker([43.6680369,-79.3954026])
		.addTo(mymap)
		.bindPopup("<b><a href='individual_sample.html'>La Cart</a> Best French Cuisine! Price Range: $$$$</b>");

	// add a marker to the map
	L.marker([43.6455508,-79.3986582])
		.addTo(mymap)
		.bindPopup("<b><a href='individual_sample.html'>IQ Food</a> Best Canadian Food! Price Range: $$</b>");

	// add a marker to the map
	L.marker([43.65609, -79.40276])
		.addTo(mymap)
		.bindPopup("<b><a href='individual_sample.html'>Patria</a> Best Italian Cuisine! Price Range: $$$$</b>");


	// create a blank pop-up for later use
	var popup = L.popup();
	// display a popup when the user clicks on the map
	function onMapClick(e) {
		popup.setLatLng(e.latlng)
		     .setContent("You clicked the map at " + e.latlng.toString())
		     .openOn(mymap);
	}
	mymap.on('click', onMapClick);
}

//validate the registration page by checking if the fields are filled 
//and if the contain the correct value type
function validateRegister(f){
	var emailM, fNameM,lNameM, passM;

	//validate email field 
	var x = f.Email.value;
	var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (x == ""){
		emailM = "E-mail is empty.";
	}else if(atpos<1 || dotpos<atpos || dotpos>=x.length) {
        emailM = "Not valid e-mail.";
    }
	
	//validate first name
	var letters = /^[a-zA-Z]+$/;
	if (f.firstName.value == ""){
		fNameM = "First name is empty.";
	}else if(!f.firstName.value.match(letters)){
		fNameM = "Not a valid name.";
	}

	//validate last name
	if (f.lastName.value == ""){
		lNameM = "Last name is empty.";
	}else if(!f.lastName.value.match(letters)){
		lNameM = "Not a valid name.";
	}
	
	//validate password
	if (f.password.value == ""){
		passM = "Password is empty.";
	}else if(f.password.value.length <= 4){
		passM = "Password must be more than 4 characters.";
	}
	//display the output value for each field 
	document.getElementById("emailField").innerHTML = emailM;
	document.getElementById("firstNField").innerHTML = fNameM;
	document.getElementById("lastNField").innerHTML = lNameM;
	document.getElementById("passwordField").innerHTML = passM;

	if(emailM.length == 0 && fNameM == 0 && lNameM ==0 && passM ==0){
		return true;
	}
	return false;
}

//validate the login page by checking if the fields are filled 
function validateLogin(f){
	//validate username field 
	if (f.username.value == ""){
		document.getElementById("userNameMissing").innerHTML = "Username is missing."
	} 
	//validate password field 
	if (f.password.value == ""){
		document.getElementById("passwordMissing").innerHTML = "Password is missing."
	}
	//check if either field is empty and return false otherwise there are no errors on this form 
	if(f.username.va == "" ||f.password.value == ""){
		return false
	}
}
