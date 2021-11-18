const $ = (e, root) => (root || document).querySelector(e)
const $$ = (e, root) => (root || document).querySelectorAll(e)

// lots of unneccessary adding and removing classes here
const buildCourseList = (userData) => {
	var cardTemplate = $(".course-card-template")
	var cardEntry = $(".course-card-entry")
	// clean up selector?
	var otherCards = document.querySelectorAll(".course-card-entry > :not(.course-card-template, .new-course-button)")

	otherCards.forEach(card => card.remove())

	cardTemplate.classList.remove("is-hidden")
	cardTemplate.classList.remove("course-card-template")
	for(var course of userData.courses) {
	const el = cardTemplate.cloneNode(true)
		el.querySelector(".name").textContent = course.name
		el.querySelector(".code").textContent = course.code
		el.querySelector(".percent").textContent = percent(gradeAverage(course.grades))
		
		el.courseCode = course.code

		el.addEventListener("click", (event) => {
			var courseData = userData.courses.find(course => course.code == el.courseCode)
			console.log(courseData, el.courseCode)
 			viewCourse(courseData)
		})

		cardEntry.insertBefore(el, cardTemplate)
	}

	cardTemplate.classList.add("is-hidden")
	cardTemplate.classList.add("course-card-template")
}

const viewCourse = (course) => {

	var detailsModal = $(".course-details-modal")
	detailsModal.classList.add("is-active")

	$(".details-name").textContent = course.name
	$(".details-percent").textContent = percent(gradeAverage(course.grades))

	
	var gradeEntry = $(".details-grades")
	gradeEntry.innerHTML = ""
	for(var grade of course.grades) {
		// innerhtml of user input = xss vulnerability
		gradeEl = document.createElement("div")
		gradeEl.innerHTML += `
		<div class="big-info">${grade[2]}</div>
		<a class="delete-x">x</a>
		<div class="small-info">${grade[0]} / ${grade[1]}</div>
		<div class="small-info">${percent(grade[0] / grade[1])}</div>`
		gradeEl.entryName = grade[2]
		$(".delete-x", gradeEl).addEventListener("click", (event) => {
			event.path[1].remove()
			course.grades = course.grades.filter(
				grade => grade[2] == event.path[1].entryName)
			saveLocally()
		})
		gradeEntry.appendChild(gradeEl)
	}
	
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
	var course = {
		name: courseName,
		code: courseCode,
		credits: courseCredits,
		grades: []
	}
	userData.courses.push(course)
	$(".new-course-modal").classList.remove("is-active")
	buildCourseList(userData)
	saveLocally()
})

$(".settings-button").addEventListener("click", event => {
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


buildCourseList(userData)