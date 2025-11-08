// var timer = function(name: unknown) {
//     var start = new Date();
//     return {
//         stop: function() {
//             var end  = new Date();
//             var time = end.getTime() - start.getTime();
//             logger.info('Timer:', name, 'finished in', time, 'ms');
//         }
//     }
// };
// var t = timer('Some label');
// // code to benchmark
// t.stop(); // prints the time elapsed to the js console

// console.clear()

// const powerOf = (x: number) => (y: number) => Math.pow(x, y)
// const powerOfThree = powerOf(3)

// function performanceCalc(fn: Function, ...params: any) {
//     const start = +new Date()
//     const result = fn(...params)
//     const end = +new Date()

//     logger.info(`Result: ${result}. Execution Time: ${end - start} ms`)
// }

// performanceCalc(powerOfThree, 2)


