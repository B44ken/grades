const save = (userData) => {
    var slug = JSON.stringify(userData)
    try {
        this.localStorage.userData = slug
    } catch {}
}

class UserData {
    constructor(u) {
        this.userData = u
    }

    // course: string, meta: {code: string, credits: int}
    addCourse(name, meta) {
        if(this.userData[name])
            throw new ReferenceError("Course already exists")
        this.userData.courses[name] = {
            meta, grades: []
        }
        save(this.userData)
    }

    // grade: [earned: int, max: int, name: string], course: string
    addGrade(grade, course) {
        // data.userData.courses["Functions"].grades.push([95, 100, 'Math']
        console.log({course, grade})
        this.userData.courses[course].grades.push(grade)
        save(this.userData)
    }

    // course: string
    deleteCourse(course) {
        this.userData.courses[course] = undefined
        save(this.userData)
    }

    // grade: string, course: string
    deleteGrade(grade, course) {
        this.userData.courses[course].grades =
            this.userData.courses[course].grades.filter(g => g[2] != grade)
        save(this.userData)
    }

    // course: string
    getCourse(course) {
        return this.userData.courses[course]
    }

    listCourses() {
        return Object.keys(this.userData.courses)
    }
}

var storage
try {
    storage = JSON.parse(this.localStorage.userData)
    // storage = JSON.parse(localStorage.userData)
} catch {
    storage = {
        courses: {
            "History": {
                meta: {
                    code: "CHW3M",
                    credits: 3
                },
                grades: [
                    [87, 100, "Test B"],
                    [52, 70, "Quiz B"]
                ]
            },
            "Functions": {
                meta: {
                    code: "MCR3U",
                    credits: 3
                },
                grades: [
                    [78, 100, "Test A"],
                    [35, 50, "Quiz A"]
                ]
            }
        }
    }
}
var data = new UserData()
data.userData = storage