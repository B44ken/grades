// [ [ 24, 30 ], [30, 40 ] ] = ( 20 + 30 ) / ( 30 + 40 ) = 0.714
const gradeAverage = grades => {
		if(grades.length === 0) return 1
		
		var totalA = grades.reduce((acc, curr) => acc + curr[0], 0)
		var totalB = grades.reduce((acc, curr) => acc + curr[1], 0)
		return Math.round(1000 * totalA / totalB) / 1000
}

const percent = grade =>
		Math.round(grade * 1000) / 10 + "%"

const letterOntario = grade => {
	grades = [[0.95, "A+"], [0.9, "A"], [0.85, "A-"],
			  [0.8, "B+"], [0.73, "B"], [0.7, "B-"],
			  [0.67, "C+"], [0.64, "C"], [0.6, "C-"],
			  [0.57, "D+"], [0.54, "D"], [0.5, "D-"], 
			  [0.0, "F"]]
	for(pair in grades)
		if(grade >= grades[pair][0]) return grades[pair][1]
}