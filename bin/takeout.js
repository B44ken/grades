const fs = require("fs")
// GOOGLE TAKEOUT GRADE EXTRACTOR
// 1. download classroom data from takeout.google.com
// 2. find the relevant `Class data.json` file
// 3. run `node takeout.js classdata.json`

fs.readFile(process.argv[2], "utf8", (err, data) => {
    let posts = JSON.parse(data).posts
    console.log(getGrades(posts))
})

const getGrades = dump => {
    var arr = []
    for(var post of dump) {
        try {
            var grade = post.courseWork.submissions[0].assignedGrade
            var max = post.courseWork.maxPoints
            var title = post.courseWork.title
            if(grade && max && title)
                arr.push([grade, max, title])
        } catch {}
    }
    return arr
}