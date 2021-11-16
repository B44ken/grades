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
				"grades": [ [87, 100, 1], [52, 70, 1] ]
			}, {
					"name": "Functions",
					"code": "MCR3U",
					"grades": [ [78, 100, 1], [35, 50, 1] ]
			} ]
	}
	saveLocally()
}
