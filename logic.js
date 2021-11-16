// [ [ 24, 30 ], [30, 40 ] ] = ( 20 + 30 ) / ( 30 + 40 ) = 0.714
const gradeAverage = grades => {
		if(grades.length === 0) return 1
		
		var totalA = grades.reduce((acc, curr) => acc + curr[0], 0)
		var totalB = grades.reduce((acc, curr) => acc + curr[1], 0)
		return Math.round(1000 * totalA / totalB) / 1000
}

const percentAverage = grades =>
		Math.round(gradeAverage(grades) * 1000) / 10 + "%"

