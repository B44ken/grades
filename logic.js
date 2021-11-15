// [ [ 24, 30 ], [30, 40 ] ] = 100( 20 + 30 ) / ( 30 + 40 ) = 71.4
const gradeAverage = grades => {
    var totalA = grades.reduce((acc, curr) => acc + curr[0], 0)
    var totalB = grades.reduce((acc, curr) => acc + curr[1], 0)
    return Math.round(1000 * totalA / totalB) / 10
}