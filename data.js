const saveLocally = () => {
	localStorage.setItem('userData', JSON.stringify(userData))
}

// todo: firebase?
const saveCloud = () => {
	
}

if(localStorage.userData) {
	var userData = JSON.parse(localStorage.userData)
} else {
	// debug data
	userData = {
			"courses": [ {
				"name": "History",
				"code": "CHW3M",
				"grades": [ [87, 100, "Test B"], [52, 70, "Quiz B"] ]
			}, {
					"name": "Functions",
					"code": "MCR3U",
					"grades": [ [78, 100, "Test A"], [35, 50, "Quiz A"] ]
			} ]
	}
	saveLocally()
}