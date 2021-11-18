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
		el.addEventListener("click", (event) => {
			viewCourse(course)
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
		gradeEntry.innerHTML += `<div>
			<div class="pc70">${grade[2]}</div>
			<div class="pc15">${grade[0]} / ${grade[1]}</div>
			<div class="pc15">${percent(grade[0] / grade[1])}</div>
		</div>`
	}
}

// MODAL INTERACTION

$(".new-course-button").addEventListener("click", event => {
	$(".new-course-modal").classList.add("is-active")
})

$(".new-course-modal").addEventListener("click", event => {
	var classZero = event.path[0].classList[0]
	if (classZero == "modal-background" || classZero == "")
	$(".new-course-modal").classList.remove("is-active")
})

$(".course-details-modal").addEventListener("click", event => {
	var classZero = event.path[0].classList[0]
	if (classZero == "modal-background" || classZero == "")
		$(".course-details-modal").classList.remove("is-active")
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
// exiting doesnt work with tap? use touchstart?

buildCourseList(userData)