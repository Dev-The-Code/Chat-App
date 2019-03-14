var currentTimeStringforCheckout;



	//custom wrote clock
	function updateClock() {
		var currentTime = new Date();
		var currentHours = currentTime.getHours();
		var currentMinutes = currentTime.getMinutes();
		var currentSeconds = currentTime.getSeconds();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		var today = mm + '/' + dd + '/' + yyyy ;
		currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
		currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
		var timeOfDay = (currentHours < 12) ? "AM" : "PM";
		currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
		currentHours = (currentHours == 0) ? 12 : currentHours;
		var currentTimeString = today + "&nbsp;&nbsp;&nbsp;" + currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay ;
        currentTimeStringforCheckout = currentHours + ":" + currentMinutes  + " " + timeOfDay;
        
        
		
	}
	window.onload = updateClock();
	setInterval(function() {
        updateClock();
        
	}, 1000);




   
