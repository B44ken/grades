const $ = e => document.querySelector(e)

// *UI GEN*

const buildCourseList = (storage) => {
  var cardTemplate = $(".course-card-template")
  var cardEntry = $(".course-card-entry")
  cardTemplate.classList.remove("is-hidden")

  for(var course of storage.courses) {
  const el = cardTemplate.cloneNode(true)
    el.querySelector(".name").textContent = course.name
    el.querySelector(".code").textContent = course.code
    el.querySelector(".percent").textContent = gradeAverage(course.grades) + "%"
    cardEntry.insertBefore(el, cardTemplate)
  }
  cardTemplate.classList.add("is-hidden")
}
// * MODAL *
$(".new-course-button").addEventListener("click", event => {
  $(".new-course-modal").classList.add("is-active")
})

$(".new-course-modal").addEventListener("click", event => {
  var classZero = event.path[0].classList[0]
  if (classZero == "modal-background" || classZero == "")
  $(".new-course-modal").classList.remove("is-active")
})

buildCourseList(storage)