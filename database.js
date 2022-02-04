const save = (userData) => {
    var slug = JSON.stringify(userData)
    try {
        this.localStorage.userData = slug
    } catch {}
}

class UserData {
    constructor(u) {
        if(u) {
            this.userData = u
            return
        } else {
            try { this.userData = JSON.parse(localStorage.userData) }
            catch(exc) {    console.log(exc); this.userData = { courses: {} } }

        }
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

const downloadPrompt = () => {
    prompt("Your data:", JSON.stringify(localStorage.userData))
}

const uploadPrompt = () => {
    try {
        var slug = JSON.parse(prompt("Paste data here:"))
        data.userData = slug
    } catch {
        alert("Could not parse data")
    }
}

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyC3kDFAdj6RxVWNmNG-J4c4ejFtiEbe-eQ",
//   authDomain: "p27grades.firebaseapp.com",
//   projectId: "p27grades",
//   storageBucket: "p27grades.appspot.com",
//   messagingSenderId: "258284114887",
//   appId: "1:258284114887:web:38fba093eb703193fe7fe2",
//   measurementId: "G-299T31CX5M"
// };
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const provider = new GoogleAuthProvider();
// const auth = getAuth();

// export const firebaseLogin = () => {

// }