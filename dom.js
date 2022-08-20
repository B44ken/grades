const $ = (e, root) => (root || document).querySelector(e)
const $$ = (e, root) => (root || document).querySelectorAll(e)

var data = new UserData()

// lots of unneccessary adding and removing classes here
const buildCourseList = () => {
	var cardTemplate = $(".course-card-template")
	var cardEntry = $(".course-card-entry")
	// clean up selector?
	var otherCards = $$(".course-card-entry > :not(.course-card-template, .new-course-button)")

	otherCards.forEach(card => card.remove())

	cardTemplate.classList.remove("is-hidden")
	cardTemplate.classList.remove("course-card-template")
	for(var courseName of data.listCourses()) {
		var course = data.getCourse(courseName)	
		const el = cardTemplate.cloneNode(true)
			el.querySelector(".name").textContent = courseName
			el.querySelector(".code").textContent = course.meta.code
			el.querySelector(".percent").textContent = percent(gradeAverage(data.getCourse(courseName).grades))
			
			el.id = courseName

			el.addEventListener("click", (event) => {
				viewCourse(el.id)
			})

			cardEntry.insertBefore(el, cardTemplate)
	}

	cardTemplate.classList.add("is-hidden")
	cardTemplate.classList.add("course-card-template")
}

const viewCourse = (courseName) => {
	var course = data.getCourse(courseName)
	$('.course-details-modal').classList.add("is-active")

	$(".details-name").textContent = courseName
	$(".details-percent").textContent = percent(gradeAverage(course.grades))

	
	$(".details-grades").innerHTML = ""
	for(var grade of course.grades)
		addGrade(grade, course, false)
}

const addGradeClick = (event) => {
	var courseName = $(".details-name").textContent
	var course = data.getCourse(courseName)
	arr = [
		parseInt($("[Placeholder='Earned mark']").value),
		parseInt($("[Placeholder='Max mark']").value),
		$("[Placeholder='Name']").value
	]
	const existingNames = course.grades.map(grade => grade[2])
	if(!(arr[0] && arr[1] && arr[2])) {
		$(".add-grade-warn").textContent = "Please fill in all fields!"
		$(".add-grade-warn").classList.remove("is-hidden")
	} else if(existingNames.includes(arr[2])) {
		$(".add-grade-warn").textContent = "Name is not unique!"
		$(".add-grade-warn").classList.remove("is-hidden")
	} else {
		data.addGrade(arr, courseName)
		viewCourse(courseName)
		$(".add-grade-warn").classList.add("is-hidden")
	}
}

const addGrade = (grade, course) => {
		var gradeEntry = $(".details-grades")
		var name = $(".details-name").textContent
		// innerhtml of user input = xss vulnerability
		gradeEl = document.createElement("div")
		gradeEl.innerHTML += `
		<div class="big-info">${grade[2]}</div>
		<a class="delete-x">x</a>
		<div class="small-info">${grade[0]} / ${grade[1]}</div>
		<div class="small-info">${percent(grade[0] / grade[1])}</div>`
		gradeEl.entryName = grade[2]
		$(".delete-x", gradeEl).id = grade[2]
		$(".delete-x", gradeEl).addEventListener("click", (event) => {
			var gradeName = event.target.id
			data.deleteGrade(gradeName, name)
			viewCourse(name)
		})
		gradeEntry.appendChild(gradeEl)
}

const deleteCourse = (courseName) => {
	data.deleteCourse(courseName)
}


// MODAL INTERACTION

$(".new-course-button").addEventListener("click", event => {
	$(".new-course-modal").classList.add("is-active")
})


$(".add-course-button").addEventListener("click", () => {
	$(".fill-all-warn").classList.add("is-hidden")
	var courseName = $(".course-name-input").value
	var courseCode = $(".course-code-input").value
	var courseCredits = $(".course-credits-input").value
	if(courseName == "" || courseCode == "" || courseCredits == "") {
		$(".fill-all-warn").textContent = "Please fill out all fields!"
		$(".fill-all-warn").classList.remove("is-hidden")
		return
	}
	var courseMeta = {
		code: courseCode,
		credits: courseCredits,
	}
	data.addCourse(courseName, courseMeta)
	$(".new-course-modal").classList.remove("is-active")
	buildCourseList(data.getCourse(courseName))
})

$(".settings-button").addEventListener("click", event => {
	$(".delete-list").innerHTML = ""
	for(var courseName of data.listCourses()) {
		$(".delete-list").innerHTML += 
			`<a onclick="deleteCourse('${courseName}')">${courseName}</a><br>`
	}

	$(".settings-modal").classList.add("is-active")
})

$(".new-course-background").addEventListener("click", event => {
	$(".new-course-modal").classList.remove("is-active")

})

$(".course-details-background").addEventListener("click", event => {
	$(".course-details-modal").classList.remove("is-active")
})

$(".settings-background").addEventListener("click", event => {
	$(".settings-modal").classList.remove("is-active")
})

buildCourseList(data.listCourses())